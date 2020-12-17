const {
  server: {
    error: {
      InvalidArgumentGrpcError,
    },
  },
} = require('@dashevo/grpc-common');

const {
  v0: {
    GetIdentityIdsByPublicKeyHashesResponse,
    Proof,
  },
} = require('@dashevo/dapi-grpc');

const getIdentityFixture = require('@dashevo/dpp/lib/test/fixtures/getIdentityFixture');

const getIdentityIdsByPublicKeyHashesHandlerFactory = require(
  '../../../../../lib/grpcServer/handlers/platform/getIdentityIdsByPublicKeyHashesHandlerFactory',
);

const GrpcCallMock = require('../../../../../lib/test/mock/GrpcCallMock');

const AbciResponseError = require('../../../../../lib/errors/AbciResponseError');

describe('getIdentityIdsByPublicKeyHashesHandlerFactory', () => {
  let call;
  let driveStateRepositoryMock;
  let handleAbciResponseErrorMock;
  let getIdentityIdsByPublicKeyHashesHandler;
  let identity;
  let publicKeyHash;
  let proofFixture;

  beforeEach(function beforeEach() {
    publicKeyHash = '556c2910d46fda2b327ef9d9bda850cc84d30db0';

    call = new GrpcCallMock(this.sinon, {
      getPublicKeyHashesList: this.sinon.stub().returns(
        [publicKeyHash],
      ),
      getProve: this.sinon.stub().returns(false),
    });

    identity = getIdentityFixture();

    handleAbciResponseErrorMock = this.sinon.stub();

    proofFixture = {
      rootTreeProof: Buffer.alloc(1, 1),
      storeTreeProof: Buffer.alloc(1, 2),
    };

    const response = {
      data: [
        identity.getId(),
      ],
      proof: proofFixture,
    };

    driveStateRepositoryMock = {
      fetchIdentityIdsByPublicKeyHashes: this.sinon.stub().resolves(response),
    };

    getIdentityIdsByPublicKeyHashesHandler = getIdentityIdsByPublicKeyHashesHandlerFactory(
      driveStateRepositoryMock,
      handleAbciResponseErrorMock,
    );
  });

  it('should return valid result', async () => {
    const result = await getIdentityIdsByPublicKeyHashesHandler(call);

    expect(result).to.be.an.instanceOf(GetIdentityIdsByPublicKeyHashesResponse);

    expect(result.getIdentityIdsList()).to.deep.equal(
      [identity.getId()],
    );

    expect(driveStateRepositoryMock.fetchIdentityIdsByPublicKeyHashes)
      .to.be.calledOnceWith([publicKeyHash], false);

    expect(handleAbciResponseErrorMock).to.not.be.called();

    const proof = result.getProof();
    expect(proof).to.be.undefined();
  });

  it('should return proof', async () => {
    call.request.getProve.returns(true);

    const result = await getIdentityIdsByPublicKeyHashesHandler(call);

    expect(result).to.be.an.instanceOf(GetIdentityIdsByPublicKeyHashesResponse);
    expect(driveStateRepositoryMock.fetchIdentityIdsByPublicKeyHashes)
      .to.be.calledOnceWith([publicKeyHash], true);

    const proof = result.getProof();

    expect(proof).to.be.an.instanceOf(Proof);
    const rootTreeProof = proof.getRootTreeProof();
    const storeTreeProof = proof.getStoreTreeProof();

    expect(rootTreeProof).to.deep.equal(proofFixture.rootTreeProof);
    expect(storeTreeProof).to.deep.equal(proofFixture.storeTreeProof);
  });

  it('should throw an InvalidArgumentGrpcError if no hashes were submitted', async () => {
    call.request.getPublicKeyHashesList.returns([]);

    try {
      await getIdentityIdsByPublicKeyHashesHandler(call);

      expect.fail('should throw an error');
    } catch (e) {
      expect(e).to.be.instanceOf(InvalidArgumentGrpcError);
      expect(e.getMessage()).to.equal('No public key hashes were provided');
      expect(driveStateRepositoryMock.fetchIdentityIdsByPublicKeyHashes).to.not.be.called();
      expect(handleAbciResponseErrorMock).to.not.be.called();
    }
  });

  it('should throw an error when fetchIdentity throws an AbciResponseError', async () => {
    const code = 2;
    const message = 'Some error';
    const data = 42;
    const abciResponseError = new AbciResponseError(code, { message, data });
    const handleError = new InvalidArgumentGrpcError('Another error');

    driveStateRepositoryMock.fetchIdentityIdsByPublicKeyHashes.throws(abciResponseError);
    handleAbciResponseErrorMock.throws(handleError);

    try {
      await getIdentityIdsByPublicKeyHashesHandler(call);

      expect.fail('should throw an error');
    } catch (e) {
      expect(e).to.equal(handleError);
      expect(driveStateRepositoryMock.fetchIdentityIdsByPublicKeyHashes)
        .to.be.calledOnceWith([publicKeyHash]);
      expect(handleAbciResponseErrorMock).to.be.calledOnceWith(abciResponseError);
    }
  });

  it('should throw an error when fetchIdentity throws unknown error', async () => {
    const error = new Error('Unknown error');

    driveStateRepositoryMock.fetchIdentityIdsByPublicKeyHashes.throws(error);

    try {
      await getIdentityIdsByPublicKeyHashesHandler(call);

      expect.fail('should throw an error');
    } catch (e) {
      expect(e).to.equal(error);
      expect(driveStateRepositoryMock.fetchIdentityIdsByPublicKeyHashes)
        .to.be.calledOnceWith([publicKeyHash]);
      expect(handleAbciResponseErrorMock).to.not.be.called();
    }
  });
});

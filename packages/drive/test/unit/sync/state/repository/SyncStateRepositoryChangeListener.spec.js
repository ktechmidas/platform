const SyncState = require('../../../../../lib/sync/state/SyncState');
const SyncStateRepositoryChangeListener = require('../../../../../lib/sync/state/repository/SyncStateRepositoryChangeListener');

const getBlockFixtures = require('../../../../../lib/test/fixtures/getBlocksFixture');

describe('SyncStateRepositoryChangeListener', () => {
  let repositoryMock;
  let checkInterval;
  let changeListener;
  let timers;

  beforeEach(function beforeEach() {
    const syncState = new SyncState([], new Date());

    class SyncStateRepository { }
    repositoryMock = new SyncStateRepository();
    repositoryMock.fetch = this.sinon.stub();
    repositoryMock.fetch.returns(Promise.resolve(syncState));

    checkInterval = 10;
    changeListener = new SyncStateRepositoryChangeListener(repositoryMock, checkInterval);

    timers = this.sinon.useFakeTimers({ toFake: ['setInterval'] });
  });

  afterEach(() => {
    changeListener.stop();
  });

  it('should create a proper instance using constructor');

  it('should return repository', () => {
    expect(changeListener.getRepository()).to.equal(repositoryMock);
  });

  it('should not listen if already do that', async () => {
    expect(await changeListener.listen()).to.be.true();
    expect(await changeListener.listen()).to.be.false();
  });

  it('should listen changes every specified interval', async function it() {
    const changeHandler = this.sinon.stub();
    const errorHandler = this.sinon.stub();

    changeListener.on('change', changeHandler);
    changeListener.on('error', errorHandler);

    await changeListener.listen();

    timers.tick(checkInterval);

    expect(repositoryMock.fetch).to.have.been.calledTwice();

    expect(changeHandler).to.have.not.been.called();
    expect(errorHandler).to.have.not.been.called();
  });

  it('should emit "change" when repository data has changed', async function it() {
    const changeHandler = this.sinon.stub();
    const errorHandler = this.sinon.stub();

    changeListener.on('change', changeHandler);
    changeListener.on('error', errorHandler);

    await changeListener.listen();

    const blocks = getBlockFixtures();
    const newState = new SyncState(blocks, new Date());
    repositoryMock.fetch.returns(Promise.resolve(newState));

    timers.next();

    await new Promise((resolve) => {
      process.nextTick(() => {
        expect(changeHandler).to.have.been.calledOnceWith(newState);

        expect(errorHandler).to.have.not.been.called();

        resolve();
      });
    });
  });

  it('should emit "error" when error has occurred', async function it() {
    const changeHandler = this.sinon.stub();
    const errorHandler = this.sinon.stub();

    changeListener.on('change', changeHandler);
    changeListener.on('error', errorHandler);

    await changeListener.listen();

    const error = new Error();
    repositoryMock.fetch.returns(Promise.reject(error));

    timers.next();

    await new Promise((resolve) => {
      process.nextTick(() => {
        expect(errorHandler).to.have.been.calledOnceWith(error);

        expect(changeHandler).to.have.not.been.called();

        resolve();
      });
    });
  });

  it('should stop listen changes', async () => {
    await changeListener.listen();
    changeListener.stop();

    timers.next();

    expect(repositoryMock.fetch).to.have.been.calledOnce();
  });
});

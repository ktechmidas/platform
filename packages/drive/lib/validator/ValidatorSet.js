const Validator = require('./Validator');
const ValidatorSetIsNotInitializedError = require('./errors/ValidatorSetIsNotInitializedError');

class ValidatorSet {
  /**
   * @param {SimplifiedMasternodeList} simplifiedMasternodeList
   * @param {getRandomQuorum} getRandomQuorum
   * @param {fetchQuorumMembers} fetchQuorumMembers
   */
  constructor(simplifiedMasternodeList, getRandomQuorum, fetchQuorumMembers) {
    this.simplifiedMasternodeList = simplifiedMasternodeList;
    this.getRandomQuorum = getRandomQuorum;
    this.fetchQuorumMembers = fetchQuorumMembers;

    this.quorum = null;
    this.validators = [];
  }

  /**
   * Chooses an active validator set from among all active validator quorums for the first time
   *
   * @param {number} coreHeight
   */
  async initialize(coreHeight) {
    const sml = this.simplifiedMasternodeList.getStore().getSMLbyHeight(coreHeight);

    // using the block hash at the first core height as entropy
    const rotationEntropy = Buffer.from(sml.toSimplifiedMNListDiff().blockHash, 'hex');

    await this.switchToRandomQuorum(
      sml,
      coreHeight,
      rotationEntropy,
    );
  }

  /**
   * Rotates to a new active validator set from among all active validator quorums
   *
   * @param {Long} height
   * @param {number} coreHeight
   * @param {Buffer} rotationEntropy
   */
  async rotate(height, coreHeight, rotationEntropy) {
    const sml = this.simplifiedMasternodeList.getStore().getSMLbyHeight(coreHeight);

    // validator set is rotated every ROTATION_BLOCK_INTERVAL blocks
    if (height.toNumber() % ValidatorSet.ROTATION_BLOCK_INTERVAL !== 0) {
      return false;
    }

    await this.switchToRandomQuorum(
      sml,
      coreHeight,
      rotationEntropy,
    );

    return true;
  }

  /**
   * Get Validator Set Quorum
   *
   * @return {QuorumEntry}
   */
  getQuorum() {
    if (!this.quorum) {
      throw new ValidatorSetIsNotInitializedError();
    }

    return this.quorum;
  }

  /**
   * Get validators
   *
   * @return {Validator[]}
   */
  getValidators() {
    if (this.validators.length === 0) {
      throw new ValidatorSetIsNotInitializedError();
    }

    return this.validators;
  }

  /**
   * @private
   * @param {SimplifiedMNList} sml
   * @param {number} coreHeight
   * @param {Buffer} rotationEntropy
   * @return {Promise<void>}
   */
  async switchToRandomQuorum(sml, coreHeight, rotationEntropy) {
    this.quorum = await this.getRandomQuorum(
      sml,
      sml.getValidatorLLMQType(),
      rotationEntropy,
    );

    const quorumMembers = await this.fetchQuorumMembers(
      sml.getValidatorLLMQType(),
      this.quorum.quorumHash,
    );

    this.validators = quorumMembers
      .filter((member) => member.valid)
      .map((member) => Validator.createFromQuorumMember(member));
  }
}

ValidatorSet.ROTATION_BLOCK_INTERVAL = 15;

module.exports = ValidatorSet;

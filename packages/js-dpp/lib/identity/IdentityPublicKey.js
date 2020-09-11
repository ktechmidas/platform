const { PublicKey } = require('@dashevo/dashcore-lib');

const EmptyPublicKeyDataError = require('./errors/EmptyPublicKeyDataError');

class IdentityPublicKey {
  /**
   * @param {RawIdentityPublicKey} [rawIdentityPublicKey]
   */
  constructor(rawIdentityPublicKey = undefined) {
    this.enabled = true;

    if (rawIdentityPublicKey) {
      this.setId(rawIdentityPublicKey.id)
        .setType(rawIdentityPublicKey.type)
        .setData(rawIdentityPublicKey.data);
    }
  }

  /**
   * Get key ID
   *
   * @return {number}
   */
  getId() {
    return this.id;
  }

  /**
   * Set key ID
   *
   * @param {number} id
   * @return {IdentityPublicKey}
   */
  setId(id) {
    this.id = id;

    return this;
  }

  /**
   * Get key type
   *
   * @return {number}
   */
  getType() {
    return this.type;
  }

  /**
   * Set key type
   *
   * @param {number} type
   * @return {IdentityPublicKey}
   */
  setType(type) {
    this.type = type;

    return this;
  }

  /**
   * Set base64 encoded public key
   *
   * @param {string} data
   * @return {IdentityPublicKey}
   */
  setData(data) {
    this.data = data;

    return this;
  }

  /**
   * Get base64 encoded public key
   *
   * @return {string}
   */
  getData() {
    return this.data;
  }

  /**
   * Get original public key hash
   *
   * @returns {string}
   */
  hash() {
    if (!this.getData()) {
      throw new EmptyPublicKeyDataError();
    }

    const originalPublicKey = new PublicKey(
      Buffer.from(this.getData(), 'base64'),
    );

    return originalPublicKey.hash
      .toString('hex');
  }

  /**
   * Get JSON representation
   *
   * @return {RawIdentityPublicKey}
   */
  toJSON() {
    return {
      id: this.getId(),
      type: this.getType(),
      data: this.getData(),
    };
  }
}

/**
 * @typedef {Object} RawIdentityPublicKey
 * @property {number} id
 * @property {number} type
 * @property {string} data
 */

IdentityPublicKey.TYPES = {
  ECDSA_SECP256K1: 0,
};

module.exports = IdentityPublicKey;

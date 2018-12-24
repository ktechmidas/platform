class ApiAppOptions {
  constructor(options) {
    this.dashCoreJsonRpcHost = options.DASHCORE_JSON_RPC_HOST;
    this.dashCoreJsonRpcPort = options.DASHCORE_JSON_RPC_PORT;
    this.dashCoreJsonRpcUser = options.DASHCORE_JSON_RPC_USER;
    this.dashCoreJsonRpcPass = options.DASHCORE_JSON_RPC_PASS;
    this.dashCoreRunningCheckMaxRetries = parseInt(options.DASHCORE_RUNNING_CHECK_MAX_RETRIES, 10);
    this.dashCoreRunningCheckInterval = parseInt(options.DASHCORE_RUNNING_CHECK_INTERVAL, 10)
      * 1000;
    this.storageIpfsMultiAddr = options.STORAGE_IPFS_MULTIADDR;
    this.storageIpfsTimeout = parseInt(options.STORAGE_IPFS_TIMEOUT, 10) * 1000;
    this.storageMongoDbUrl = options.STORAGE_MONGODB_URL;
    this.storageMongoDbDatabase = options.STORAGE_MONGODB_DB;
    this.syncStateCheckInterval = parseInt(options.SYNC_STATE_CHECK_INTERVAL, 10) * 1000;
    this.syncChainCheckInterval = parseInt(options.SYNC_CHAIN_CHECK_INTERVAL, 10) * 1000;
    this.apiRpcPort = options.API_RPC_PORT;
    this.apiRpcHost = options.API_RPC_HOST;
  }

  getDashCoreJsonRpcHost() {
    return this.dashCoreJsonRpcHost;
  }

  getDashCoreJsonRpcPort() {
    return this.dashCoreJsonRpcPort;
  }

  getDashCoreJsonRpcUser() {
    return this.dashCoreJsonRpcUser;
  }

  getDashCoreJsonRpcPass() {
    return this.dashCoreJsonRpcPass;
  }

  getDashCoreRunningCheckMaxRetries() {
    return this.dashCoreRunningCheckMaxRetries;
  }

  getDashCoreRunningCheckInterval() {
    return this.dashCoreRunningCheckInterval;
  }

  getStorageIpfsMultiAddr() {
    return this.storageIpfsMultiAddr;
  }

  /**
   * @return {number}
   */
  getStorageIpfsTimeout() {
    return this.storageIpfsTimeout;
  }

  getStorageMongoDbUrl() {
    return this.storageMongoDbUrl;
  }

  getStorageMongoDbDatabase() {
    return this.storageMongoDbDatabase;
  }

  getSyncStateCheckInterval() {
    return this.syncStateCheckInterval;
  }

  getSyncChainCheckInterval() {
    return this.syncChainCheckInterval;
  }

  getApiRpcHost() {
    return this.apiRpcHost;
  }

  getApiRpcPort() {
    return this.apiRpcPort;
  }
}

module.exports = ApiAppOptions;

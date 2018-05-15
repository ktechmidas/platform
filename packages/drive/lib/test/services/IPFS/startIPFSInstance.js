const util = require('util');

const DaemonFactory = require('ipfsd-ctl');

const df = DaemonFactory.create();

const spawnIpfs = util.promisify(df.spawn).bind(df);

/**
 * Start and stop IPFS instance for mocha tests
 *
 * @return {Promise<IpfsAPI>}
 */
async function startIPFSInstance() {
  const ipfsAPIs = await startIPFSInstance.many(1);

  return ipfsAPIs[0];
}

async function spawnAndPromisifyIpfs() {
  const ipfsd = await spawnIpfs();

  ipfsd.stop = util.promisify(ipfsd.stop).bind(ipfsd);
  ipfsd.cleanup = util.promisify(ipfsd.cleanup).bind(ipfsd);
  ipfsd.api.clean = ipfsd.cleanup;
  ipfsd.api.remove = ipfsd.stop;

  return ipfsd;
}

/**
 * Start and stop specified number of IPFS instances for mocha tests
 *
 * @param number
 * @return {Promise<IpfsAPI[]>}
 */
startIPFSInstance.many = function many(number) {
  const ipfsInstances = [];

  if (number < 1) {
    throw new Error('Invalid number of instances');
  }

  return new Promise(async (resolve, reject) => {
    try {
      const firstInstance = await spawnAndPromisifyIpfs();
      ipfsInstances.push(firstInstance);

      if (number > 1) {
        const firstInstanceId = await firstInstance.api.id();

        for (let i = 1; i < number; i++) {
          const instance = await spawnAndPromisifyIpfs();

          await instance.api.swarm.connect(firstInstanceId.addresses[0]);

          ipfsInstances.push(instance);
        }
      }
    } catch (e) {
      reject(e);

      throw e;
    }

    resolve(ipfsInstances.map(instance => instance.api));
  });
};

module.exports = startIPFSInstance;

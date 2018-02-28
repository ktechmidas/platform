/**
 * Add State Transitions from blockchain
 *
 * @param {IpfsAPI} ipfsAPI
 * @param {StateTransitionHeaderIterator} stateTransitionHeaderIterator
 */
async function addStateTransitionsFromBlockchain(ipfsAPI, stateTransitionHeaderIterator) {
  let done;
  let stateTransitionHeader;

  // eslint-disable-next-line no-cond-assign
  while ({ done, value: stateTransitionHeader } = await stateTransitionHeaderIterator.next()) {
    if (done) {
      break;
    }

    // TODO: Check number of confirmations. Should be more or equal than 6?
    // TODO: Validate packet using header?

    await ipfsAPI.pin.add(stateTransitionHeader.getStorageHash(), { recursive: true });
  }
}

module.exports = addStateTransitionsFromBlockchain;

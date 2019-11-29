const state = {
    code: '',
    pk: '',
    vk: '',
    verificationContract: '',
    w: '',
    flatten: '',
    contract: '',
    address: '',
    inputs: [],
    styleObject: {
        width: '0'
    },
    proof: '',
    tx_hash: '',
    result: '',
    blockNumber: 'Pending...',
    contract_abi: []
};

const getters = {
    getCode(state) {
        return state.code
    },
    getProvingKey(state) {
        return state.pk
    },
    getVerificationKey(state) {
        return state.vk
    },
    getVerificationContract(state) {
        return state.verificationContract
    },
    getWitness(state) {
        return state.w
    },
    getFlatten(state) {
        return state.flatten
    },
    getContract(state) {
        return state.contract
    },
    getAddr(state) {
        return state.address
    },
    getInputs(state) {
        return state.inputs
    },
    getStyleObjects(state) {
        return state.styleObject
    },
    getProofs(state) {
        return state.proof
    },
    getABI(state) {
        return state.contract_abi
    },
    getTXHash(state) {
        return state.tx_hash
    },
    getResult(state) {
        return state.result
    },
    getBlockNumber(state) {
        return state.blockNumber
    },
};

const mutations = {
    updateCode(state, code) {
        state.code = code
    },
    updateProvingKey(state, pk) {
        state.pk = pk
    },
    updateVerificationKey(state, vk) {
        state.vk = vk
    },
    updateVerificationContract(state, vc) {
        state.verificationContract = vc
    },
    updateWitness(state, w) {
        state.w = w
    },
    updateFlatten(state, flatten) {
        state.flatten = flatten
    },
    updateContract(state, contract) {
        state.contract = contract
    },
    updateAddress(state, address) {
        state.address = address
    },
    updateProof(state, proof) {
        state.proof = proof
    },
    updateInputs(state) {
        for (let line of state.code.split('\n')) {
            if (line.includes('def') && line.includes('main')) {
                // eslint-disable-next-line no-unused-vars
                state.inputs = line.split(',').map((_) => '0');
                state.styleObject.width = (40 - (state.inputs.length - 1) * 0.6) / state.inputs.length  + 'rem';
                break
            }
        }
    },
    updateABI(state, abi) {
        state.contract_abi = JSON.parse(abi)
    },
    updateTXHash(state, tx_hash) {
        state.tx_hash = tx_hash
    },
    updateResult(state, result) {
        state.result = result
    },
    updateBlockNumber(state, blockNumber) {
        state.blockNumber = blockNumber
    },
};

export default {
    state,
    getters,
    mutations,
}
<template>
    <div>
        <h2>Verification Result</h2>

        <h4>Result</h4>
        <highlight-code lang="python">
            {{ res }}
        </highlight-code>

        <h4>Transaction Hash</h4>
        <highlight-code lang="python">
            {{ tx_hash }}
        </highlight-code>

        <h4>Transaction in Block Number</h4>
        <highlight-code lang="python">
            {{ block_number }}
        </highlight-code>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Result",
    computed: {
        ...mapGetters({
            res: 'getResult',
            tx_hash: 'getTXHash',
            block_number: 'getBlockNumber'
        })
    }
}
</script>

<style scoped>
div {
    text-align: center;
}
pre, code  {
    position: relative;
    height: 100%;
    width: 90%;
    max-width: 40rem;
    margin: auto;

    text-align: center;

    border-radius: 1rem !important;

    font-size: 1.2rem;
}
</style>
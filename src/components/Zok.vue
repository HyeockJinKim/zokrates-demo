<template>
    <div>
        <h2>Generated Data</h2>
        <!-- Code Block -->
        <h4>Program (Circuit)</h4>
        <highlight-code lang="json">
            {{ flatten }}
        </highlight-code>
        <br>

        <h4>Proving key</h4>
        <highlight-code lang="json">
            {{ pk }}
        </highlight-code>
        <br>

        <h4>Verification key</h4>
        <highlight-code lang="json">
            {{ vk }}
        </highlight-code>
        <br>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Zok",
    computed: {
        ...mapGetters({
            code: 'getCode',
            flatten: 'getFlatten',
            w: 'getWitness',
            pk: 'getProvingKey',
            vk: 'getVerificationKey',
            vc: 'getVerificationContract',
        })
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
}
h4 {
    margin: .1rem 0 .5rem .3rem;
    font-weight: bold;
}

pre, code  {
    position: relative;
    width: 90%;
    max-width: 40rem;
    height: 100%;
    text-align: left;
    margin-left: 1rem;
    font-size: 1.2rem;
}
</style>
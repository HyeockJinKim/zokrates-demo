<template>
    <div>
        <h2>Contract</h2>
        <!-- Code Block -->
        <h4>Address</h4>
            <input class="one" v-model="address"/>
        <br>

        <h4>DSL</h4>
        <highlight-code lang="python">
            {{ code }}
        </highlight-code>

        <h4>input</h4>
        <div class="inline" v-for="(_, index) in inputs" v-bind:key="index">
            <input :style="styleObject" v-model="inputs[index]">
        </div>
        <span @click="generate_prf">generate proofs</span>

        <div v-if="w !== ''">
            <h4>Witness</h4>
            <highlight-code lang="json">
                {{ w }}
            </highlight-code>
        </div>

        <div v-if="proof !== ''">
            <h4>Proofs</h4>
            <highlight-code lang="json">
                {{ proof }}
            </highlight-code>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as zokrates from 'zokrates-js'

export default {
    name: "Contract",
    data() {
        return {
            address: ''
        }
    },
    methods: {
        async generate_prf() {
            let source = this.code;
            function importResolver(location, path) {
                // implement your resolving logic here
                return {
                    source: source,
                    location: path
                };
            }
            await zokrates.initialize(importResolver);
            let witness = await zokrates.computeWitness(this.flatten, this.inputs);
            this.$store.commit('updateWitness', witness);

            let proof = await zokrates.generateProof(this.flatten, witness, this.pk)
            proof = proof.split('\n')
                .map(x => x.startsWith('    }') ? '}': x)
                .join('\n')
            this.$store.commit('updateAddress', this.address);
            this.$store.commit('updateProof', proof);
        }
    },
    computed: {
        ...mapGetters({
            code: 'getCode',
            flatten: 'getFlatten',
            w: 'getWitness',
            pk: 'getProvingKey',
            proof: 'getProofs',
            inputs: 'getInputs',
            styleObject: 'getStyleObjects'
        }),
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
}

h4 {
    margin: .1rem 0 .5rem .3rem;
}
pre, code {
    overflow-y: scroll;
    position: relative;
    width: 90%;
    max-height: 9rem;
    max-width: 40rem;
    margin: auto;
}

.inline {
    display: inline;
    margin: 0 .3rem;
    text-align: right;
}

input {
    text-align: right;
    border-radius: .2rem;
    font-size: .8rem;
    line-height: 1.2rem;
}

.one {
    text-align: left !important;
    width:95%;
}

span {
    cursor: pointer;

    display: block;
    width: 10em;
    padding: 0 1rem;

    height: 3.3rem;
    line-height: 3.3rem;
    font-size: 1.3rem;
    text-align: center;
    background-color: #668488;
    margin: .5rem auto;

    border-radius: .9rem;
    color: white;
    font-weight: bold;
}
</style>
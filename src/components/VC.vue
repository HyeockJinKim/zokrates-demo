<template>
    <div>
        <h2>Verification Contract</h2>
        <span @click.stop.prevent="copyTestingCode">
            Copy
        </span>
        <!-- Code Block -->
        <highlight-code lang="javascript">
            {{ vc }}
        </highlight-code>

        <h4>ABI</h4>
            <textarea class="abi" v-model="abi"></textarea>
        <br>

        <textarea class="hidden" id="testing-code" :value="vc"></textarea>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "VC",
    data() {
        return {
            abi: ''
        }
    },
    watch: {
        abi: function (abi) {
            this.$store.commit('updateABI', abi)
        },
    },
    methods: {
        copyTestingCode () {
            let testingCodeToCopy = document.querySelector('#testing-code')
            testingCodeToCopy.setAttribute('type', 'text')
            testingCodeToCopy.select()

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                alert('Verification Contract code was copied ' + msg);
            } catch (err) {
                alert('Oops, unable to copy');
            }

            /* unselect the range */
            testingCodeToCopy.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
        },
    },
    computed: {
        ...mapGetters({
            vc: 'getVerificationContract'
        })
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
}

pre, code {
    overflow-y: scroll;
    position: relative;
    height: 20rem;
    width: 95%;
    max-width: 40rem;
    margin: auto;
}

.hidden {
    position: absolute;
    top: -800rem;
}

.abi {
    display: block;
    text-align: left;
    border-radius: .2rem;
    font-size: .8rem;
    line-height: 1.2rem;
    margin: auto;

    width: 95%;
    max-width: 40rem;
    height: 12rem;
    resize: none;
    padding: .5rem;
}

span {
    z-index: 2;
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding: 0 1rem;
    left: 84.5%;
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
    text-align: center;
    background-color: #17a2b8;
    border-radius: .3rem;
    color: white;
    font-weight: bold;
}
</style>
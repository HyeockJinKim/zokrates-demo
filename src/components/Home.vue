<template>
    <div>
        <h2>Code Writing</h2>

        <div>
            <div class="background">
<!--                <button @click.prevent="slidePrev">prev</button>-->
<!--                <button @click.prevent="slideNext">next</button>-->
                <hooper class="hoo" :itemsToShow="2" :wheelControl="false" :mouseDrag="false" :touchDrag="false"
                        ref="carousel" @slide="updateCarousel">
                    <slide><editor></editor></slide>
                    <slide><d-s-l></d-s-l></slide>
                    <slide><zok></zok></slide>
                    <slide><v-c></v-c></slide>
                    <slide><contract></contract></slide>
                    <slide><result></result></slide>
                </hooper>
                <span v-if="carouselData > 0" class="left" @click="slidePrev">Back</span>
<!--                <span class="" @click="slideNext">next</span>-->

                <span v-if="carouselData === 0" @click="compile">Compile DSL</span>
                <span v-if="carouselData === 1" @click="generate_vc">Generate VC</span>
                <span v-if="carouselData === 2" @click="deploy">Deploy VC</span>
                <span v-if="carouselData === 3" @click="input_proof">Input proof</span>
            </div>
<!--            <div class="half">-->
<!--                <div class="item"><editor></editor></div>-->
<!--                <div class="item"><d-s-l></d-s-l></div>-->
<!--                <div class="item2">-->
<!--                    <span @click="compile">Compile DSL</span>-->
<!--                </div>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
import Editor from "@/components/Editor";
import DSL from "@/components/DSL";
import * as zokrates from 'zokrates-js'
import { mapGetters } from 'vuex'
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import Zok from "@/components/Zok";
import VC from "@/components/VC";
import HDWalletProvider from "@truffle/hdwallet-provider"
import Web3 from 'web3'
import Contract from "@/components/Contract";
import Result from "@/components/Result";
import { mnemonic, api_key } from '@/config'

export default {
    name: "Home",
    components: {
        Result,
        Contract,
        Hooper,
        Slide,
        DSL,
        Editor,
        VC,
        Zok,
    },
    data () {
        return {
            carouselData: 0
        }
    },
    watch: {
        carouselData () {
            this.$refs.carousel.slideTo(this.carouselData);
        }
    },
    methods: {
        slidePrev() {
            this.carouselData--
            this.$refs.carousel.slidePrev();
        },
        slideNext() {
            this.carouselData++
            this.$refs.carousel.slideNext();
        },
        updateCarousel(payload) {
            this.myCarouselData = payload.currentSlide;
        },
        async compile() {
            let source = this.code;
            function importResolver(location, path) {
                // implement your resolving logic here
                return {
                    source: source,
                    location: path
                };
            }
            await zokrates.initialize(importResolver);
            let coms = await zokrates.compile(source, "main");
            this.$store.commit('updateFlatten', coms);

            let sets = await zokrates.setup(coms);
            this.$store.commit('updateVerificationKey', sets[0]);
            this.$store.commit('updateProvingKey', sets[1]);

            this.slideNext()
        },
        async generate_vc() {
            let vc = await zokrates.exportSolidityVerifier(this.vk, true);
            vc = vc
                .split('\n')
                .map((x) => x.includes('pragma') ? null : x)
                .join('\n');

            vc = 'pragma solidity ^0.5.0;\n' +
                'pragma experimental ABIEncoderV2;\n' + vc;

            vc = vc
                .split('\n')
                .map((x) => x.startsWith('//') ? null : x)
                .filter((x) => x !== null)
                .join('\n');

            this.$store.commit('updateVerificationContract', vc);

            this.slideNext()
        },
        async deploy() {
            const provider = new HDWalletProvider(
                mnemonic,
                `https://ropsten.infura.io/v3/`+api_key
            );

            this.$store.commit('updateInputs');
            provider.engine.stop();

            this.slideNext()
        },
        async input_proof() {
            const provider = new HDWalletProvider(
                mnemonic,
                `https://ropsten.infura.io/v3/`+api_key
            );
            const web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();

            const contract = new web3.eth.Contract(this.abi, this.address)
            // eslint-disable-next-line no-console
            console.log(contract)
            let prf = JSON.parse(this.proof);
            let proof = []
            for (let item in prf.proof) {
                proof.push(prf.proof[item])
            }
            let next = this.slideNext;

            const commit = this.$store.commit;
            commit('updateBlockNumber', 'Pending...');
            function check_tx(tx) {
                web3.eth.getTransaction(tx, (err, res) => {
                    const block_number_callback = (err, block_num) => {
                        if (res != null && res.blockNumber != null && res.blockNumber <= block_num) {
                            commit('updateBlockNumber', block_num)
                        } else {
                            setTimeout(() => check_tx(tx), 1000)
                        }
                    }
                    web3.eth.getBlockNumber(block_number_callback)
                })
            }

            contract.methods.verifyTx(proof, prf.inputs).send({
                from: accounts[0],
                gas: '2000000'
            }, function (err, res) {
                contract.methods.verifyTx(proof, prf.inputs).call({
                    from: accounts[0],
                    gas: '2000000'
                }, function (err, res) {
                    commit('updateResult', res);
                })
                check_tx(res)
                commit('updateTXHash', res);
                next();
            });
        }
    },
    computed: {
        ...mapGetters({
            code: 'getCode',
            flatten: 'getFlatten',
            w: 'getWitness',
            pk: 'getProvingKey',
            vk: 'getVerificationKey',
            vc: 'getVerificationContract',
            contract: 'getContract',
            address: 'getAddr',
            proof: 'getProofs',
            abi: 'getABI',
        })
    }
}
</script>

<style scoped>
.background {
    position: absolute;
    border-radius: 1em;
    width: 90%;
    height: 90%;

    left:50%;
    top:52%;
    transform:translate(-50%, -50%);

    background-color: rgba(228, 226, 220, 0.87);
    text-align: center;
}

.hoo {
    display: block;
    width: 95%;
    height: 85%;
    float: left !important;
    text-align: left !important;
    margin: 1rem;
}
.left {
    position: absolute;
    font-size: 1rem;

    left:7%;
    top:93.5%;
    transform:translate(-50%, -50%);
}
span {
    cursor: pointer;

    display: inline-block;
    width: 10em;
    height: 3em;
    line-height: 3em;
    border-radius: 1em;

    text-align: center;

    font-size: 1.2rem;
    font-weight: bold;
    background-color: #e1e1f3;
    margin: .7rem auto;

    box-shadow: 0 .1rem .2rem .2rem rgba(0, 0, 0, 0.12);
}
</style>


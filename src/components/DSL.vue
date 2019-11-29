<template>
    <div>
        <h2>Domain Specific Language</h2>
        <!-- Code Block -->
        <highlight-code lang="python">
            {{ code }}
        </highlight-code>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "DSL",
    computed: {
        ...mapGetters({
            code: 'getCode'
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

    text-align: left;

    border-radius: 1rem !important;

    font-size: 1.2rem;
}
</style>
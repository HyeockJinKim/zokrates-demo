<template>
    <div>
        <textarea v-model="code"></textarea>
    </div>
</template>

<script>
export default {
    name: "Editor",
    computed: {
        code: {
            get () {
                return this.$store.state.code
            },
            set (value) {
                this.$store.commit('updateCode', value)
            }
        }
    }
}
</script>

<style scoped>
div, textarea {
    position: relative;
    height: 100%;
    width: 90%;
    max-width: 40rem;
    margin: auto;
    resize: none;

    font-size: 1.1rem;
    border-radius: 1rem;
    padding: .5rem;
}
</style>
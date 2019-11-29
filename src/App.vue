<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  border-radius: 1rem;
  color: #2c3e50;

  position: absolute;
  height: 95%;
  width: 98%;

  left:50%;
  top:50%;
  transform:translate(-50%, -50%);
}
</style>

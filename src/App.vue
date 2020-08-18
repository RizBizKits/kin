<template>
  <div id="app">
      <app-header/>
      <logo v-if="!$store.state.isLoggedIn" />
      <router-view  />
  </div>
</template>


<script>

import AppHeader from './components/Header.vue'
import Logo from './components/LogoBlock.vue'


export default {
    name: 'app',
    components: {
        AppHeader,
        Logo
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}

    body {
        margin: 0;
        background-color: #EAF6FF;
    }
</style>

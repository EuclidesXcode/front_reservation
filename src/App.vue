<template>
<v-app id="app">
    <full-template v-if="this.$router.history.current.meta.showMenu">
      <router-view />
    </full-template>
    <div class="div-login" v-else>
      <router-view />
    </div>
</v-app>
</template>
<style scoped>
.div-login {
  flex: 1;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgb(248, 227, 226) 0%,
    rgb(255, 255, 255) 48%,
    rgba(211, 242, 234) 100%
  );
}
</style>
<script>
import FullTemplate from './components/Template.vue';
export default {
  components: {
    FullTemplate
  },
  computed: {
    showMenu(){
      return this.$router.history.current.meta.showMenu
    },
  },
}
</script>
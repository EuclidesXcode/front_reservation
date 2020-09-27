<template>
  <form>
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="showPass ? 'text' : 'password'"
      v-model="password"
      label="Senha *"
      hint="At least 8 characters"
      counter
      @click:append="showPass = !showPass"
    ></v-text-field>
    <v-btn class="mr-4" @click="hendleLogin()">Login</v-btn>
  </form>
</template>
<style scoped>
</style>

<script>
import { mapActions } from "vueex";

export default {
  data: () => ({
    email: '',
    password: '',
    showPass: false
  }),

  computed: {
    error: 'Login/getterError'
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      login: 'Login/Login',
    }),
    initialize() {},

    async hendleLogin() {
      await this.login({email: this.email, password: this.password})
    },
  },
};
</script>
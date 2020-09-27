<template>
  <v-container>
    <v-row justify="center" class="mt-12">
      <form>
        <v-col md="12" align="center">
          <v-alert v-if="errorPass" color="red" outlined> {{ errorPass }}</v-alert>
        </v-col>
        <v-col md="12" class="mt-12">
          <v-text-field v-model="email" label="E-mail"></v-text-field>

          <v-text-field
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            v-model="password"
            label="Senha *"
            hint="At least 8 characters"
            counter
            @click:append="showPass = !showPass"
          ></v-text-field>
          <v-btn class="mr-4" @click="hendleLogin()">Login</v-btn>
        </v-col>
      </form>
    </v-row>
  </v-container>
</template>
<style scoped>
</style>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    email: "",
    password: "",
    showPass: false,
  }),

  computed: {
    ...mapGetters({
      errorPass: "Login/getErrorPass",
    }),
  },

  methods: {
    ...mapActions({
      login: "Login/login",
    }),
    initialize() {},

    async hendleLogin() {
      await this.login({ email: this.email, password: this.password });
      if (!this.errorPass) this.$router.push('/dashboard');
    },
  },
    created() {
      this.initialize();
    },
};
</script>
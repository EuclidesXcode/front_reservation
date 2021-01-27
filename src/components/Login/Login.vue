<template>
  <v-container class="container-login">
    <v-col md="12" class="mt-12">
      <v-snackbar v-model="snackbar" top="top">
        {{ msg }}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
    </v-col>
    <v-col md="12" class="mt-12"> </v-col>

    <v-col md="12" class="mt-12">
      <v-card
        class="mx-auto card-login rounded-md"
        max-width="344"
        max-height="400"
        elevation="7"
      >
        <v-card-text>
          <form>
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
              <v-row>
                <v-btn class="mr-4" @click="hendleLogin()">Login</v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-col>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="deep-purple accent-4"> Cadastrar Usuário </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col md="12" class="mt-12"> </v-col>
  </v-container>
</template>
<style scoped>
.card-login {
  align-self: center;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgb(248, 227, 226) 0%,
    rgb(255, 255, 255) 48%,
    rgba(211, 242, 234) 100%
  );
}
.container-login {
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  width: 100%;
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
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    laoding: false,
    msg: "Eroooouuu!!!! da zero pra ele!!",
    snackbar: false,
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
      this.laoding = true;
      await this.login({ email: this.email, password: this.password });
      if (!this.errorPass) {
        this.$router.push("/dashboard");
        this.laoding = false;
      } else {
        this.snackbar = true;
        this.laoding = false;
      }
    },
  },
  created() {
    this.initialize();
  },
};
</script>
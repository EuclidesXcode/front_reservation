<template>
  <v-card>
  </v-card>
</template>
<style scoped>
</style>

<script>
import api from "../../config/api";
import {mapActions, mapGetters} from 'vueex';

export default {
  data: () => ({
    snackbar: false,
    search: "",
    msg: "",
    showPass: false,
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match",
    },
    firsstName: "",
    secondName: "",
    name: "",
    email: "",
    dialog: false,
    headers: [
      { text: "Nome", value: "name" },
      { text: "E-mail", value: "email" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    provider: [],
  }),

  computed: {},

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      const getUser = async () => {
        await api
          .get("/user", {noLimit:true}, {
          })
          .then((res) => {
            console.log("res da api: ", res.data);
            this.provider = res.data.items;
          })
          .catch((error) => {
            console.log("Error da api: ", error.response.data);
          });
      };
      return getUser();
    },

    hendleSubmit() {
      this.name = this.firsstName + " " + this.secondName;
      console.log("chamou, e o nome do infeliz é: ");

      const sendUser = async () => {
        await api
          .post("/user", {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            console.log("res da api: ", res.data.items);
            const items = res.data.items;
            this.email = items.email;
            this.msg = items.msg;
            this.dialog = false;
            this.snackbar = true;
          })
          .catch((error) => {
            console.log("Error da api: ", error.response.data);
            this.msg = error.response.data;
            this.dialog = false;
            this.snackbar = true;
          });
      };

      return sendUser();
    },
  },
};
</script>
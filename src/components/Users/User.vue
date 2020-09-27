<template>
  <v-card>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="firsstName"
                      label="Nome *"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="secondName"
                      label="Sobre-nome *"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="email"
                      label="E-mail *"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="showPass ? 'text' : 'password'"
                      v-model="password"
                      label="Senha *"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <v-card-title>
      Usuários
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>

      <v-snackbar v-model="snackbar" top="top">
        {{ msg }}
        <template v-slot:action="{ attrs }">
          <v-btn color="green" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte os usuários por nome, cpf ou perfil..."
      ></v-text-field>
    </v-card-title>

    <v-tabs horizontal>
      <v-tab left>
        <v-icon left>{{ icons.icon }}</v-icon
        >Dados do Cliente
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="provider"
            sort-by="quant"
            class="elevation-1"
          >
            <template v-slot:item.quant="{ item }">
              <v-chip :color="getColor(item.quant)" dark>{{
                item.quant
              }}</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"
                >mdi-pencil</v-icon
              >
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <!-- modal -->

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="80%">
        <template v-slot:activator="{ on }">
          <div class="my-2">
            <v-btn color="info" id="add" v-on="on" fab>
              <v-icon>{{ icons.iconAdd }}</v-icon>
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Novo Usuário</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="firsstName"
                    label="Nome *"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    v-model="secondName"
                    label="Sobre-nome *"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field v-model="email" label="E-mail *"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
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
                </v-col>
              </v-row>
            </v-container>
            <small>* Preenchimento obrigatório</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2"
              color="primary"
              text
              @click="hendleSubmit()"
              dark
            >
              Salvar
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>

            <v-btn class="ma-2" color="red" text @click="dialog = false" dark>
              Cancelar
              <v-icon dark right>mdi-cancel</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- modal -->
  </v-card>
</template>
<style scoped>
#add {
  z-index: 2;
  margin-top: -40px;
  margin-left: 20px;
  float: left;
}
</style>

<script>
import { mdiAccountMultiple } from "@mdi/js";
import { mdiAccountMultiplePlus } from "@mdi/js";
import api from "../../config/api";

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
    icons: {
      icon: mdiAccountMultiple,
      iconAdd: mdiAccountMultiplePlus,
    },
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
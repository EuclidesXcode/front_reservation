<template>
  <v-card>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.productName" label="Produto"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ean" label="EAN-13"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.quant" label="Estoque"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.price" label="Preço"></v-text-field>
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
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte os usuários por nome, cpf ou perfil..."
      ></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="provider" sort-by="quant" class="elevation-1">
      <template v-slot:item.quant="{ item }">
        <v-chip :color="getColor(item.quant)" dark>{{ item.quant }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

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
                <v-text-field v-model="name" label="Nome Fantasia *"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="cnpj" label="CNPJ *"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="ie" label="Inscrição Estadual"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="address" label="Endereço *"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="state" label="Estado *"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="city" label="Cidade *"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="cep" label="CEP *"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="email" label="E-mail"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="phone" label="Telefone"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="contact" label="Contato"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="phoneContact" label="Telefone do Contato"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="emailContact" label="E-mail do Contato"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="site" label="Site"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field v-model="obs" label="Observação"></v-text-field>
              </v-col>
            </v-row>
            </v-container>
            <small>* Preenchimento obrigatório</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn class="ma-2" color="primary" text @click="dialog = false" dark>
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

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Nome", value: "name" },
      { text: "cpf", value: "cpf" },
      { text: "Perfil", value: "profile" },
      { text: "Senha", value: "password" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    icons: {
      icon: mdiAccountMultiple,
      iconAdd: mdiAccountMultiplePlus
    },
    provider: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      cpf: "",
      profile: "",
      password: ""
    },
    defaultItem: {
      name: "",
      cpf: "",
      profile: "",
      password: ""
    }
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.provider = [
        {
          name: "Euclides Nascimento",
          cpf: "251.236.254-69",
          profile: "Gerente Adm",
          password: "*********"
        },
        {
          name: "Carla Prado",
          cpf: "168.669.635-68",
          profile: "Operadora de Caixa",
          password: "*********"
        },
        {
          name: "Marcia Baldanza",
          cpf: "336.695.875-01",
          profile: "Fiscal de Loja",
          password: "*********"
        },
        {
          name: "Lucio Flavio",
          cpf: "365.362.559-02",
          profile: "Gerente",
          password: "*********"
        },
        {
          name: "Patricia Neves",
          cpf: "325.225.325-85",
          profile: "Financeiro",
          password: "*********"
        },
      ];
    },

    getColor(quant) {
      if (quant < 10) return "red";
      else if (quant < 20) return "orange";
      else return "green";
    },

    editItem(item) {
      this.editedIndex = this.provider.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.provider.indexOf(item);
      confirm("Certeza que deseja deletar o Fornecedor?") &&
        this.provider.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.provider[this.editedIndex], this.editedItem);
      } else {
        this.provider.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
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
                    <v-text-field v-model="firsstName" label="Nome *"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field v-model="secondName" label="Sobre-nome *"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field v-model="email" label="E-mail *"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="3">
                    <v-text-field v-model="password" label="Senha *"></v-text-field>
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

    <v-tabs horizontal>
      <v-tab left>
        <v-icon left>{{ icons.icon }}</v-icon>Dados do Cliente
      </v-tab>

      <v-tab-item>
        <v-card flat>
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
                  <v-text-field v-model="firsstName" label="Nome *"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field v-model="secondName" label="Sobre-nome *"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field v-model="email" label="E-mail *"></v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field v-model="password" label="Senha *"></v-text-field>
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
      { text: "E-mail", value: "email" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    icons: {
      icon: mdiAccountMultiple,
      iconAdd: mdiAccountMultiplePlus,
    },
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.provider = [
        {
          name: "Euclides Nascimento",
          email: "euclideslione@icloud.com",
        },
        {
          name: "Suelen Monteiro",
          email: "suelen.monteiro@icloud.com",
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
    },
  },
};
</script>
<template>
  <v-card >
    <v-card-title>
      Ensaios
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>

      <v-snackbar v-model="snackbar" top="top">
        {{ msg }}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte ensaios por Nome"
      ></v-text-field>
    </v-card-title>

    <v-tabs horizontal>
      <v-tab left>
        <v-icon left>{{ icons.icon }}</v-icon
        >Dados do Ensaio
      </v-tab>

      <v-tab-item>
        <v-card flat
          ><v-data-table
            :headers="headers"
            :items="tests"
            sort-by="name"
            class="elevation-4"
          >
            <template v-slot:top>
              <v-dialog v-model="dialogEdit" max-width="800px">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Ensaio"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.price"
                            prefix="R$"
                            label="Preço"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" color="primary" text @click="save" dark>
                      Salvar
                      <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>

                    <v-btn class="ma-2" color="red" text @click="close" dark>
                      Cancelar
                      <v-icon dark right>mdi-cancel</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <!-- modal -->

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px">
        <template v-slot:activator="{ on }">
          <div class="my-2">
            <v-btn color="info" id="add" v-on="on" fab>
              <v-icon>{{ icons.iconAdd }}</v-icon>
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Novo Ensaio</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newTest.name"
                    label="Nome do Ensaio"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="newTest.price"
                    prefix="R$"
                    label="Preço"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
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
  margin-top: -40px;
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";
import { mdiMovieOpen, mdiMovieEdit } from "@mdi/js";

export default {
  data: () => ({
    formTitle: "Editar Ensaio",
    snackbar: false,
    msg: "",
    dialog: false,
    dialogEdit: false,
    arrayEvents: null,
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    headers: [
      { text: "Ensaio", value: "name" },
      { text: "Preço", value: "price" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    tests: [],
    defaultItem: {},
    editedItem: {},
    editedIndex: -1,
    newTest: {},
    icons: {
      icon: mdiMovieOpen,
      iconAdd: mdiMovieEdit,
    },
  }),

  computed: {
    ...mapGetters({
      error: "Tests/getError",
      dataTable: "Tests/getTest",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialogEdit(val) {
      val || this.close();
    },
  },

  async created() {
    await this.initialize();
  },

  methods: {
    ...mapActions({
      getTest: "Tests/getTest",
      createTest: "Tests/createTest",
      deleteTest: "Tests/deleteTest",
    }),
    async initialize() {
      await this.getTest({
        page: 1,
      });
      this.tests = this.dataTable;
      console.log("tests: ", this.tests);
    },

    async hendleSubmit() {
      await this.createTest(this.newTest);
      console.log("estou enviando: ", this.newTest);
      if (!this.error) {
        await this.initialize();
        this.dialog = false;
        this.msg = "Ensaio cadastrado com sucesso!";
        this.snackbar = true;
      } else {
        await this.initialize();
        this.dialog = false;
        this.msg = "Ensaio já cadastrado!";
        this.snackbar = true;
      }
    },

    async deleteItem(item) {
      await this.deleteTest(item._id);
      if (!this.error) await this.initialize();
      this.msg = "Ensaio detelado!";
      this.snackbar = true;
    },

    editItem(item) {
      this.editedIndex = this.tests.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },

    close() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tests[this.editedIndex], this.editedItem);
      } else {
        this.tests.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
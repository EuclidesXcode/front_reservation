<template>
  <v-card>
    <v-card-title>
      Clientes
      <v-icon id="titleIcon">{{ icons.iconUserAccount }}</v-icon>

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
        label="Consulte seus clientes por nome, cpf, nome do bebê..."
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
            :items="clients"
            sort-by="codNumber"
            class="elevation-4"
          >
            <template v-slot:top>
              <v-dialog v-model="dialogEdit" max-width="80%">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.codNumber"
                            label="Numero do Cadastro "
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Nome do Resposável *"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.babyName"
                            label="Nome do Bebê *"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.cpf"
                            label="CPF *"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.cep"
                            label="CEP *"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.address"
                            label="Endereço *"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.complement"
                            label="Complemento"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.bairro"
                            label="Bairro"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.city"
                            label="Cidade *"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.celPhone"
                            label="Celular"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.phone"
                            label="Telefone"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field
                            v-model="editedItem.email"
                            label="E-mail"
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
            <span class="headline">Novo Cliente</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-tabs horiontal>
                <v-tab left>
                  <v-icon left>{{ icons.iconAdd }}</v-icon
                  >Cadastrar novo Cliente
                </v-tab>

                <v-tab-item>
                  <v-card flat>
                    <v-row>
                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.codNumber"
                          label="Numero do Cadastro "
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.name"
                          label="Nome do Resposável *"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.babyName"
                          label="Nome do Bebê *"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.cpf"
                          label="CPF *"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.cep"
                          label="CEP *"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.address"
                          label="Endereço *"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.complement"
                          label="Complemento"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.bairro"
                          label="Bairro"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.city"
                          label="Cidade *"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.celPhone"
                          label="Celular"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.phone"
                          label="Telefone"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          v-model="newClient.email"
                          label="E-mail"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-tab-item>
              </v-tabs>
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
  margin-top: -40px;
}
</style>

<script>
import { mdiCardAccountDetails } from "@mdi/js";
import { mdiAccountGroup } from "@mdi/js";
import { mdiAccountPlus } from "@mdi/js";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    formTitle: "Editar Cliente",
    search: "",
    msg: "",
    dialog: false,
    dialogEdit: false,
    snackbar: false,
    clients: [],
    headers: [
      { text: "N° Cadastro", value: "codNumber" },
      { text: "Nome", value: "name" },
      { text: "Bebê", value: "babyName" },
      { text: "CPF", value: "cpf" },
      { text: "Bairro", value: "bairro" },
      { text: "Celular", value: "celPhone" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    defaultItem: {},
    editedItem: {},
    editedIndex: -1,
    newClient: {},
    icons: {
      icon: mdiCardAccountDetails,
      iconAdd: mdiAccountPlus,
      iconUserAccount: mdiAccountGroup,
    },
  }),

  computed: {
    ...mapGetters({
      error: "Clients/getError",
      dataTable: "Clients/getClients",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  async created() {
    await this.initialize();
  },

  watch: {
    dialogEdit(val) {
      val || this.close();
    },
  },

  methods: {
    ...mapActions({
      getClients: "Clients/getClients",
      createClient: "Clients/createClient",
      deleteClient: "Clinets/deleteClient",
    }),

    async initialize() {
      await this.getClients({
        page: 1,
        noLimit: true,
      });
      this.clients = this.dataTable;
      console.log("datatable: ", this.dataTable);
    },

    async hendleSubmit() {
      await this.createClient(this.newClient);
      console.log("o que eu envio: ", this.newClient);
      if (!this.error) {
        await this.initialize();
        this.dialog = false;
        this.msg = "Cliente cadastrado com sucesso!";
        this.snackbar = true;
      } else {
        await this.initialize();
        console.log("error clients: ", this.error);
        this.dialog = false;
        this.msg = this.error.msg;
        this.snackbar = true;
      }
    },

    async deleteItem(item) {
      await this.deleteClient(item._id);
      if (!this.error) await this.initialize();
      this.msg = "Cliente detelado!";
      this.snackbar = true;
    },

    editItem(item) {
      this.editedIndex = this.clients.indexOf(item);
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
        Object.assign(this.clients[this.editedIndex], this.editedItem);
      } else {
        this.clients.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
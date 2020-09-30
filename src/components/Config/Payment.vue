<template>
  <v-card>
    <v-card-title>
      Formas de Pagamento
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
        label="Consulte formas de pagamento por nome"
      ></v-text-field>
    </v-card-title>

    <v-tabs horizontal>
      <v-tab left>
        <v-icon left>{{ icons.icon }}</v-icon>Dados da Forma de Pagamento
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="payments"
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
                        <v-col cols="12" sm="6" md="12">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Forma de Pagamento"
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
            <span class="headline">Nova forma de Pagamento</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field v-model="newPayment.name" label="Forma de Pagamento"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="ma-2" color="primary" text @click="handlePayment()" dark>
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
import { mapActions, mapGetters } from 'vuex';
import { mdiCashMultiple, mdiCashPlus } from "@mdi/js";

export default {
  data: () => ({
    formTitle: "Editar Forma de Pagamento",
    snackbar: false,
    msg: '',
    dialog: false,
    dialogEdit: false,
    headers: [
      { text: "Forma de Pagamento", value: "name" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    payments: [],
    defaultItem: {},
    editedItem: {},
    editedIndex: -1,
    newPayment: {},
    icons: {
      icon: mdiCashMultiple,
      iconAdd: mdiCashPlus,
    },
    
  }),

  computed: {
    ...mapGetters({
      error: "Payment/getError",
      dataTable: "Payment/getPayment"
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
      getPayment: "Payment/getPayment",
      createPayment: "Payment/createPayment",
      deletePayment: "Payment/deletePayment"
    }),
    
    async initialize() {
      await this.getPayment({
        page:1
      });
      this.payments = this.dataTable;
      console.log("payment: ", this.payments)
    },
    
    async handlePayment() {
      await this.createPayment(this.newPayment);
      if(!this.error) {
        await this.initialize();
        this.dialog = false;
        this.msg = 'Forma de pagamento cadastrada com sucesso!'
        this.snackbar = true;
       } else {
        await this.initialize();
        this.dialog = false;
        this.msg = 'Forma de pagamento já cadastrada!'
        this.snackbar = true;
       }
    },

    async deleteItem(item){
      await this.deletePayment(item._id);
      if(!this.error) 
        await this.initialize();
        this.msg = 'Forma de pagamento detelada!'
        this.snackbar = true;
    },

    editItem(item) {
      this.editedIndex = this.payments.indexOf(item);
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
        Object.assign(this.payments[this.editedIndex], this.editedItem);
      } else {
        this.payments.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
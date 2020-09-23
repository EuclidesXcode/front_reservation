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
      Agendamentos
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte agendamentos por N° de cadastro ou responsável..."
      ></v-text-field>
    </v-card-title>

    <v-tabs horizontal>
      <v-tab left>
        <v-icon left>{{ icons.icon }}</v-icon>Dados de Agendamento
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-data-table :headers="headers" :items="products" sort-by="quant" class="elevation-1">
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
            <span class="headline">Novo Agendamento</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field v-model="barCod" label="Selecione o Cliente"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field v-model="internCod" label="Selecione o Ensaio"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field v-model="internCod" label="Forma de Pagamento"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <div>
                    <div class="subheading">Selecione a data</div>
                    <v-date-picker
                      v-model="date2"
                      :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
                      :events="functionEvents"
                    ></v-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="subheading">Selecione um horário</div>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="10:00"
                    required
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="11:00"
                    required
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="12:00"
                    required
                  ></v-checkbox>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="subheading">Data e hora selecionada</div>
                  <v-text-field value="22/09/2020 - 10:00" label="Solo" solo readonly></v-text-field>
                  <v-text-field value="24/09/2020 - 10:00" label="Solo" solo readonly></v-text-field>
                  <v-text-field value="26/09/2020 - 10:00" label="Solo" solo readonly></v-text-field>
                </v-col>
              </v-row>
            </v-container>
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
  margin-top: -40px;
}
</style>

<script>
import { mdiBookAccount, mdiBookPlusMultiple } from "@mdi/js";

export default {
  data: () => ({
    dialog: false,
    arrayEvents: null,
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    headers: [
      { text: "N° Cadastro", value: "numberRegistre" },
      { text: "Responsável", value: "parents" },
      { text: "Bebê", value: "baby" },
      { text: "Ensaio", value: "test" },
      { text: "Data Próximo Ensaio", value: "newTestDate" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    icons: {
      icon: mdiBookAccount,
      iconAdd: mdiBookPlusMultiple,
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

  mounted() {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  },

  methods: {
    initialize() {
      this.products = [
        {
          numberRegistre: "001",
          parents: "Euclides Silva",
          baby: "Joaquim Silva",
          test: "Ensaio NewBorn",
          newTestDate: "29/09/2020 - 10:30",
        },
        {
          numberRegistre: "001",
          parents: "Euclides Silva",
          baby: "Joaquim Silva",
          test: "Ensaio NewBorn",
          newTestDate: "29/09/2020 - 10:30",
        },
        {
          numberRegistre: "001",
          parents: "Euclides Silva",
          baby: "Joaquim Silva",
          test: "Ensaio NewBorn",
          newTestDate: "29/09/2020 - 10:30",
        },
        {
          numberRegistre: "001",
          parents: "Euclides Silva",
          baby: "Joaquim Silva",
          test: "Ensaio NewBorn",
          newTestDate: "29/09/2020 - 10:30",
        },
      ];
    },

    functionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    },

    getColor(quant) {
      if (quant < 10) return "red";
      else if (quant < 20) return "orange";
      else return "green";
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Certeza que deseja deletar o Produto?") &&
        this.products.splice(index, 1);
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
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
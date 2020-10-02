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
                    <v-text-field
                      v-model="editedItem.productName"
                      label="Produto"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.ean"
                      label="EAN-13"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.quant"
                      label="Estoque"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.price"
                      label="Preço"
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
      Agendamentos
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>

      <v-snackbar v-model="snackbar" top="top">
        {{ text }}
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
        label="Consulte agendamentos por N° de cadastro ou responsável..."
      ></v-text-field>
    </v-card-title>

    <v-tabs horizontal>
      <v-tab left>
        <v-icon left>{{ icons.icon }}</v-icon
        >Dados de Agendamento
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-data-table
            :headers="headers"
            :items="products"
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
            <span class="headline">Novo Agendamento</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="3">
                  <v-select
                    :items="clientsSelect"
                    label="Selecione o Cliente"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="3">
                  <v-select
                    :items="testsSelect"
                    label="Selecione o Ensaio"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="3">
                  <v-select
                    :items="paymentSelect"
                    label="Forma de Pagamento"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="2">
                  <v-select :items="parcelado" label="Parcelas"></v-select>
                </v-col>

                <v-col cols="12" md="1">
                  <v-checkbox
                    v-model="checkbox"
                    label="Sinal"
                    required
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="4">
                  <div class="subheading">Selecione uma data</div>
                  <v-date-picker
                    v-model="dates"
                    multiple
                    elevation="3"
                  ></v-date-picker>
                </v-col>

                <v-col cols="12" md="4">
                  <div class="subheading">Selecione um horário</div>
                  <v-time-picker
                    v-model="times"
                    @click:minute="setTime(time)"
                    elevation="3"
                  ></v-time-picker>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    multiple
                    chips
                    v-model="dateRangeText"
                    label="Data selecionada"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                  <v-text-field
                    multiple
                    v-model="times"
                    label="Horário selecionado"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field>

                  <v-btn class="mx-2" @click="add()" fab dark color="blue">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>

                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Data</th>
                          <th class="text-left">Hora</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in agendamentos" :key="item">
                          <td>{{ item.data[0] }}</td>
                          <td>{{ item.hora }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
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
              @click="(dialog = false), (snackbar = true)"
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
import { mdiBookAccount, mdiBookPlusMultiple } from "@mdi/js";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    menu: false,
    snackbar: false,
    text: "Agendamento cadastrado com sucesso!",
    dialog: false,
    arrayEvents: null,
    clientsSelect: [],
    testsSelect: [],
    paymentSelect: [],
    picker: null,
    dates: null,
    times: [],
    agendamentos: [],
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
    products: [
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
    ],
    icons: {
      icon: mdiBookAccount,
      iconAdd: mdiBookPlusMultiple,
    },
    clientes: ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4"],
    ensaios: ["Ensaio 1", "Ensaio 2", "Ensaio 3", "Ensaio 4"],
    pagamento: ["Pagamento 1", "Pagamento 2", "Pagamento 3", "Pagamento 4"],
    parcelado: [
      "A vista",
      "2x",
      "3x",
      "4x",
      "5x",
      "6x",
      "7x",
      "8x",
      "9x",
      "10x",
    ],
  }),

  computed: {
    ...mapGetters({
      errorClient: "Clients/getError",
      dataClients: "Clients/getClients",
      dataTests: "Tests/getTest",
      errorTest: "Tests/getError",
      dataPayment: "Payment/getPayment",
      errorPayment: "Payment/getError",
    }),
    dateRangeText() {
      return this.dates
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  async created() {
    await this.initialize();
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
    ...mapActions({
      getClients: "Clients/getClients",
      getTest: "Tests/getTest",
      getPayment: "Payment/getPayment",
    }),
    async setTime(time) {
      await this.times.push(time);
    },
    async initialize() {
      await this.getClients({
        page: 1,
        noLimit: true,
      });
      this.clientsSelect = await this.dataClients.map(
        (items) => items.codNumber
      );

      await this.getTest({
        page: 1,
      });
      this.testsSelect = await this.dataTests.map((items) => items.name);

      await this.getPayment({
        page: 1,
      });
      this.paymentSelect = await this.dataPayment.map((items) => items.name);
      console.log(
        "AAAA",
        this.clientsSelect,
        "BBBB",
        this.testsSelect,
        "CCCC",
        this.paymentSelect
      );
    },

    functionEvents(date) {
      console.log("selecionado: ", date);
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red"] || ["blue"];
      return false;
    },

    async add(){
      await this.agendamentos.push({data: this.dates, hora: this.times});
      this.dates = []
      this.times = []
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
<template>
  <v-card>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.client"
                      label="Cliente"
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
        label="Consulte agendamentos por N° de Cliente, Cnsaio, Status..."
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
            :items="schedules"
            sort-by="quant"
            class="elevation-1"
          >
            <template v-slot:item.actions="{item}">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
                    v-model="clientSelected"
                    :items="clientsSelect"
                    item-text="cod"
                    item-value="name"
                    label="Selecione o Cliente"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="3">
                  <v-select
                    v-model="testSelected"
                    :items="testsSelect"
                    item-text="name"
                    item-value="name"
                    label="Selecione o Ensaio"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="3">
                  <v-select
                    v-model="paymentSelected"
                    :items="paymentSelect"
                    item-text="name"
                    item-value="name"
                    label="Forma de Pagamento"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="2">
                  <v-select
                    v-model="plots"
                    :items="parcelado"
                    label="Parcelas"
                  ></v-select>
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
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        multiple
                        chips
                        v-model="dateRangeText"
                        label="Data"
                        prepend-icon="mdi-calendar"
                        readonly
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        multiple
                        v-model="times"
                        label="Hora"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-btn class="mx-2" @click="add()" fab dark color="blue">
                      <v-icon dark> mdi-plus </v-icon>
                    </v-btn>
                  </v-row>

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

                <v-col cols="12" sm="12">
                  <v-text-field v-model="obs" label="Observação"></v-text-field>
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
import { mdiBookAccount, mdiBookPlusMultiple } from "@mdi/js";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    msg: '',
    search: '',
    checkbox: false,
    clientSelected: "",
    testSelected: "",
    paymentSelected: "",
    plots: "",
    menu: false,
    snackbar: false,
    text: "Agendamento cadastrado com sucesso!",
    dialog: false,
    dialogEdit: false,
    arrayEvents: null,
    clientsSelect: [],
    testsSelect: [],
    paymentSelect: [],
    picker: null,
    dates: [],
    times: [],
    obd: '',
    agendamentos: [],
    date1: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 10),
    headers: [
      { text: "Cliente", value: "client" },
      { text: "Ensaio", value: "test" },
      { text: "Data Próximo Ensaio", value: "nextTest" },
      { text: "Observação", value: "obs" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    defaultItem: {},
    editedItem: {},
    editedIndex: -1,
    schedules: [],
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
      errorSchedules: "Schedules/getError",
      dataSchedules: "Schedules/getSchedules",
      errorClient: "Clients/getError",
      dataClients: "Clients/getClients",
      dataTests: "Tests/getTest",
      errorTest: "Tests/getError",
      dataPayment: "Payment/getPayment",
      errorPayment: "Payment/getError",
    }),
    dateRangeText() {
      return this.dates;
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
      getSchedules: "Schedules/getSchedules",
      createSchedules: "Schedules/createSchedules",
      deleteSchedule: "Schedules/deleteSchedule",
      getClients: "Clients/getClients",
      getTest: "Tests/getTest",
      getPayment: "Payment/getPayment",
    }),
    async setTime(time) {
      await this.times.push(time);
    },
    async initialize() {
      await this.getSchedules({
        page: 1
      });
      // this.schedules = this.dataSchedules;
      const schedules = await this.dataSchedules.map((items) => ({
        id: items._id,
        client: items.client,
        test: items.test,
        nextTest: 'Dia '+items.listSchedules[0].data+' às '+items.listSchedules[0].hora,
        obs: items.obs,
        payment: items.payment,
        plots: items.plots
      }));
      this.schedules = await schedules.map((items) => (items));
      console.log("Agendamentos: ", this.schedules);
      
      await this.getClients({
        page: 1,
        noLimit: true,
      });
      this.clientsSelect = await this.dataClients.map((items) => ({
        cod: items.codNumber,
        id: items._id,
      }));
      console.log("Clientes: ", this.clientsSelect);

      await this.getTest({
        page: 1,
      });
      this.testsSelect = await this.dataTests.map((items) => ({
        name: items.name,
        id: items._id,
      }));

      await this.getPayment({
        page: 1,
      });
      this.paymentSelect = await this.dataPayment.map((items) => ({
        name: items.name,
        id: items._id,
      }));
    },

    functionEvents(date) {
      console.log("selecionado: ", date);
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red"] || ["blue"];
      return false;
    },

    async add() {
      await this.agendamentos.push({ data: this.dates, hora: this.times });
      this.dates = [];
      this.times = [];
    },

    async hendleSubmit() {
      console.log("agendamentos: => ---", this.agendamentos);
      const datas = await this.agendamentos.map((items) => ({
        data: items.data[0],
        hora: items.hora,
      }));
      const schedule = 
        {
          client: this.clientSelected,
          test: this.testSelected,
          payment: this.paymentSelected,
          plots: this.plots,
          sinal: this.checkbox,
          listSchedules: datas,
          obs: this.obs
        };

      console.log("to enviando: ", schedule);

      await this.createSchedules(schedule);
      console.log("passou do envio");
      if (!this.error) {
        await this.initialize();
        this.dialog = false;
        this.msg = "Agendamento cadastrado com sucesso!";
        this.snackbar = true;
      } else {
        await this.initialize();
        this.dialog = false;
        this.msg = this.error.msg;
        this.snackbar = true;
      }
    },

    getColor(quant) {
      if (quant < 10) return "red";
      else if (quant < 20) return "orange";
      else return "green";
    },

    editItem(item) {
      this.editedIndex = this.schedules.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },

    async deleteItem(item) {
      await this.deleteSchedule(item.id);
      if (!this.error) {
        console.log("entrou no excluiu o agendamento");
        this.msg = "Agendamento detelado!";
        await this.initialize();
        this.snackbar = true;
      } else {
        console.log("entrou no erro ao deletar o agendamento");
        this.msg = this.error.msg;
        this.snackbar = true;
      }
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
        Object.assign(this.schedules[this.editedIndex], this.editedItem);
      } else {
        this.schedules.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
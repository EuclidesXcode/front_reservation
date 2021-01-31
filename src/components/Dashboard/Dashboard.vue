<template>
  <v-row class="fill-height">
    <v-card 
      shaped
      elevation="3"
      class="mx-auto" 
      max-width="344" 
      v-for="item in schedules" 
      :key="item.id">
      <v-card-text>
        <p class="display-1 text--primary">{{item.test}}</p>
        <div class="text--primary">
          <strong>N Cliente:</strong> {{item.client}}
        </div>
        <div class="text--primary">
          <strong>Próximo ensaio:</strong> <br />
          Dia {{item.nextTest.split(' ', )[0]}} as {{item.nextTest.split(' ',)[1]}}
        </div>
        <div class="text--primary">
          <strong>Observação:</strong> <br />
          {{item.obs}}
        </div>
      </v-card-text>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4"> Editar Ensaio </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    schedules: [],
    names: [],
    datas: [],
  }),

  computed: {
    ...mapGetters({
      errorSchedules: "Schedules/getError",
      dataSchedules: "Schedules/getSchedules",
    }),
  },

  mounted() {
    this.$refs.calendar.checkChange();
  },

  async created() {
    await this.initialize();
  },

  methods: {
    ...mapActions({
      getSchedules: "Schedules/getSchedules",
      createSchedules: "Schedules/createSchedules",
      deleteSchedule: "Schedules/deleteSchedule",
    }),
    async initialize() {
      await this.getSchedules({
        page: 1,
      });
      // this.schedules = this.dataSchedules;
      const schedules = await this.dataSchedules.map((items) => ({
        id: items._id,
        client: items.client,
        test: items.test,
        nextTest:
          items.listSchedules[0].data + " " + items.listSchedules[0].hora,
        obs: items.obs,
        payment: items.payment,
        plots: items.plots,
      }));
      this.schedules = await schedules.map((items) => items);

      const names = await this.dataSchedules.map((items) => items.test);
      this.names = names;
      console.log("o que ta vindo do agendamento: ", this.schedules);

      const datas = await this.dataSchedules.map(
        (items) =>
          items.listSchedules[0].data + " " + items.listSchedules[0].hora
      );
      this.datas = datas;
      console.log("o que ta vindo do agendamento: ", this.datas);

      console.log("Names Dashboard : ", this.names);
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        console.log("all day: ", this.datas);
        events.push({
          name: this.names[0],
          start: this.datas[0],
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
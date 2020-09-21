<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Financeiro</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">{{ item.title }} <v-icon id="titleIcon">{{ item.icon }}</v-icon></v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<style>
/* Helper classes */
.basil--text {
  color: #0e6dcc !important;
}
#titleIcon {
  margin-left: 7px;
}
</style>

<script>
import {
  mdiCashMinus,
  mdiCashPlus,
  mdiCardBulleted    
} from '@mdi/js'

export default {
  components: {
  },
  data() {
    return {
      tab: null,
      items: [
        { title: "contas à pagar", component: '', icon: mdiCashMinus },
        { title: "contas à receber", component: '', icon: mdiCashPlus },
        { title: "notas e boletos", component: '', icon: mdiCardBulleted }
      ]
    };
  }
};
</script>
<template>
  <v-card color="basil">

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">{{ item.title }} <v-icon id="titleIcon">{{ item.icon }}</v-icon></v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card color="basil" flat>
          <component id="component" :is="item.component" />
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

#component {
  padding: 15px;
}
#titleIcon {
  margin-left: 7px;
}
.btn-form {
  margin-right: 15px;
}
</style>

<script>
import Test from './Test';
import Payment from './Payment';
import {
  mdiMovieOpen,
  mdiCashMultiple 
} from "@mdi/js";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Test: Test,
    Payment: Payment
  },
  data() {
    return {
      tab: null,
      items: [
        { title: "Ensaios", component: Test, icon: mdiMovieOpen },
        { title: "Formas de Pagamento", component: Payment, icon: mdiCashMultiple  }
      ]
    };
  }
};
</script>
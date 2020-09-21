<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Produtos</h1>
    </v-card-title>

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
import SrcProducts from "./SrcProducts";
import PromProducts from "./PromProducts";
import StockProducts from "./StockProducts";
import {
  mdiLayers,
  mdiPercentOutline,
  mdiPackageVariantClosed 
} from "@mdi/js";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SrcProducts: SrcProducts
  },
  data() {
    return {
      tab: null,
      items: [
        { title: "Produtos", component: SrcProducts, icon: mdiLayers },
        { title: "promoções", component: PromProducts, icon: mdiPercentOutline  },
        { title: "estoque", component: StockProducts, icon: mdiPackageVariantClosed  }
      ]
    };
  }
};
</script>
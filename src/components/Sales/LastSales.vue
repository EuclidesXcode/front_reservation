<template>
  <div>
    <v-card-title>
      Últimas Vendas
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>
    </v-card-title>
    <slot name="lastsales"></slot>
  </div>
</template>

<script>
import { mdiCartArrowDown } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        icon: mdiCartArrowDown
      }
    };
  }
};
</script>
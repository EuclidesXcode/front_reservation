<template>
  <v-card>
    <v-card-title>
      Consultar Vendas
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>
    </v-card-title>
    <v-row>
      <v-col cols="1" sm="4">
        <v-date-picker v-model="dates" range no-title></v-date-picker>
      </v-col>
      <v-col cols="1" sm="4">
        <h4>Filtro</h4>
        <v-treeview selectable selected-color="blue" :items="items"></v-treeview>
      </v-col>
      <v-col cols="10" sm="4">
        <h4>Resultado</h4>
        <slot name="srcSales"></slot>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiMagnify } from "@mdi/js";

export default {
  data() {
    return {
      icons: {
        icon: mdiMagnify
      },
      dates: new Date(),
      menu: false,
      items: [
        {
          id: 1,
          name: "Loja",
          children: [
            { id: 1, name: "Matriz" },
            { id: 5, name: "Jardim Leal" },
            { id: 3, name: "Vila Operaria" },
            { id: 4, name: "Beira Mar" }
          ]
        },
        {
          id: 2,
          name: "PDV",
          children: [
            {
              id: 1,
              name: "Matriz",
              children: [
                { id: 11, name: "PDV-01" },
                { id: 12, name: "PDV-02" },
                { id: 13, name: "PDV-03" },
                { id: 14, name: "PDV-04" },
                { id: 15, name: "PDV-05" },
                { id: 16, name: "PDV-06" }
              ]
            },
            {
              id: 5,
              name: "Jardim Leal",
              children: [
                { id: 21, name: "PDV-01" },
                { id: 22, name: "PDV-02" },
                { id: 23, name: "PDV-03" },
                { id: 24, name: "PDV-04" },
                { id: 25, name: "PDV-05" },
                { id: 26, name: "PDV-06" },
                { id: 27, name: "PDV-07" },
                { id: 82, name: "PDV-08" }
              ]
            },
            {
              id: 3,
              name: "Vila Operaria",
              children: [
                { id: 31, name: "PDV-01" },
                { id: 32, name: "PDV-02" },
                { id: 33, name: "PDV-03" }
              ]
            },
            {
              id: 4,
              name: "Beira Mar",
              children: [
                { id: 41, name: "PDV-01" },
                { id: 42, name: "PDV-02" },
                { id: 43, name: "PDV-03" },
                { id: 44, name: "PDV-04" },
                { id: 55, name: "PDV-05" }
              ]
            }
          ]
        },
        {
          id: 3,
          name: "Turno",
          children: [
            { id: 51, name: "Manha" },
            { id: 52, name: "Tarde" },
            { id: 53, name: "Noite" },
          ]
        }
      ]
    };
  },
    computed: {
    },
};
</script>
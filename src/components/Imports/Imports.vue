<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Notas Fiscais e XML</h1>
    </v-card-title>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item.title }}
        <v-icon id="titleIcon">{{ item.icon }}</v-icon>
      </v-tab>
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
#component {
  padding: 15px;
}
.basil--text {
  color: #0e6dcc !important;
}
#titleIcon {
  margin-left: 7px;
}
</style>

<script>
import IssueNote from "./IssueNote";
import Import from "./Import";
import Response from "./Response";
import { mdiFileImport, mdiFileSearch, mdiFileExport } from "@mdi/js";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
  },
  data() {
    return {
      tab: null,
      items: [
        { 
          title: "Emitir Nota Fiscal", 
          component: IssueNote, 
          icon: mdiFileExport,
        },
        { 
          title: "Importar Arquivo", 
          component: Import, 
          icon: mdiFileImport,
        },
        {
          title: "Visualizar Nota Fiscal",
          component: Response,
          icon: mdiFileSearch
        }
      ]
    };
  }
};
</script>
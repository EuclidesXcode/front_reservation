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
import {
  mdiAccountMultiple
} from '@mdi/js'
import User from "./User"

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    User: User
  },
  data() {
    return {
      tab: null,
      items: [
        { title: "Usuários", component: User, icon: mdiAccountMultiple },
      ]
    };
  }
};
</script>
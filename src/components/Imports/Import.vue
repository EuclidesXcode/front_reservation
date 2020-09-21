<template>
  <v-card>
    <v-card-title>
      Importar Nota XML
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>
    </v-card-title>
    <form method="POST">
      <v-file-input accept="csv/*" label="Nota Fiscal XML"></v-file-input>
      <v-spacer></v-spacer>
      <v-btn
        :loading="loading"
        :disabled="loading"
        color="blue-grey"
        class="ma-2 white--text"
        @click="loader = 'loading'"
      >
        Upload
        <v-icon right dark>mdi-cloud-upload</v-icon>
      </v-btn>
    </form>
  </v-card>
</template>

<script>
import { mdiFileDownload } from "@mdi/js";
export default {
  data() {
    return {
      icons: {
        icon: mdiFileDownload
      },
      loader: false,
      loading: false,
    };
  },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
};
</script>
<template>
  <v-form v-model="valid">
    <v-card-title>
      Cadastro de Produto
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>
    </v-card-title>
    <v-row>
      <v-col cols="12" md="3">
        <v-text-field v-model="barCod" label="Código de Barras"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="internCod" label="Código Interno"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="productName" label="Descrição do Produto"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-text-field v-model="minProductName" label="Descrição Resumida"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="provider" label="Fornecedor"></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="groupProducts" label="Grupo do Produto"></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="subGroupProducts" label="Sub-grupo do Produto"></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="und" label="Unidade de medida"></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="ncm" label="NCM"></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="cest" label="CEST"></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="cfop" label="CFOP"></v-select>
      </v-col>

      <v-col cols="12" md="3">
        <v-select :items="icms" label="Situação Tributária ICMS"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" color="primary" dark>
        Salvar
        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
      </v-btn>

      <v-btn class="ma-2" color="red" dark>
        Cancelar
        <v-icon dark right>mdi-cancel</v-icon>
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
import { mdiPencilPlus } from "@mdi/js";
export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    email: "",
    icons: {
      icon: mdiPencilPlus
    },
    groupProducts: ["Bebidas", "Carnes"],
    subGroupProducts: ["Nacionais", "Importados"],
    und: ["KG", "LT", "UND"],
    ncm: ["5245.58.57", "2514.25.15", "3215.21.25", "2532.58.88"],
    cest: ["17.096.00", "17.096.01", "17.096.02"],
    cfop: ["1.000", "1.100", "1.101", "1.102"],
    icms: ["ISENTO"],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>
<template>
  <v-card>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.productName" label="Produto"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.ean" label="EAN-13"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.quant" label="Estoque"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.price" label="Preço"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <v-card-title>
      Produtos
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte produtos por código de barras, código interno ou nome..."
      ></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="products" sort-by="quant" class="elevation-1">
      <template v-slot:item.quant="{ item }">
        <v-chip :color="getColor(item.quant)" dark>{{ item.quant }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

    <!-- modal -->

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="80%">
        <template v-slot:activator="{ on }">
          <div class="my-2">
            <v-btn color="info" id="add" v-on="on" fab>
              <v-icon>{{ icons.iconAdd }}</v-icon>
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Novo Produto</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
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
            </v-container>
            <small>* Preenchimento obrigatório</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="ma-2" color="primary" text @click="dialog = false" dark>
              Salvar
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>

            <v-btn class="ma-2" color="red" text @click="dialog = false" dark>
              Cancelar
              <v-icon dark right>mdi-cancel</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- modal -->
  </v-card>
</template>
<style scoped>
#add {
  margin-top: -40px;
}
</style>

<script>
import { mdiLayers, mdiLayersPlus } from "@mdi/js";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "EAN-13", value: "ean" },
      { text: "Produto", value: "productName" },
      { text: "Estoque", value: "quant" },
      { text: "Preço", value: "price" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    icons: {
      icon: mdiLayers,
      iconAdd: mdiLayersPlus
    },
    products: [],
    editedIndex: -1,
    editedItem: {
      productName: "",
      ean: 0,
      quant: 0,
      price: ""
    },
    defaultItem: {
      productName: "",
      ean: 0,
      quant: 0,
      price: ""
    },
    valid: false,
    firstname: "",
    lastname: "",
    email: "",
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
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.products = [
        {
          productName: "Coca-Cola 2LT",
          ean: 789564656163,
          quant: 15,
          price: "R$ 6,99"
        },
        {
          productName: "Guaraná Kuat 2LT",
          ean: 789564656547,
          quant: 5,
          price: "R$ 4,99"
        },
        {
          productName: "Suco Tang Uva UND",
          ean: 789564634444,
          quant: 350,
          price: "R$ 0,99"
        },
        {
          productName: "Suco del valle 250ml",
          ean: 789564656163,
          quant: 32,
          price: "R$ 2,69"
        },
        {
          productName: "Suco Laranja Del Valle Fresh 200ml",
          ean: 789564621555,
          quant: 22,
          price: "R$ 1,29"
        },
        {
          productName: "Mineirinho 2LT",
          ean: 789564656222,
          quant: 12,
          price: "R$ 3,99"
        }
      ];
    },

    getColor(quant) {
      if (quant < 10) return "red";
      else if (quant < 20) return "orange";
      else return "green";
    },

    editItem(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm("Certeza que deseja deletar o Produto?") &&
        this.products.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
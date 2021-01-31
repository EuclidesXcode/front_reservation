<template>
  <v-card>
    <v-card-title>
      Vendas
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>

      <v-snackbar v-model="snackbar" top="top">
        {{ msg }}
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte suas vendas por Produtos ou serviços"
      ></v-text-field>
    </v-card-title>

    <v-tabs horizontal>
      <v-tab left>
        <v-icon left>{{ icons.icon }}</v-icon
        >Ultimas Vendas de Produtos
      </v-tab>
      <!-- Produtos -->
      <v-tab-item>
        <v-card flat>
          <v-data-table
            :headers="headersProducts"
            :items="salesProductsGet"
            :single-expand="singleExpand"
            :expanded.sync="salesProductsGet.products"
            item-key="name"
            show-expand
            class="elevation-1"
          >
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                Detalhes da Venda
                <table>
                  <tr>
                    <th>Produtos</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                  </tr>
                  <tr>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.qntd }}</td>
                  </tr>
                </table>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- Services -->

      <v-tab left>
        <v-icon left>{{ icons.icon }}</v-icon
        >Ultimas Vendas de Serviços
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <v-data-table
            :headers="headersServices"
            :items="services"
            sort-by="name"
            class="elevation-4"
          >
            <template v-slot:top>
              <!-- Edited Services in here -->
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>

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
            <span class="headline">Novo Venda de Produtos ou Serviços</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <!-- Produtos -->
              <v-tabs horizontal>
                <v-tab left>
                  <v-icon left>{{ icons.iconAdd }}</v-icon
                  >Nova venda de Produtos
                </v-tab>
                <!-- Produtos -->
                <v-tab-item>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="productSeler.id"
                        label="Selecione o Produto"
                        :items="products"
                        item-text="name"
                        item-value="_id"
                        @change="handleProductForSale()"
                      ></v-autocomplete>
                    </v-col>
                    
                    <v-col cols="12" md="6">
                      <v-autocomplete
                        v-model="productSeler.id"
                        label="Selecione o Produto"
                        :items="products"
                        item-text="name"
                        item-value="_id"
                        @change="handleProductForSale()"
                      ></v-autocomplete>
                    </v-col>

                    <v-dialog v-model="productQntdDialog" max-width="250">
                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="productSeler.qntd"
                                  label="Quantidade"
                                ></v-text-field>
                                <v-btn @click="addQuant"> add </v-btn>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                      </v-card>
                    </v-dialog>

                    <v-col cols="12" md="6">
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">Produtos</th>
                              <th class="text-left">Preço</th>
                              <th class="text-left">Qntd</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in salesProducts" :key="item">
                              <td>{{ item.name }}</td>
                              <td v-mask="'####,##'">{{ item.price }}</td>
                              <td v-mask="'####,##'">{{ item.qntd }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-tab-item>

                <!-- Serviços -->
                <v-tab left>
                  <v-icon left>{{ icons.iconAdd }}</v-icon
                  >Nova venda de Serviços
                </v-tab>
                <!-- Produtos -->
                <v-tab-item>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-autocomplete v-model="services.name"></v-autocomplete>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-left">Serviços</th>
                              <th class="text-left">Preço</th>
                              <th class="text-left">Qntd</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in services" :key="item">
                              <td>{{ item.name }}</td>
                              <td>{{ item.price }}</td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="ma-2"
              color="success"
              text
              @click="hendleSubmit()"
              dark
            >
              Vender
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
  z-index: 2;
  margin-top: -40px;
  margin-left: 20px;
  float: left;
}
</style>

<script>
import { mapActions, mapGetters } from "vuex";
import { mdiCartOutline } from "@mdi/js";
import { mdiCartPlus } from "@mdi/js";

export default {
  data: () => ({
    singleExpand: false,
    snackbar: false,
    search: "",
    msg: "",
    productList: [],
    productSeler: [],
    productQntdDialog: false,
    showPass: false,
    dialogEdit: false,
    password: "",
    rules: {
      required: (value) => !!value || "Campo obrigatório.",
      min: (v) => v.length >= 8 || "Min 8 caractéres",
    },
    firsstName: "",
    secondName: "",
    name: "",
    email: "",
    dialog: false,
    headersProducts: [
      { text: "Cliente", value: "client" },
      { text: "Valor total", value: "totalValue" },
      { text: "Status", value: "statusText" },
      { text: "Data", value: "createdAt", dataType: "Date" },
    ],
    headersServices: [
      { text: "Serviço", value: "serviceName" },
      { text: "Preço", value: "servicePrice" },
      { text: "Quantidade", value: "serviceQuant" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    saleDetails: [
      { text: "Produto", value: "item.name" },
      { text: "Quantidade", value: "item.qntd" },
      { text: "Valor", value: "item.price" },
    ],
    salesProducts: [],
    products: [],
    salesProductsGet: [],
    services: [],
    defaultItem: {},
    editedItem: {},
    editedIndex: -1,
    newUser: {},
    users: [],
    icons: {
      icon: mdiCartOutline,
      iconAdd: mdiCartPlus,
    },
    productSel: null,
  }),

  computed: {
    ...mapGetters({
      error: "Sales/getError",
      errorProduct: "Products/getError",
      dataProducts: "Products/getProducts",
      dataSaleProduct: "Sales/getSalesProducts",
      dataSaleService: "Sales/getSalesServices",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialogEdit(val) {
      val || this.close();
    },
  },

  async created() {
    await this.initialize();
  },

  methods: {
    ...mapActions({
      getProducts: "Products/getProducts",
      getSalesProducts: "Sales/getSalesProducts",
      getSalesServices: "Sales/getSalesServices",
      createSaleProduct: "Sales/createSaleProduct",
      createSaleService: "Sales/createSaleService",
      deleteSaleProduct: "Sales/deleteSaleProduct",
      deleteSaleService: "Sales/deleteSaleService",
    }),

    async initialize() {
      await this.getProducts({
        page: 1,
        noLimit: true,
      });
      this.products = this.dataProducts;
      await this.getSalesProducts({
        page: 1,
        noLimit: true,
      });
      this.salesProductsGet = this.dataSaleProduct;
      this.mountListProductsSales();
    },
    mountListProductsSales() {
      for (let item of this.salesProductsGet) {
            console.log("chamou: ", item);
      }

      console.log("vendas: ", this.salesProductsGet);
    },

    handleProductForSale() {
      for (let item of this.products) {
        console.log("item: ", item);
        if (item._id === this.productSeler.id) {
          this.productSel = {
            id: item._id,
            name: item.name,
            price: item.price,
          };
        }
      }
      console.log("mudado: ", this.productSel);
      this.productQntdDialog = true;
    },

    addQuant() {
      this.salesProducts.push({
        id: this.productSel.id,
        name: this.productSel.name,
        price: this.productSel.price,
        qntd: this.productSeler.qntd,
      });
      console.log("ficou assim: ", this.salesProducts);
      this.productQntdDialog = false;
    },

    async hendleSubmit() {
      if (this.salesProducts != []) {
        await this.createSaleProduct(this.salesProducts);
        if (!this.error) {
          await this.initialize();
          this.dialog = false;
          this.msg = "Venda efetuada com sucesso!";
          this.snackbar = true;
        } else {
          await this.initialize();
          this.dialog = false;
          this.msg = "Erro ao efetuar a venda";
          this.snackbar = true;
        }
        this.salesProducts = [];
        return;
      }
    },

    async deleteItem(item) {
      await this.deleteUser(item._id);
      if (!this.error) await this.initialize();
      this.msg = "Usuário detelado!";
      this.snackbar = true;
    },

    editItem(item) {
      this.editedIndex = this.sales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEdit = true;
    },

    close() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.sales[this.editedIndex], this.editedItem);
      } else {
        this.sales.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
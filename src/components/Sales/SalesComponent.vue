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

    <v-tabs horizontal @change="changeFocus(e)">
      <v-tab left aria-selected="productsTrue">
        <v-icon left>{{ icons.icon }}</v-icon
        >Ultimas Vendas de Produtos
      </v-tab>
      <!-- Produtos -->
      <v-tab-item>
        <v-card flat>
          <v-data-table
            :headers="headersProducts"
            :items="salesProducts"
            sort-by="name"
            class="elevation-4"
          >
            <template v-slot:top>
              <v-dialog v-model="dialogEdit" max-width="70%">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
                  </v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" color="primary" text @click="save" dark>
                      Salvar
                      <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>

                    <v-btn class="ma-2" color="red" text @click="close" dark>
                      Cancelar
                      <v-icon dark right>mdi-cancel</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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

      <!-- Services -->

      <v-tab left :aria-selected="changeFocus(e)">
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
              <v-dialog v-model="dialogEdit" max-width="70%">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
                  </v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2" color="primary" text @click="save" dark>
                      Salvar
                      <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>

                    <v-btn class="ma-2" color="red" text @click="close" dark>
                      Cancelar
                      <v-icon dark right>mdi-cancel</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
                        :v-model="productSeler"
                        label="Selecione o Produto"
                        :items="products"
                        item-text="name"
                        item-value="_id"
                        :isLoading="loading"
                        @change="changeFocus(e)"
                      ></v-autocomplete>
                    </v-col>

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
                            <tr v-for="item in productSeler" :key="item">
                              <td>{{ item.name }}</td>
                              <td>{{ item.price }}</td>
                              <td>{{ item.Qntd }}</td>
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
    productsTrue: false,
    servicesTrue: false,
    formTitle: "Editar Usuário",
    snackbar: false,
    search: "",
    msg: "",
    productList: [],
    productSeler: [],
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
      { text: "Produto", value: "productName" },
      { text: "Preço", value: "productPrice" },
      { text: "Quantidade", value: "productQuant" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    headersServices: [
      { text: "Serviço", value: "serviceName" },
      { text: "Preço", value: "servicePrice" },
      { text: "Quantidade", value: "serviceQuant" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    products: [],
    services: [],
    defaultItem: {},
    editedItem: {},
    editedIndex: -1,
    newSaler: [],
    seler: [],
    icons: {
      icon: mdiCartOutline,
      iconAdd: mdiCartPlus,
    },
  }),

  computed: {
    ...mapGetters({
      error: "sales/getError",
      errorProduct: "products/getError",
      dataproducts: "products/getProducts",
      datapaleProduct: "sales/getSalesProducts",
      dataSaleService: "sales/getSalesServices",
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
      getProducts: "products/getProducts",
      getSalesProducts: "sales/getSalesProducts",
      getSalesServices: "sales/getProducts",
      createSaleProduct: "sales/createSaleProduct",
      createSaleService: "sales/createSaleService",
      deleteSaleProduct: "sales/deleteSaleProduct",
      deleteSaleService: "sales/deleteSaleService",
    }),
    async initialize() {
      await this.getProducts({
        page: 1,
        noLimit: true,
      });
      this.products = this.dataProducts;
      console.log("datatable: ", this.dataProducts);
    },

    changeFocus(e) {
      console.log("evento: " , e)
    },

    async hendleSubmit(props) {
      console.log("newProduct: ", props)
      await this.createSaleProduct(this.newSaler);
      if (!this.error) {
        await this.initialize();
        this.dialog = false;
        this.msg = "Venda efetuada com sucesso!";
        this.snackbar = true;
      } else {
        await this.initialize();
        this.dialog = false;
        this.msg = "Venda já cadastrado!";
        this.snackbar = true;
      }
    },

    async deleteItem(item) {
      await this.deleteSaler(item._id);
      if (!this.error) await this.initialize();
      this.msg = "Venda detelada!";
      this.snackbar = true;
    },

    editItem(item) {
      this.editedIndex = this.sales.indexOf(item);
      console.log("Index: ", this.editedIndex)
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
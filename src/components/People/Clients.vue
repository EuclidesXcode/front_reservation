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
                    <v-text-field v-model="editedItem.status" label="Estoque"></v-text-field>
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
      Clientes
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte seus clientes por nome, cpf, cnpj..."
      ></v-text-field>
    </v-card-title>

      <v-tabs horizontal>
        <v-tab left>
          <v-icon left>mdi-account</v-icon>Pessoa Fisica
        </v-tab>
        <v-tab left>
          <v-icon left>mdi-account-tie</v-icon>Pessoa Jurídica
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-data-table :headers="headersPf" :items="physicPerson" sort-by="status" class="elevation-1">
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-data-table :headers="headersPj" :items="legalPerson" sort-by="status" class="elevation-1">
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
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
            <span class="headline">Novo Cliente</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
                <v-tabs horiontal>
                  <v-tab left>
                    <v-icon left>mdi-account</v-icon>Pessoa Fisica
                  </v-tab>
                  <v-tab left>
                    <v-icon left>mdi-account-tie</v-icon>Pessoa Jurídica
                  </v-tab>

                  <v-tab-item>
                    <v-card flat>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-text-field v-model="name" label="Nome completo *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="cpf" label="CPF *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="address" label="Endereço *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="complement" label="Complemento"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="city" label="Cidade *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="phone" label="Telefone"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-text-field v-model="name" label="Nome Fantasia *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="cnpj" label="CNPJ *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-select :items="ie" label="Grupo"></v-select>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
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
import { mdiCardAccountDetails } from "@mdi/js";
import { mdiAccountPlus } from "@mdi/js";

export default {
  data: () => ({
    dialog: false,
    headersPf: [
      { text: "Nome", value: "name" },
      { text: "CPF", value: "cpf" },
      { text: "Endereço", value: "address" },
      { text: "Complemento", value: "complement" },
      { text: "Cidade", value: "city" },
      { text: "Telefone", value: "phone" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    headersPj: [
      { text: "Nome", value: "name" },
      { text: "CNPJ", value: "cnpj" },
      { text: "Telefone", value: "phone" },
      { text: "Endereço", value: "address" },
      { text: "Complemento", value: "complement" },
      { text: "Cidade", value: "city" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    icons: {
      icon: mdiCardAccountDetails,
      iconAdd: mdiAccountPlus
    },
    physicPerson: [],
    legalPerson: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      cpf: "",
      address: "",
      complement: "",
      city: "",
      phone: ""
    },
    defaultItem: {
      name: "",
      cpf: "",
      address: "",
      complement: "",
      city: "",
      phone: ""
    }
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
      this.physicPerson = [
        {
          name: "Clodoaldo Maranhão",
          cpf: "524.165.157-99",
          address: "Rua Pamonha Fria N 10",
          complement: "Apto 10 bloco 2",
          city: "Rio de Janeiro",
          phone: "21 98897-1876"
        },
        {
          name: "Marginal Pinheiros da Silva",
          cpf: "524.365.277-55",
          address: "Rua Pereira Marcos Farias N 1110",
          complement: "Lote 2 Quadra 10",
          city: "Duque de Caxias",
          phone: "21 98577-2276"
        },
        {
          name: "Getulho Vargas Junior",
          cpf: "524.368.997-19",
          address: "Rua Mauricio Meireles N 99",
          complement: "Sobrado",
          city: "São João de Meriti",
          phone: "21 98558-9685"
        },
        {
          name: "Paulinho Gó Gó",
          cpf: "774.165.133-11",
          address: "Rua America",
          complement: "Casa 2b",
          city: "Magé",
          phone: "21 96584-3625"
        },
      ];
      this.legalPerson = [
        {
          name: "Carrefuor Raposo Tavares LTDA",
          cnpj: "35.156.354/0001-23",
          phone: "11 3652-3625",
          address: "Rua Pamonha Fria N 10",
          complement: "Apto 10 bloco 2",
          city: "Rio de Janeiro",
        },
        {
          name: "Pepisico Comercio de Alimentos LTDA",
          cnpj: "17.156.222/0001-88",
          phone: "11 4004-3562",
          address: "Rua Mauricio Meireles N 99",
          complement: "Sobrado",
          city: "São João de Meriti",
        },
        {
          name: "Ortobom Colchões LTDA ME",
          cnpj: "35.156.354/0001-99",
          phone: "11 98658-5865",
          address: "Rua Guarani N 99",
          complement: "Sobrado",
          city: "Magé",
        },
        {
          name: "Padaria Deus é Contigo LTDA ME",
          cnpj: "35.156.354/0001-23",
          phone: "11 4004-5847",
          address: "Rua General Rondon N 99",
          complement: "Sobrado",
          city: "Duque de Caxias",
        },
        {
          name: "Enel LTDA",
          cnpj: "25.396.154/0001-55",
          phone: "0800 2515-251",
          address: "Av Algusto Sebastião N 1409",
          complement: "Apto 22",
          city: "Petrópolis",
        },
      ];
    },

    getColor(status) {
      if (status === "Folga") return "orange";
      else if (status === "Serviço") return "green";
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
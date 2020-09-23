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
      <v-icon id="titleIcon">{{ icons.iconUserAccount }}</v-icon>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte seus clientes por nome, cpf, nome do bebê..."
      ></v-text-field>
    </v-card-title>

      <v-tabs horizontal>
        <v-tab left>
          <v-icon left>{{ icons.icon }}</v-icon>Dados do Cliente
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
                    <v-icon left>{{ icons.iconAdd }}</v-icon>Cadastrar novo Cliente
                  </v-tab>

                  <v-tab-item>
                    <v-card flat>
                      <v-row>
                        <v-col cols="12" md="3">
                          <v-text-field v-model="codNumber" label="Numero do Cadastro "></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="name" label="Nome do Resposável *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="babyName" label="Nome do Bebê *"></v-text-field>
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
                          <v-text-field v-model="cep" label="CEP *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="bairro" label="Bairro"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="city" label="Cidade *"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="celPhone" label="Celular"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="phone" label="Telefone"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                          <v-text-field v-model="email" label="E-mail"></v-text-field>
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
import { mdiAccountGroup } from "@mdi/js";
import { mdiAccountPlus } from "@mdi/js";

export default {
  data: () => ({
    dialog: false,
    headersPf: [
      { text: "Nome", value: "name" },
      { text: "Bebê", value: "babyName" },
      { text: "CPF", value: "cpf" },
      { text: "Cidade", value: "city" },
      { text: "Telefone", value: "phone" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    icons: {
      icon: mdiCardAccountDetails,
      iconAdd: mdiAccountPlus,
      iconUserAccount: mdiAccountGroup
    },
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
          babyName: "Marcos Alberto",
          cpf: "524.165.157-99",
          city: "Rio de Janeiro",
          phone: "21 98897-1876"
        },
        {
          name: "Marginal Pinheiros da Silva",
          babyName: "Amélia Flor",
          cpf: "524.365.277-55",
          city: "Duque de Caxias",
          phone: "21 98577-2276"
        },
        {
          name: "Getulho Vargas Junior",
          babyName: "Abelardo Junior",
          cpf: "524.368.997-19",
          city: "São João de Meriti",
          phone: "21 98558-9685"
        },
        {
          name: "Paulinho Gó Gó",
          babyName: "Paulinho Junior",
          cpf: "774.165.133-11",
          city: "Magé",
          phone: "21 96584-3625"
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
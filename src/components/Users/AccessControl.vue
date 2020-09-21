<template>
  <v-card>
    <v-card-title>
      Perfis de Usuário
      <v-icon id="titleIcon">{{ icons.icon }}</v-icon>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Consulte os perfis por nome..."
      ></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="provider" sort-by="quant" class="elevation-1">
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
            <span class="headline">Novo Perfil</span>
            <v-icon id="titleIcon">{{ icons.iconAdd }}</v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols md="12">
                  <v-text-field v-model="name" label="Nome do Perfil *"></v-text-field>
                </v-col>

                <v-col cols md="12">
                  <h4>Funcionalidades do Perfil</h4>
                  <v-row>
                    <v-col cols="6" md="6">
                      <v-treeview selectable selected-color="blue" :items="items1"></v-treeview>
                    </v-col>

                    <v-col cols="6" md="6">
                      <v-treeview selectable selected-color="blue" :items="items2"></v-treeview>
                    </v-col>
                  </v-row>
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
  z-index: 2;
  margin-top: -40px;
  margin-left: 20px;
  float: left;
}
</style>

<script>
import { mdiAccountKey } from "@mdi/js";
import { mdiAccountPlus } from "@mdi/js";

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Perfil", value: "profile" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    items1: [
      {
        id: 1,
        name: "Retaguarda",
        children: [
          { id: 1, name: "Produtos", children: [
              {
                  id: 1,
                  name: 'Visualizar Produtos'
              },
              {
                  id: 2,
                  name: 'Editar Produtos'
              },
              {
                  id: 3,
                  name: 'Criar Produtos'
              },
              {
                  id: 4,
                  name: 'Deletar Produtos'
              }
          ] },
          { id: 5, name: "Pessoas", children: [
              {
                  id: 1,
                  name: 'Visualizar Pessoas',
                  children: [
                      {
                          id: 1,
                          name: 'Fornecedores'
                      },
                      {
                          id: 2,
                          name: 'Colaboradores'
                      },
                      {
                          id: 3,
                          name: 'Clientes'
                      }
                  ]
              },
              {
                  id: 2,
                  name: 'Editar Pessoas',
                  children: [
                      {
                          id: 1,
                          name: 'Fornecedores'
                      },
                      {
                          id: 2,
                          name: 'Colaboradores'
                      },
                      {
                          id: 3,
                          name: 'Clientes'
                      }
                  ]
              },
              {
                  id: 3,
                  name: 'Criar Pessoas',
                  children: [
                      {
                          id: 1,
                          name: 'Fornecedores'
                      },
                      {
                          id: 2,
                          name: 'Colaboradores'
                      },
                      {
                          id: 3,
                          name: 'Clientes'
                      }
                  ]
              },
              {
                  id: 4,
                  name: 'Deletar Pessoas',
                  children: [
                      {
                          id: 1,
                          name: 'Fornecedores'
                      },
                      {
                          id: 2,
                          name: 'Colaboradores'
                      },
                      {
                          id: 3,
                          name: 'Clientes'
                      }
                  ]
              }
          ] },
          { id: 3, name: "Vendas", children: [
              {
                  id: 1,
                  name: 'Visualizar Vendas'
              },
              {
                  id: 2,
                  name: 'Editar Vendas'
              },
              {
                  id: 3,
                  name: 'Criar Vendas'
              },
              {
                  id: 4,
                  name: 'Deletar Vendas'
              }
          ] },
          { id: 4, name: "Financeiro", children: [
              {
                  id: 1,
                  name: 'Visualizar Contas',
                  children: [
                      {
                          id: 1,
                          name: 'Pagar'
                      },
                      {
                          id: 2,
                          name: 'Receber'
                      },
                      {
                          id: 3,
                          name: 'Notas e/ou Boletos'
                      }
                  ]
              },
              {
                  id: 2,
                  name: 'Editar Contas',
                  children: [
                      {
                          id: 1,
                          name: 'Pagar'
                      },
                      {
                          id: 2,
                          name: 'Receber'
                      },
                      {
                          id: 3,
                          name: 'Notas e/ou Boletos'
                      }
                  ]
              },
              {
                  id: 3,
                  name: 'Criar Contas',
                  children: [
                      {
                          id: 1,
                          name: 'Pagar'
                      },
                      {
                          id: 2,
                          name: 'Receber'
                      },
                      {
                          id: 3,
                          name: 'Notas e/ou Boletos'
                      }
                  ]
              },
              {
                  id: 4,
                  name: 'Deletar Contas',
                  children: [
                      {
                          id: 1,
                          name: 'Pagar'
                      },
                      {
                          id: 2,
                          name: 'Receber'
                      },
                      {
                          id: 3,
                          name: 'Notas e/ou Boletos'
                      }
                  ]
              }
          ] },
          { id: 5, name: "Relatórios", children: [
              {
                  id: 1,
                  name: 'Visualizar Relatórios'
              },
              {
                  id: 3,
                  name: 'Criar Relatórios'
              },
              {
                  id: 4,
                  name: 'Deletar Relatórios'
              }
          ] },
          { id: 6, name: "Usuários", children: [
              {
                  id: 1,
                  name: 'Visualizar Usuários'
              },
              {
                  id: 2,
                  name: 'Editar Usuários'
              },
              {
                  id: 3,
                  name: 'Criar Usuários'
              },
              {
                  id: 4,
                  name: 'Deletar Usuários'
              }
          ] },
          { id: 7, name: "Área Administrativa" },
          { id: 8, name: "Configurações" }
        ]
      }
    ],
    items2: [
      {
        id: 1,
        name: "PDV",
        children: [
          { id: 1, name: "" },
        ]
      }
    ],
    icons: {
      icon: mdiAccountKey,
      iconAdd: mdiAccountPlus
    },
    provider: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      cpf: "",
      profile: "",
      password: ""
    },
    defaultItem: {
      name: "",
      cpf: "",
      profile: "",
      password: ""
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
      this.provider = [
        {
          profile: "Gerente Adm"
        },
        {
          profile: "Operadora de Caixa"
        },
        {
          profile: "Fiscal de Loja"
        },
        {
          profile: "Gerente"
        },
        {
          profile: "Financeiro"
        }
      ];
    },

    getColor(quant) {
      if (quant < 10) return "red";
      else if (quant < 20) return "orange";
      else return "green";
    },

    editItem(item) {
      this.editedIndex = this.provider.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.provider.indexOf(item);
      confirm("Certeza que deseja deletar o Fornecedor?") &&
        this.provider.splice(index, 1);
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
        Object.assign(this.provider[this.editedIndex], this.editedItem);
      } else {
        this.provider.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
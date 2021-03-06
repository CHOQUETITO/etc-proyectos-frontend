<template>
  <div>
    <h2 class="teal darken-4 text-center white--text">Gestión de Poas</h2>
    <crud-table
      :headers="headers"
      :url="url"
      :filters="filters"
      :widthModal="500"
      :order="order"
      :custom="true"
      >
      <template slot="buttons">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
              @click.native.stop="openModal"
              slot="activator"
            ><v-icon dark>description</v-icon> Agregar </v-btn>
          </template>
            <span> Agregar Poa </span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA EL FORMULARIO -->
      <template slot="form" slot-scope="">
        <v-card-title class="teal darken-4 white--text">
          <v-container fluid>
            <v-row no-gutters>
              <v-col
                align="start"
                justify="center"
                :cols="11">
                <v-icon color="white">{{ form.id ? 'folder_open' : 'folder_open' }}</v-icon>
                {{ form.id ? 'Editar Poa' : 'Adicionar Poa' }}
              </v-col>
              <v-col :cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="gray" v-on="on" @click.stop="closeModal">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </template>
                  <span>Cerrar ventana</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <!-- FORMULARIO PARA AGREGAR O EDITAR -->
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="save"
          >
          <v-card>
            <v-container fluid>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  :md="12"
                  :xs="12"
                  :sm="12"
                  >
                  <v-text-field
                    dense
                    color="success"
                    clearable
                    required
                    :rules="rules.nombre"
                    v-model="form.nombre"
                    prepend-icon="folder_open"
                    label="(*) Nombre del Poa"
                    >
                  </v-text-field>
                </v-col>
              </v-row >
              <v-row no-gutters>
                <v-col
                  cols="12"
                  :md="12"
                  :xs="12"
                  :sm="12"
                  >
                  <v-text-field
                    color="success"
                    clearable
                    required
                    dense
                    :rules="rules.descripcion"
                    v-model="form.descripcion"
                    prepend-icon="folder_open"
                    label="(*) Descripción del Poa"
                    >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  :md="12"
                  :xs="12"
                  :sm="12"
                  >
                  <v-text-field
                    color="success"
                    clearable
                    required
                    dense
                    oninput="this.value = this.value.replace(/[^0-9]/g,'');"
                    :rules="rules.gestion"
                    v-model="form.gestion"
                    prepend-icon="date_range"
                    label="(*) Gestión"
                    >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  :md="12"
                  :xs="12"
                  :sm="12"
                  >
                  <v-text-field
                    color="success"
                    clearable
                    required
                    dense
                    prefix="Bs."
                    oninput="this.value = this.value.replace(/[^0-9.]/g,'');"
                    :rules="rules.monto"
                    v-model="form.monto"
                    prepend-icon="monetization_on"
                    label="(*) Monto del Poa/Bs."
                    >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
              <v-card-actions>
                <v-container fluid>
                  <v-row>
                    <v-col
                      justify="start"
                      :xs="12"
                      :sm="12"
                      :md="5"
                      :lg="5"
                      cols="12"
                      >
                      <small class="error--text text-required">* Los campos son obligatorios</small>
                    </v-col>
                    <v-col
                      align="right"
                      :sm="12"
                      :xs="12"
                      :md="3"
                      :lg="3"
                      cols="12"
                      >
                      <v-btn block @click.stop="closeModal"><v-icon>cancel</v-icon> Cancelar </v-btn>
                    </v-col>
                    <v-col
                      align="right"
                      :sm="12"
                      :xs="12"
                      :md="4"
                      :lg="4"
                      cols="12"
                      >
                      <v-btn color="primary" type="submit" :disabled="!valid">
                        <v-icon dark>check</v-icon> ENVIAR
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
          </v-card>
        </v-form>
      </template>
      <!-- SLOT PARA LAS ACCIONES DEL CRUD TABLE  -->
      <template slot="actions" slot-scope="item">
        <v-tooltip bottom color="success">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="openModal(item)">
              <v-icon color="success">edit</v-icon>
            </v-btn>
          </template>
          <span>Editar registro</span>
        </v-tooltip>
        <v-tooltip bottom color="error">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click.stop="itemDelete(Object.assign({}, item))">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </template>
          <span>Eliminar registro</span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr v-for="item in items" :key="item.id">
          <td>
            <v-tooltip bottom color="success">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.stop="openModal(Object.assign({}, items))">
                  <v-icon color="success">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar registro</span>
            </v-tooltip>
            <v-tooltip bottom color="error">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.prevent="itemDelete(Object.assign({}, items))">
                  <v-icon color="red">delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar registro</span>
            </v-tooltip>
          </td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.descripcion }}</td>
          <td>{{ item.gestion }}</td>
          <td>{{ item.monto }}</td>
          <td>
            <v-btn outlined :color="item.estado === 'ACTIVO' ? 'info' : 'default'">{{ item.estado}}</v-btn>
          </td>
        </tr>
      </template>
    </crud-table>
  </div>
</template>

<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

export default {
  mixins: [actions],
  data: () => ({
    valid: false,
    rules: {
      nombre: [
        val => (val || '').length > 0 || 'El campo del nombre no puede estar vacío'
      ],
      descripcion: [
        val => (val || '').length > 0 || 'El campo descripcion no puede estar vacío',
      ],
      gestion: [
        val => (val || '').length > 0 || 'El campo gestion no puede estar vacío',
      ],
      monto: [
        val => (val || '').length > 0 || 'El campo monto no puede estar vacío',
      ]
    },
    url: 'poas',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS', class: 'teal darken-4 white--text' },
      { text: 'Nombre', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Descripción', value: 'descripcion', class: 'teal darken-4 white--text' },
      { text: 'Gestión', value: 'gestion', class: 'teal darken-4 white--text' },
      { text: 'Monto/Bs.', value: 'monto', class: 'teal darken-4 white--text' },
      { text: 'Estado', value: 'estado', class: 'teal darken-4 white--text' }
    ],
    form: {
      id: '',
      nombre: '',
      descripcion: '',
      gestion: '',
      monto: ''
    },
    filters: [
      {
        field: 'nombre',
        label: 'Nombre del Poa',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'gestion',
        label: 'Gestión',
        type: 'text',
        typeG: 'String'
      }
    ],
    date: null
  }),
  methods: {
    reset () {
      this.form = {
        id: '',
        nombre: '',
        descripcion: '',
        gestion: '',
        monto: ''
      };
    },
    itemDelete ({ items }) {
      const message = '¿Está seguro de eliminar este registro?';
      this.$confirm(message, async () => {
        try {
          await this.$service.delete(`poas/${items.id}`);
          await this.updateList();
          this.$store.commit('closeModal');
          this.$message.success('Registro eliminado satisfactoriamente');
        } catch (err) {
          this.$message.error(err.message);
        }
      }, () => {});
    },
    closeModal () {
      this.reset();
      this.$store.commit('closeModal');
    },
    openModal ({ items }) {
      if (items && items.id) {
        this.$nextTick(() => {
          this.form = items;
        });
      } else {
        this.reset();
      }
      this.$store.commit('openModal');
    },
    /**
     * @function save
     * @description Esta funcion esta creada para guardar en la BD
     */
    async save () {
      if (this.$refs.form.validate()) {
        const data = { ...({}, this.form) };
        if (data.id) {
          const response = await this.$service.put(`poas/${data.id}`, data);
          if (response) {
            this.$store.commit('closeModal');
            await this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          const response = await this.$service.post('poas', data);
          if (response) {
            this.$store.commit('closeModal');
            await this.updateList();
            this.$message.success('El registro fue agregado correctamente');
          }
        }
      } else {
        this.$message.error('Faltan campos por llenar');
      }
    }
  },
  components: {
    CrudTable
  }
};
</script>

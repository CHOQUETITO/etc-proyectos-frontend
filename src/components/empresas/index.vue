<template>
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
          ><v-icon dark>business</v-icon> Agregar </v-btn>
        </template>
          <span> Agregar Empresa </span>
      </v-tooltip>
    </template>
    <!-- SLOT PARA EL FORMULARIO -->
    <template slot="form" slot-scope="">
      <v-card-title class="ma-0 pa-1">
        <v-container fluid>
          <v-row no-gutters>
            <v-col
              align="start"
              justify="center"
              :cols="11">
              <v-icon>{{ form.id ? 'business' : 'business' }}</v-icon>
              {{ form.id ? 'Editar Empresa' : 'Adicionar Empresa' }}
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
                  prepend-icon="business"
                  label="Nombre de la Empresa"
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
                  v-model="form.descripcion"
                  prepend-icon="business"
                  label="Descripción de la Empresa"
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
                  :rules="rules.sigla"
                  v-model="form.sigla"
                  prepend-icon="business"
                  label="Sigla de la Empresa"
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
                  :rules="rules.email"
                  v-model="form.email"
                  prepend-icon="business"
                  label="Email de la Empresa"
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
                  :rules="rules.telefono"
                  v-model="form.telefonos"
                  prepend-icon="business"
                  label="Telefono/Celular de la Empresa"
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
                  :rules="rules.direccion"
                  v-model="form.direccion"
                  prepend-icon="business"
                  label="Dirección de la Empresa"
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
                  :rules="rules.web"
                  v-model="form.web"
                  prepend-icon="business"
                  label="Pagina Web de la Empresa"
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
                  :rules="rules.nit"
                  v-model="form.nit"
                  prepend-icon="business"
                  label="Nit de la Empresa"
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
                      <v-icon dark>check</v-icon> Enviar
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
        <td>{{ item.sigla }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.telefonos }}</td>
        <td>{{ item.direccion }}</td>
        <td>{{ item.web }}</td>
        <td>{{ item.nit }}</td>
        <td>
          <v-btn outlined :color="item.estado === 'ACTIVO' ? 'info' : 'default'">{{ item.estado}}</v-btn>
        </td>
      </tr>
    </template>
  </crud-table>
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
        val => (val || '').length > 0 || 'El campo nombre de la empresa no puede estar vacío'
      ],
      sigla: [
        val => (val || '').length > 0 || 'El campo sigla no puede estar vacío'
      ],
      email: [
        val => (val || '').length > 0 || 'El campo email no puede estar vacío',
        val => /\S+@\S+\.\S+/.test(val)
      ],
      telefono: [
        val => (val || '').length > 0 || 'El campo teléfono no puede estar vacío'
      ],
      direccion: [
        val => (val || '').length > 0 || 'El campo direccion no puede estar vacío'
      ],
      web: [
        val => (val || '').length > 0 || 'El campo web no puede estar vacío',
        val => /www\.+\S+\.\S+/.test(val) || 'El campo email no es válido'
      ],
      nit: [
        val => (val || '').length > 0 || 'El campo nit no puede estar vacío'
      ]
    },
    url: 'empresas',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS' },
      { text: 'Nombre', value: 'nombre' },
      { text: 'Sigla', value: 'sigla' },
      { text: 'Email', value: 'email' },
      { text: 'Telefono', value: 'telefonos' },
      { text: 'Dirección', value: 'direccion' },
      { text: 'Web', value: 'web' },
      { text: 'nit', value: 'nit' },
      { text: 'Estado', value: 'estado' }
    ],
    form: {
      id: '',
      nombre: '',
      descripcion: '',
      sigla: '',
      email: '',
      telefonos: '',
      direccion: '',
      web: '',
      nit: ''
    },
    filters: [
      {
        field: 'nombre',
        label: 'Nombre de la Empresa',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'telefonos',
        label: 'Telefono/Celular',
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
        sigla: '',
        email: '',
        telefonos: '',
        direccion: '',
        web: '',
        nit: ''
      };
    },
    itemDelete ({ items }) {
      const message = '¿Está seguro de eliminar este registro?';
      this.$confirm(message, async () => {
        try {
          await this.$service.delete(`empresas/${items.id}`);
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
          const response = await this.$service.put(`empresas/${data.id}`, data);
          if (response) {
            this.$store.commit('closeModal');
            await this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          const response = await this.$service.post('empresas', data);
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

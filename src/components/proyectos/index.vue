<template>
  <div>
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
            ><v-icon dark>assignment</v-icon> Agregar </v-btn>
          </template>
            <span> Agregar Proyecto </span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA EL FORMULARIO -->
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
        <v-tooltip bottom color="error">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click.stop="VerCronogramas(Object.assign({}, item))">
              <v-icon color="red">edit</v-icon>
            </v-btn>
          </template>
          <span>Ver Seguimientos</span>
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
          <td>{{ item.comunidad.nombre }}</td>
          <td>{{ item.poa.nombre }}</td>
          <td>{{ item.empresa.nombre }}</td>
          <td>{{ item.categoria.nombre }}</td>
          <td>{{ item.fechaInicio }}</td>
          <td>{{ item.fechaFinal }}</td>
          <td>
            <v-btn outlined :color="item.estado === 'ACTIVO' ? 'info' : 'default'">{{ item.estado}}</v-btn>
          </td>
        </tr>
      </template>
    </crud-table>
    <v-dialog
      persistent
      v-model="abrirDialogo"
      width="800"
      >
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
                  v-model="form.nombre"
                  prepend-icon="assignment"
                  label="Nombre del Proyecto"
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
                  prepend-icon="assignment"
                  label="Descripción del Proyecto"
                  >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="6"
                :md="12"
                :xs="12"
                :sm="12"
                >
                <v-select
                  color="success"
                  clearable
                  required
                  dense
                  v-model="form.idComunidad"
                  item-text="nombre"
                  item-value="id"
                  :items="listaComunidades"
                  prepend-icon="assignment"
                  label="Comunidad donde se ejecuta el Proyecto"
                  >
                </v-select>
              </v-col>
              <v-col
                cols="6"
                :md="12"
                :xs="12"
                :sm="12"
                >
                <v-select
                  color="success"
                  clearable
                  required
                  dense
                  v-model="form.idPoa"
                  item-text="nombre"
                  item-value="id"
                  :items="listaPoas"
                  prepend-icon="assignment"
                  label="Poa del Proyecto"
                  >
                </v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                :md="12"
                :xs="12"
                :sm="12"
                >
                <v-select
                  color="success"
                  clearable
                  required
                  dense
                  v-model="form.idEmpresa"
                  item-text="nombre"
                  item-value="id"
                  :items="listaEmpresas"
                  prepend-icon="assignment"
                  label="Empresa que ejecuta el Proyecto"
                  >
                </v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                :md="12"
                :xs="12"
                :sm="12"
                >
                <v-select
                  color="success"
                  clearable
                  required
                  dense
                  v-model="form.idCategoria"
                  item-text="nombre"
                  item-value="id"
                  :items="listaCategorias"
                  prepend-icon="assignment"
                  label="Categoria del Proyecto"
                  >
                </v-select>
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
                  v-model="form.fechaInicio"
                  prepend-icon="assignment"
                  label="Fecha de Inicio del Proyecto"
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
                  v-model="form.fechaFinal"
                  prepend-icon="assignment"
                  label="Fecha de culminación del Proyecto"
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
                  <v-btn @click.stop="closeModal"><v-icon>cancel</v-icon> Cancelar </v-btn>
                  <v-btn color="primary" type="submit" :disabled="!valid">
                  <v-icon dark>check</v-icon> Enviar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

export default {
  mixins: [actions],
  data: () => ({
    valid: false,
    listaComunidades: [],
    listaEmpresas: [],
    listaPoas: [],
    listaCategorias: [],
    abrirDialogo: false,
    rules: {
      nombre: [
        val => (val || '').length > 0 || 'El campo del nombre no puede estar vacío'
      ],
      descripcion: [
        val => (val || '').length > 0 || 'El campo usuario no puede estar vacío',
        val => (val || '').length > 5 || 'El campo usuario no puede tener menos de 10 caracteres'
      ],
      primerApellido: [
        val => (val || '').length > 0 || 'El campo del primer apellido no puede estar vacío',
      ],
      segundoApellido: [
        val => (val || '').length > 0 || 'El campo del segundo apellido no puede estar vacío',
      ],
      fechaNacimiento: [
        val => (val || '').length > 0 || 'El campo de la fecha de nacimiento no puede estar vacío',
      ],
      email: [
        val => (val || '').length > 0 || 'El campo email no puede estar vacío',
        val => /\S+@\S+\.\S+/.test(val) || 'El campo email no es válido'
      ]
    },
    url: 'proyectos',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS' },
      { text: 'Nombre', value: 'nombre' },
      { text: 'Comunidad', value: 'comunidad' },
      { text: 'Poa', value: 'poa' },
      { text: 'Empresa', value: 'empresa' },
      { text: 'Categoria', value: 'categoria' },
      { text: 'Fecha Inicio', value: 'fechaInicio' },
      { text: 'Fecha Final', value: 'fechaFinal' },
      { text: 'Estado', value: 'estado' }
    ],
    form: {
      id: '',
      nombre: '',
      descripcion: '',
      idComunidad: '',
      idPoa: '',
      idEmpresa: '',
      idCategoria: '',
      idCronograma: '',
      fechaInicio: '',
      fechaFinal: ''

    },
    filters: [
      {
        field: 'nombre',
        label: 'Nombre del Proyecto',
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
        idComunidad: '',
        idPoa: '',
        idEmpresa: '',
        idCategoria: '',
        idCronograma: '',
        fechaInicio: '',
        fechaFinal: ''
      };
    },
    verCronogramas() {
      console.log('Cronogra en desarrollo');
    },
    itemDelete ({ items }) {
      const message = '¿Está seguro de eliminar este registro?';
      this.$confirm(message, async () => {
        try {
          await this.$service.delete(`proyectos/${items.id}`);
          this.updateList();
          this.$message.success('Registro eliminado satisfactoriamente');
        } catch (err) {
          this.$message.error(err.message);
        }
      }, () => {});
    },
    closeModal () {
      this.abrirDialogo = false;
      this.reset();
    },
    async openModal ({ items }) {
      console.log('items---------->', items);
      if (items && items.id) {
        this.$nextTick(() => {
          this.form = items;
        });
      } else {
        this.reset();
      }
      this.abrirDialogo = true;
      const respuestaComunidades = await this.$service.get('comunidades');
      this.listaComunidades = respuestaComunidades.rows;
      const respuestaEmpresas = await this.$service.get('empresas');
      this.listaEmpresas = respuestaEmpresas.rows;
      const respuestaPoas = await this.$service.get('poas');
      this.listaPoas = respuestaPoas.rows;
      const respuestaCategorias = await this.$service.get('categorias');
      this.listaCategorias = respuestaCategorias.rows;
      console.log('---->', this.abrirDialogo);
    },
    /**
     * @function save
     * @description Esta funcion esta creada para guardar en la BD
     * @author dbarra@agetic.gob.bo
     */
    async save () {
      if (this.$refs.form.validate()) {
        const data = { ...({}, this.form) };
        console.log('------>', data);
        delete data.id_comunidad;
        delete data.id_empresa;
        delete data.id_poa;
        delete data.id_categoria;
        if (data.id) {
          const response = await this.$service.put(`proyectos/${data.id}`, data);
          if (response) {
            this.abrirDialogo = false;
            this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          const response = await this.$service.post('proyectos', data);
          console.log('response', response);
          if (response) {
            this.abrirDialogo = false;
            this.updateList();
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

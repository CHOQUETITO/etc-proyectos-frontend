<template>
  <div>
  <h2 class="teal darken-4 text-center white--text">Cronograma de Actividades</h2>
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
            ><v-icon dark>calendar_today</v-icon> Agregar </v-btn>
          </template>
            <span> Agregar Cronograma </span>
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
                <v-icon color="white">{{ form.id ? 'calendar_today' : 'calendar_today' }}</v-icon>
                {{ form.id ? 'Editar Cronograma' : 'Adicionar Cronograma' }}
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
                  <v-select
                    color="success"
                    clearable
                    required
                    dense
                    :rules="rules.nombreProyecto"
                    v-model="form.idProyecto"
                    item-text="nombre"
                    item-value="id"
                    :items="listaProyectos"
                    prepend-icon="assignment"
                    label="Nombre del Proyecto"
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
                    dense
                    color="success"
                    clearable
                    required
                    :rules="rules.nombre"
                    v-model="form.nombre"
                    prepend-icon="calendar_today"
                    label="Nombre del Cronograma"
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
                    :rules="rules.actividad"
                    v-model="form.actividad"
                    prepend-icon="calendar_today"
                    label="Actividad del Cronograma"
                    >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="6"
                  >
                  <v-menu
                    v-model="date"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    locale="es-EN"
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="seccess"
                        dense
                        :rules="rules.fecIniCronograma"
                        v-model="form.fecIniCronograma"
                        label="Fecha Inicio de la Actividad"
                        prepend-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.fecIniCronograma"
                      @input="date = false"
                      :first-day-of-week="0"
                      locale="es-EN"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="6"
                  >
                  <v-menu
                    v-model="dateFinal"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    locale="es-EN"
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        color="success"
                        dense
                        :rules="rules.fecFinCronograma"
                        v-model="form.fecFinCronograma"
                        label="Fecha Final de la Actividad"
                        prepend-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.fecFinCronograma"
                      @input="dateFinal = false"
                      :first-day-of-week="0"
                      locale="es-EN"
                    ></v-date-picker>
                  </v-menu>
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
                    prepend-icon="account_circle"
                    v-model="form.estadoActividad"
                    :rules="rules.estadoActividad"
                    :items="estadoActividad"
                    label="Estado de la Actividad"
                  ></v-select>
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
                    :rules="rules.observacion"
                    v-model="form.observacion"
                    prepend-icon="calendar_today"
                    label="Observaciones"
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
          <td>{{ item.proyecto.nombre }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.actividad }}</td>
          <td>{{ item.fecIniCronograma }}</td>
          <td>{{ item.fecFinCronograma }}</td>
          <td>
            <v-btn outlined :color="item.estadoActividad === 'PENDIENTE' ? 'error' : 'success'">{{ item.estadoActividad}}</v-btn>
          </td>
          <td>{{ item.observacion }}</td>
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
    date: null,
    dateFinal: null,
    listaProyectos: [],
    estadoActividad: ['PENDIENTE', 'DESARROLLO', 'CONCLUIDO'],
    rules: {
      nombre: [
        val => (val || '').length > 0 || 'El campo Nombre no puede estar vacío'
      ],
      actividad: [
        val => (val || '').length > 0 || 'El campo Actividad no puede estar vacío',
      ],
      fechaInicio: [
        val => (val || '').length > 0 || 'El campo Fecha Inicio no puede estar vacío',
      ],
      fechaFinal: [
        val => (val || '').length > 0 || 'El campo Fecha Fin no puede estar vacío',
      ]
    },
    url: 'cronogramas',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS', class: 'teal darken-4 white--text' },
      { text: 'Proyecto', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Nombre', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Actividad', value: 'actividad', class: 'teal darken-4 white--text' },
      { text: 'Fecha Inicio', value: 'fecIniCronograma', class: 'teal darken-4 white--text' },
      { text: 'Fecha Final', value: 'fecFinCronograma', class: 'teal darken-4 white--text' },
      { text: 'Estado de Actividad', value: 'estadoActividad', class: 'teal darken-4 white--text' },
      { text: 'Observación', value: 'observacion', class: 'teal darken-4 white--text' },
      { text: 'Estado', value: 'estado', class: 'teal darken-4 white--text' }
    ],
    form: {
      id: '',
      idProyecto: '',
      nombre: '',
      actividad: '',
      fecIniCronograma: '',
      fecFinCronograma: '',
      estadoActividad: '',
      observacion: ''
    },
    filters: [
      {
        field: 'nombre',
        label: 'Nombre del Cronograma',
        type: 'text',
        typeG: 'String'
      }
    ],
  }),
  methods: {
    reset () {
      this.form = {
        id: '',
        idProyecto: '',
        nombre: '',
        fecIniCronograma: '',
        fecFinCronograma: '',
        estadoActividad: '',
        observacion: '',
        estado: 'ACTIVO',
      };
    },
    itemDelete ({ items }) {
      const message = '¿Está seguro de eliminar este registro?';
      this.$confirm(message, async () => {
        try {
          await this.$service.delete(`cronogramas/${items.id}`);
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
    async openModal ({ items }) {
      if (items && items.id) {
        this.$nextTick(() => {
          this.form = items;
        });
      } else {
        this.reset();
      }
      const respuestaProyectos = await this.$service.get('proyectos');
      this.listaProyectos = respuestaProyectos.rows;
      this.$store.commit('openModal');
    },
    /**
     * @function save
     * @description Esta funcion esta creada para guardar en la BD
     */
    async save () {
      if (this.$refs.form.validate()) {
        const data = { ...({}, this.form) };
        console.log('------>', data);
        if (data.id) {
          const response = await this.$service.put(`cronogramas/${data.id}`, data);
          if (response) {
            this.$store.commit('closeModal');
            await this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          const response = await this.$service.post('cronogramas', data);
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

<template>
  <div>
    <h2 class="teal darken-4 text-center white--text">Administración de Usuarios</h2>
    <crud-table
      :headers="headers"
      :url="url"
      :widthModal="800"
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
            ><v-icon dark>person_add</v-icon> Agregar </v-btn>
          </template>
          <span> Agregar usuario </span>
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
                <v-icon color="white">{{ formUsuario.id ? 'person' : 'person_add' }}</v-icon>
                {{ formUsuario.id ? 'Editar usuario' : 'Adicionar usuario' }}
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
                    :rules="rulesPersona.nombres"
                    v-model="formUsuario.persona.nombres"
                    prepend-icon="account_circle"
                    label="Nombres"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                >
                  <v-text-field
                    color="success"
                    clearable
                    required
                    dense
                    :rules="rulesPersona.primer_apellido"
                    v-model="formUsuario.persona.primer_apellido"
                    prepend-icon="account_circle"
                    label="Apellido Paterno"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                >
                  <v-text-field
                    color="success"
                    label="Apellido Materno"
                    required
                    dense
                    v-model="formUsuario.persona.segundo_apellido"
                    prepend-icon="account_circle"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                  >
                  <v-text-field
                    color="success"
                    clearable
                    required
                    dense
                    :rules="rulesPersona.nro_documento"
                    v-model="formUsuario.persona.nro_documento"
                    prepend-icon="account_circle"
                    label="Cedula de Identidad"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                  >
                  <v-select
                    color="success"
                    clearable
                    required
                    dense
                    prepend-icon="account_circle"
                    v-model="formUsuario.persona.documento_expedido"
                    :rules="rulesPersona.documento_expedido"
                    :items="expedido"
                    label="Expedido"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
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
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        dense
                        v-model="formUsuario.persona.fecha_nacimiento"
                        label="Fecha de nacimiento"
                        prepend-icon="event"
                        readonly
                        :rules="rulesPersona.fecha_nacimiento"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="formUsuario.persona.fecha_nacimiento"
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
                  :sm="12"
                  >
                  <v-select
                    color="success"
                    clearable
                    required
                    dense
                    prepend-icon="account_circle"
                    v-model="formUsuario.persona.genero"
                    :rules="rulesPersona.genero"
                    :items="genero"
                    label="Género"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                >
                  <v-text-field
                    color="primary"
                    label="Teléfono"
                    dense
                    v-model="formUsuario.persona.telefono"
                    :rules="rulesPersona.telefono"
                    prepend-icon="contact_phone"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                >
                  <v-text-field
                    color="primary"
                    required
                    dense
                    label="Correo electrónico"
                    v-model="formUsuario.email"
                    :rules="rules.email"
                    prepend-icon="contact_mail"
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
              <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                  >
                  <v-select
                    color="success"
                    clearable
                    required
                    dense
                    prepend-icon="account_circle"
                    v-model="formUsuario.idRol"
                    :items="listaRoles"
                    :rules="rulesPersona.rol"
                    item-text="nombre"
                    item-value="id"
                    label="Rol en el Sistema"
                  ></v-select>
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
                    cols="12">
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
          <td>{{ item.usuario }}</td>
          <td>{{ item.persona.nombres }}</td>
          <td>{{ item.persona.primer_apellido }}</td>
          <td>{{ item.persona.segundo_apellido }}</td>
          <td>{{ $datetime.format(item.persona.fecha_nacimiento, 'dd/MM/YYYY') }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.persona.telefono }}</td>
          <td>{{ item.persona.genero }}</td>
          <td>{{ $datetime.format(item._created_at, 'dd/MM/YYYY' )}}</td>
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
    expedido: ['LP', 'CB', 'SC', 'CH', 'OR', 'PT', 'TJ', 'BE', 'PD'],
    genero: ['M', 'F', 'OTRO'],
    listaRoles: [],
    rules: {
      constrasena: [
        value => !!value || 'El campo de la contraseña es obligatorio',
      ],
      minConstrasena: [
        v => v.length >= 6 || 'Minimo 6 caracteres',
      ],
      email: [
        val => (val || '').length > 0 || 'El campo email no puede estar vacío',
        val => /\S+@\S+\.\S+/.test(val) || 'El campo email no es válido'
      ],
    },
    rulesPersona: {
      nombres: [
        val => (val || '').length > 0 || 'El campo nombre no puede estar vacío',
      ],
      primer_apellido: [
        val => (val || '').length > 0 || 'El campo del primer apellido no puede estar vacío',
      ],
      nro_documento: [
        val => (val || '').length > 0 || 'El campo del número de documento no puede estar vacío'
      ],
      documento_expedido: [
        val => !!val || 'Seleccione su expedición'
      ],
      fecha_nacimiento: [
        val => (val || '').length > 0 || 'El campo de la fecha de nacimiento no puede estar vacío',
      ],
      genero: [
        val => (val || '').length > 0 || 'El campo de la fecha de nacimiento no puede estar vacío',
      ],
      rol: [
        val => !!val || 'Seleccione su expedición'
      ],
    },
    url: 'system/usuario',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS', class: 'teal darken-4 white--text' },
      { text: 'Usuario', divider: false, sortable: false, align: 'center', value: 'usuario', class: 'teal darken-4 white--text' },
      { text: 'Nombres', align: 'center', value: 'nombres', class: 'teal darken-4 white--text' },
      { text: 'Primer apellido', value: 'primer_pellido', class: 'teal darken-4 white--text' },
      { text: 'Segundo apellido', value: 'segundo_pellido', class: 'teal darken-4 white--text' },
      { text: 'Fecha de Nacimiento', value: 'fecha_nacimiento', class: 'teal darken-4 white--text' },
      { text: 'Correo Electrónico', value: 'email', class: 'teal darken-4 white--text' },
      { text: 'Número telefónico', value: 'telefono', class: 'teal darken-4 white--text' },
      { text: 'Género', value: 'genero', class: 'teal darken-4 white--text' },
      { text: 'Fecha de creación', value: '_created_at', class: 'teal darken-4 white--text' },
      { text: 'Estado', sortable: false, value: 'estado', class: 'teal darken-4 white--text' }
    ],
    formUsuario: {
      id: '',
      usuario: '',
      contrasena: '',
      email: '',
      persona: {
        nombres: '',
        primer_apellido: '',
        segundo_apellido: '',
        nro_documento: '',
        documento_expedido: '',
        fecha_nacimiento: '',
        genero: '',
        telefono: '',
      },
      estado: 'ACTIVO'
    },
    filters: [
      {
        field: 'nombres',
        label: 'Nombres',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'telefono',
        label: 'Teléfono',
        type: 'text',
        typeG: 'String'
      }
    ],
    date: null
  }),
  methods: {
    reset () {
      this.formUsuario = {
        id: '',
        usuario: '',
        contrasena: '',
        email: '',
        persona: {
          nombres: '',
          primer_apellido: '',
          segundo_apellido: '',
          nro_documento: '',
          documento_expedido: '',
          fecha_nacimiento: '',
          genero: '',
          telefono: '',
        },
        estado: 'ACTIVO'
      };
    },
    itemDelete ({ items }) {
      console.log('----------------', items);
      const message = '¿Está seguro de eliminar este registro?';
      this.$confirm(message, async () => {
        try {
          await this.$service.delete(`system/usuario/${items.id}`);
          this.updateList();
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
      const respuestaRoles = await this.$service.get('roles');
      this.listaRoles = respuestaRoles.rows;
      if (items && items.id) {
        this.$nextTick(async () => {
          this.formUsuario = items;
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
        const data = { ...({}, this.formUsuario) };
        if (data.id) {
          console.log('Este es el usuarioooooooooooo', data);
          const response = await this.$service.put(`system/usuario/${data.id}`, data);
          if (response) {
            this.$store.commit('closeModal');
            this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          const response = await this.$service.post('system/usuario/', data);
          if (response) {
            this.$store.commit('closeModal');
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

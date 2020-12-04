<template>
  <v-data-table
    :headers="headers"
    :items="listaUsuario"
    class="elevation-1"
    >
    <template v-slot:top>
      <v-toolbar flat class="teal darken-4 text-center white--text">
        <v-toolbar-title>
          <h4>Datos del Usuario</h4>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="abrirDialogoCuenta"
          max-width="600px"
          >
          <!-- FORMULARIO PARA AGREGAR O EDITAR UNA ACTIVIDAD -->
          <v-form
            ref="formUsuario"
            v-model="valid"
            lazy-validation
            @submit.prevent="save"
            >
            <v-card class="mx-auto mt-5" max-with="500">
              <v-card-title class="teal darken-4 white--text">
                <v-container fluid>
                  <v-row no-gutters>
                    <v-col
                      align="start"
                      justify="center"
                      :cols="11">
                      <v-icon color="white">{{ formUsuario.id ? 'assignment' : 'assignment' }}</v-icon>
                      {{ formUsuario.id ? 'Editar Cuenta' : 'Agregar Cuenta' }}
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
              <v-container fluid>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                  >
                  <v-text-field
                    dense
                    color="success"
                    clearable
                    required
                    :rules="rules.usario"
                    v-model="formUsuario.usuario"
                    prepend-icon="account_circle"
                    label="Usuario"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  :md="6"
                  :xs="12"
                  :sm="12"
                  >
                  <v-text-field
                    dense
                    color="success"
                    :append-icon="show ? 'remove_red_eye' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    class="input-group--focused"
                    clearable
                    required
                    hint="instroduzca 6 caracteres como mínimo"
                    @click:append="show = !show"
                    v-model="formUsuario.contrasena"
                    prepend-icon="account_circle"
                    label="Ingrese contraseña nueva"
                  ></v-text-field>
                </v-col>
              </v-row>
              <br>
              <v-divider></v-divider>
              <v-divider></v-divider><br>
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
                    :rules="rulesPersona.nombre"
                    v-model="formUsuario.persona.nombres"
                    prepend-icon="account_circle"
                    label="Nombres"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row no-gutters>
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
              <v-row no-gutters>
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
                    :rules="rulesPersona.numeroDocumento"
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
                    :rules="rulesPersona.documentoExpedido"
                    :items="expedido"
                    label="Expedido"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row no-gutters>
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
              <v-row no-gutters>
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
                    :rules="rules.telefono"
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
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- SLOT PARA ACCIONES DE DATA-TABLE------->
    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom color="success">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="openModal(item)">
            <v-icon color="success">edit</v-icon>
          </v-btn>
        </template>
        <span>Editar Cuenta</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
// import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

export default {
  mixins: [actions],
  data: () => ({
    valid: false,
    expedido: ['LP', 'CB', 'SC', 'CH', 'OR', 'PT', 'TJ', 'BE', 'PD'],
    genero: ['M', 'F', 'OTRO'],
    listaRoles: [],
    show: null,
    password: null,
    listaUsuario: [],
    usuarioActual: [],
    abrirDialogoCuenta: false,
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
    },
    url: 'system/usuario',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'actions', class: 'teal darken-4 white--text' },
      { text: 'Usuario', divider: false, sortable: false, align: 'center', value: 'usuario', class: 'teal darken-4 white--text' },
      { text: 'Nombres', align: 'center', value: 'persona.nombres', class: 'teal darken-4 white--text' },
      { text: 'Primer apellido', value: 'persona.primer_apellido', class: 'teal darken-4 white--text' },
      { text: 'Segundo apellido', value: 'persona.segundo_apellido', class: 'teal darken-4 white--text' },
      { text: 'Fecha de Nacimiento', value: 'persona.fecha_nacimiento', class: 'teal darken-4 white--text' },
      { text: 'Correo Electrónico', value: 'email', class: 'teal darken-4 white--text' },
      { text: 'Número telefónico', value: 'persona.telefono', class: 'teal darken-4 white--text' },
      { text: 'Género', value: 'persona.genero', class: 'teal darken-4 white--text' },
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
      const message = '¿Está seguro de eliminar este registro?';
      this.$confirm(message, async () => {
        try {
          await this.$service.delete(`persona/${items.id}`);
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
      this.abrirDialogoCuenta = false;
    },
    async openModal (item) {
      console.log('item', item);
      // if (item && item.id) {
      if (item) {
        this.$nextTick(async () => {
          this.formUsuario = item;
        });
      } else {
        this.reset();
      }
      // this.$store.commit('openModal');
      this.abrirDialogoCuenta = true;
    },
    /**
     * @function save
     * @description Esta funcion esta creada para guardar en la BD
     */
    async save () {
      if (this.$refs.formUsuario.validate()) {
        const data = { ...({}, this.formUsuario) };
        if (data.id) {
          console.log('Este es el usuarioooooooooooo', data);
          const response = await this.$service.put(`system/usuario-actualizar/${data.id}`, data);
          if (response) {
            this.abrirDialogoCuenta = false;
            this.$store.commit('closeModal');
            this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          const response = await this.$service.post('system/usuario', data);
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
  async mounted () {
    this.$nextTick(() => {
    });
    const repuestaUsuario = await this.$storage.get('user');
    console.log('Usuario Actula--', repuestaUsuario);
    this.listaUsuario = [
      {
        id: repuestaUsuario.id,
        usuario: repuestaUsuario.usuario,
        // contrasena: repuestaUsuario.contrasena,
        email: repuestaUsuario.email,
        persona: {
          id: repuestaUsuario.id,
          nombres: repuestaUsuario.nombres,
          primer_apellido: repuestaUsuario.primer_apellido,
          segundo_apellido: repuestaUsuario.segundo_apellido,
          nro_documento: repuestaUsuario.nro_documento,
          documento_expedido: repuestaUsuario.documento_expedido,
          fecha_nacimiento: repuestaUsuario.fecha_nacimiento,
          telefono: repuestaUsuario.telefono,
          genero: repuestaUsuario.genero,
        },
      },
    ];
  },
  components: {
    // CrudTable
  }
};
</script>

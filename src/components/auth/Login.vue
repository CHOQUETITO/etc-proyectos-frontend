<template>
  <div class="app-login">
    <!--<v-img src="../img/logo-catacora.png" containt width="100" height="100" aling="left"></v-img>-->
    <!--<v-img style="flex" src="../img/fondo2.png"></v-img> -->
    <div class="app-login__header">
      <!-- <div class="logo-derecha"></div> -->
      <div class="text-central">
        Sistema de Información Para el Seguimiento y Control de Ejecución de Proyectos Municipales
        <br>
        Gobierno Autónomo Municipal de Catacora
      </div>
      <!-- <div class="logo-izquierda"></div> -->
    </div>
    <div class="app-login__container">
         <h3>Ingreso al Sistema/SISCEPROM</h3>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class="mt-3"
        @submit.prevent="loginWithCredentials"
      >
        <v-row no-gutters class="text-center d-flex flex-column align-center justify-center">
          <v-col cols="12">
            <v-text-field
              label="Usuario"
              outlined
              v-model="user"
              style="width: 300px"
              color="primary"
              :aria-autocomplete="false"
              autofocus
              required
              :rules="[val => !!val || 'El campo del usuario no puede estar vacío']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Contraseña"
              outlined
              style="width: 300px"
              v-model="password"
              :aria-autocomplete="false"
              :append-icon="showPassword ? 'remove_red_eye' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              color="primary"
              :rules="[val => !!val || 'El campo de la contraseña no puede estar vacío']"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <vue-recaptcha
              sitekey="6LeVcvAZAAAAAGCoIIu-HQ2UQqNeGqhmxVDdarxU"
              @verify="onVerify"
              >
            </vue-recaptcha>
          </v-col>
          <v-col cols="12">
            <v-btn
              block
              :disabled="mostrarBoton"
              color="secondary"
              type="submit"
              height="40px"
              style="text-transform: none"
            >
              Ingresar al Sistema
            </v-btn>
          </v-col>
          <!-- Opcion para recuperar contraseña -->
          <!--
          <v-col cols="12">
            <v-alert
              color="white"
              text
              dense
              class="pt-0 mb-0"
            >
              <v-switch
                dense
                hide-details
                color="success"
                v-model="recovery"
                @change="showRecoveryPassword"
                label="¿Olvidó su contraseña?"
              >
              </v-switch>
            </v-alert>
          </v-col> -->
          <!-- Fin de opcion para recuperar contraseña -->
        </v-row>
      </v-form>
    </div>
    <!--Incio de recuperar Contraseña -->
    <!--
    <v-dialog
      v-model="dialog"
      width="340"
      persistent
      >
      <v-card>
        <v-form
          v-model="form"
          ref="recovery"
          lazy-validation
          @submit.prevent="recoveryPassword"
        >
          <v-row no-gutters>
            <v-col cols="12" class="text-center d-flex flex-column align-center justify-center pt-5">
              <v-icon
                color="primary"
                size="70"
              >
                help
              </v-icon>
              <section>¿Olvidó su contraseña?</section>
              No se preocupe, es posible recuperarla.
            </v-col>
            <v-col cols="12" class="pa-5 pb-0">
              <v-text-field
                label="Ingrese su correo electrónico."
                outlined
                v-model="email"
                :rules="[val => !!val || 'El correo electrónico no puede estar vacío']"
                color="primary"
              >
                <template v-slot:prepend>
                  <v-tooltip
                    bottom
                    color="primary"
                    max-width="200"
                  >
                    <template v-slot:activator="{ on }">
                      <v-icon color="primary" v-on="on">info</v-icon>
                    </template>
                    El correo electrónico que usted coloque debe ser el correo electrónico con el que se registro.
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0 pb-0 pl-5 pr-5">
              <v-alert
                color="warning"
                type="info"
                text
                dense
                class="fs9"
              >
                NOTA: En el correo electrónico estará su contraseña para que pueda acceder al sistema.
              </v-alert>
            </v-col>
            <v-col cols="12" class="pt-0 pb-1 pl-5 pr-5">
              <v-btn
                block
                color="default"
                @click="dialog = false; recovery = false;"
              >
                cancelar
              </v-btn>
            </v-col>
            <v-col cols="12" class="pt-0 pb-2 pl-5 pr-5">
              <v-btn
                block
                color="secondary"
                type="submit"
              >
                recuperar contraseña
              </v-btn>
            </v-col>
          </v-row>

        </v-form>
      </v-card>
    </v-dialog> -->
    <!-- Fin de recuperar contraseña   -->
  </div>
</template>

<script>
import Auth from './mixins/auth';
import VueRecaptcha from 'vue-recaptcha';
export default {
  components: { 'vue-recaptcha': VueRecaptcha },
  mixins: [Auth],
  data: () => ({
    valid: null,
    user: null,
    password: null,
    recovery: null,
    dialog: null,
    showPassword: null,
    form: null,
    email: null,
    mostrarBoton: true,
    // mostrarMensaje: null
  }),
  methods: {
    // Metodo para mostrar la ventana de verificación
    onVerify (response) {
      if (response) this.form = true;
      this.mostrarBoton = false;
    },
    // fin de metodo mostrar verificación
    /**
     * @function recoveryPassword
     * @description Esta funcion es para recuperar la contraseña
     */
    async recoveryPassword () {
      if (this.$refs.recovery.validate()) {
        const response = await this.$service.put('usuario/regenerar/contrasena', { correoElectronico: this.email });
        if (response && response.finalizado) {
          this.dialog = false;
          this.recovery = false;
          this.$message.success('Se ha enviado satisfactoriamente la contraseña a su correo electrónico');
        } else {
          this.$message.error(response.mensaje);
        }
      } else {
        this.$message.error('Error el correo no puede estar vacío');
      }
    },
    showRecoveryPassword () {
      if (this.recovery) {
        this.dialog = true;
      }
    },
    loginWithCredentials () {
      if (this.$refs.form.validate()) {
        this.withCredentials(this.$router, this.user, this.password);
        console.log('Ingreso Correctamente', this.mostrarMensaje);
        this.mostrarMensaje = true;
      } else {
        this.$message.error('Faltan campos por llenar');
      }
    },
    /**
     * @function loginOpenid
     * @description Conectar con OpenID
     */
    loginOpenid () {
      this.getCode();
    }
  }
};
</script>
<style lang="scss" src="./Login.scss"></style>

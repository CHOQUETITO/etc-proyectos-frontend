import axios from 'axios';
// import AES from 'crypto-js/aes';

export default {
  methods: {
    async withCredentials (router, user, pass) {
      try {
        const credentials = {
          usuario: this.enc(user),
          password: this.enc(pass)
        };
        const response = await this.$service.post('auth', credentials);
        if (!response) throw new Error('Existen problemas de conexión. Por favor revise su configuración a Internet.');
        if (response.hasOwnProperty('error') || response.finalizado === false) throw new Error(response.error || response.mensaje);
        this.$storage.set('user', response.datos.usuario);
        this.$storage.set('roles', response.datos.roles);
        this.$storage.set('token', response.datos.token);
        const menus = [
          {
            url: 'profile',
            label: 'Cuenta',
            icon: 'account_circle'
          },
          {
            url: 'logout',
            label: 'Cerrar sesión',
            icon: 'power_settings_new'
          }
        ];
        this.$storage.set('menu', [].concat(response.datos.menu, menus));
        this.$storage.set('sidenav', true);
        const passwordValid = response.datos.usuario.cambiarContrasena;
        this.$storage.set('psw', passwordValid);
        if (passwordValid) {
          router.push('/profile');
          this.$store.commit('setChangePassword', true);
        } else {
          if ((response.datos.menu || []).length > 0) {
            router.push(response.datos.menu[0] ? response.datos.menu[0].url : '');
          } else {
            router.push('/profile');
          }
        }
        this.$nextTick(() => {
          this.$store.commit('setAuth', true);
          this.$store.commit('setMain', true);
        });
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    enc (value) {
      // return AES.encrypt(value, this.$store.state.s).toString();
      return value;
    },
    async refreshToken (idEmpresa) {
      try {
        const nuevoToken = await this.$service.get(`public/refresh-token?idEmpresa=${idEmpresa}`);
        this.$storage.set('token', nuevoToken.datos.token);
        this.$storage.set('user', nuevoToken.datos.usuario);
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    },
    async getCode () {
      const url = process.env.VUE_APP_BASE_SERVER;
      try {
        const request = {
          method: 'GET',
          url: `${url}public/codigo`,
          responseType: 'json'
        };
        const response = await axios(request);
        this.$storage.set('oauth2_state', response.data.codigo);
        window.location.href = new URL(response.data.url);
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    },
    reload() {
      this.$store.commit('setMain', false);
      this.$nextTick(() => {
        this.$store.commit('setMain', true);
      });
    },
    cleanData (store) {
      store.commit('setDefault');
    },
    async logout () {
      try {
        const codigo = this.$storage.get('oauth2_state');
        if (codigo) {
          if (this.$storage.existUser()) {
            this.$storage.removeUser();
            this.$storage.remove('menu');
            this.$storage.remove('psw');
            this.$storage.remove('token');
            this.$storage.remove('sidenav');
            this.$storage.remove('permissions');
          } else {
            this.$storage.removeUser();
            this.$storage.remove('menu');
            this.$storage.remove('psw');
            this.$storage.remove('token');
            this.$storage.remove('sidenav');
            this.$storage.remove('permissions');
          }
        } else {
          // if (this.$storage.exist('token')) {
          //   const init = {
          //     method: 'POST',
          //     headers: {
          //       Authorization: `Bearer ${this.$storage.get('token')}`
          //     }
          //   };
          //   await fetch(process.env.VUE_APP_BASE_SERVER + 'public/logout', init);
          // }
          this.$storage.removeUser();
          this.$storage.remove('menu');
          this.$storage.remove('psw');
          this.$storage.remove('token');
          this.$storage.remove('sidenav');
          this.$storage.remove('permissions');
        }
        window.location = `${process.env.VUE_APP_FRONTEND}/#/login`;
        this.$nextTick(() => {
          if (this.$store) this.$store.commit('setAuth', false);
        });
      } catch (error) {
        this.$message.error(error.message || 'Ocurrio un error a tratar de conectarse con ciudadania digital');
      }
    }
  }
};

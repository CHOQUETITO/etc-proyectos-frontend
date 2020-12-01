<template>
  <div>
    <v-container>
      <!-- &&&&&&&&&&&6   FILTROS PARA REPORTES     &&&&&&&&&&&&&&&  -->
      <v-card
        max-width="1200"
        class="mx-auto mt-5"
        >
        <v-app-bar
          dark
          color="teal darken-3"
          >
          <v-toolbar-title>Reportes de Cantidad de Proyectos por Fechas y Estado</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-container>
          <v-row align="center">
            <v-col class="d-flex"
              cols="12"
              :md="4"
              :xs="12"
              :sm="4"
              >
              <v-menu
                v-model="dateInicio"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    color="success"
                    dense
                    v-model="fechaInicio"
                    label="Desde:"
                    prepend-icon="event"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaInicio"
                  @input="dateInicio = false"
                  :first-day-of-week="0"
                  locale="es-EN"
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="d-flex"
              cols="12"
              :md="4"
              :xs="12"
              :sm="4"
              >
              <v-menu
                v-model="dateFinal"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    color="success"
                    dense
                    v-model="fechaFinal"
                    label="Hasta:"
                    prepend-icon="event"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaFinal"
                  @input="dateFinal = false"
                  :first-day-of-week="0"
                  locale="es-EN"
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              :md="4"
              :xs="12"
              :sm="4"
              >
              <v-select
                color="success"
                clearable
                required
                outlined
                dense
                prepend-icon="format_list_numbered"
                v-model="estadoProyecto"
                :rules="rules.estadoProyecto"
                :items="listaEstado"
                label="(*) Estado del Proyecto"
              ></v-select>
            </v-col>
          </v-row>
          <v-row aling="center">
            <v-col
              cols="12"
              :sm="12"
              :md="12"
              :lg="12"
              :xs="12"
              class="mt-2 mb-2"
              >
              <v-btn color="warning" @click.stop="verFichaEstado">BUSCAR</v-btn>
              <v-btn class="ml-2" color="info" @click.stop="resetCampos">BORRAR</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <br><v-divider></v-divider>
      <!-- %%%%%%%%% Inicio de Filtro de Proyectos por Comunidad %%%%%%%%%% -->
      <v-card
        max-width="1200"
        class="mx-auto mt-5"
        >
        <v-app-bar
          dark
          color="teal darken-3"
          >
          <v-toolbar-title>Reportes de Cantidad de Proyectos por Fechas y Comunidad</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-app-bar>
        <v-container>
          <v-row align="center">
            <v-col class="d-flex"
              cols="12"
              :md="4"
              :xs="12"
              :sm="4"
              >
              <v-menu
                v-model="dateInicioComunidad"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    color="success"
                    dense
                    v-model="fechaInicioComunidad"
                    label="Desde:"
                    prepend-icon="event"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaInicioComunidad"
                  @input="dateInicioComunidad = false"
                  :first-day-of-week="0"
                  locale="es-EN"
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="d-flex"
              cols="12"
              :md="4"
              :xs="12"
              :sm="4"
              >
              <v-menu
                v-model="dateFinalComunidad"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    color="success"
                    dense
                    v-model="fechaFinalComunidad"
                    label="Hasta:"
                    prepend-icon="event"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaFinalComunidad"
                  @input="dateFinalComunidad = false"
                  :first-day-of-week="0"
                  locale="es-EN"
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              :md="4"
              :xs="12"
              :sm="4"
              >
              <v-select
                color="success"
                clearable
                required
                dense
                outlined
                v-model="idComunidades"
                prepend-icon="terrain"
                item-text="nombre"
                item-value="id"
                :items="listaComunidades"
                label="Comunidad"
              ></v-select>
            </v-col>
          </v-row>
          <v-row aling="center">
            <v-col
              cols="12"
              :sm="12"
              :md="12"
              :lg="12"
              :xs="12"
              class="mt-2 mb-2"
              >
              <v-btn color="warning" @click.stop="verFichaComunidad">BUSCAR</v-btn>
              <v-btn class="ml-2" color="info" @click.stop="resetCampos">BORRAR</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <!-- Fin fila de filtros -->
      <!-- $$$$$$$$$$$$$$$ V-model para Reportes $$$$$$$$$$$$$$ -->
      <v-dialog v-model="pdfGeneradoEstado" width="900" persistent>
        <v-toolbar color="secondary" dark text>
          <span class="title">Reporte de Proyectos por Estado</span>
          <v-spacer></v-spacer>
          <v-btn class="mx-2" fab dark small color="primary" @click="pdfGeneradoEstado = false">
            <v-icon dark>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card style="height: 80vh">
          <v-card-text class="pa-0" style="height: 100%">
            <iframe :src="documentoPdfEstado" width="100%"  height="100%" type="application/pdf"></iframe>
          </v-card-text>
        </v-card>
      </v-dialog>
  <!-- $$$$$$$$$$$$$$$    Fin Reportes       $$$$$$$$$$$$$$ -->
    </v-container>
  </div>
</template>

<script>

export default {
  data: () => ({
    listaComunidades: [],
    listaCategorias: [],
    verFichaEstadoItems: [],
    listaEstado: ['EJECUCION', 'CONCLUIDO'],
    idComunidades: null,
    idCategorias: null,
    dateInicio: null,
    dateFinal: null,
    fechaInicio: null,
    fechaFinal: null,
    dateInicioComunidad: null,
    dateFinalComunidad: null,
    fechaInicioComunidad: null,
    fechaFinalComunidad: null,
    estadoProyecto: null,
    pdfGeneradoEstado: false,
    documentoPdfEstado: false,

    rules: {
      fechaInicio: [
        val => (val || '').length > 0 || 'El campo de la fecha inicio no puede estar vacío'
      ],
      fechaFinal: [
        val => (val || '').length > 0 || 'El campo de la fecha final no puede estar vacío'
      ],
      estadoProyecto: [
        val => !!val || 'Seleccione estado del Proyecto'
      ],
    },
    // form: {
    // fechaInicio: '',
    // fechaFinal: '',
    // estadoProyecto: '',
    // },
  }),

  methods: {
    // Filtro para Proyectos por Fechas y Estado
    async verFichaEstado () {
      const respuesta = this.fechaInicio;
      console.log('fechaInico', respuesta);

      if (this.fechaInicio != null && this.fechaFinal != null && this.estadoProyecto != null) {
        this.verFichaEstadoItems = [
          {
            fechaDesde: this.fechaInicio,
            fechaHasta: this.fechaFinal,
            estadoProyecto: this.estadoProyecto,
          }
        ];
        const data = {
          fechaDesde: this.fechaInicio,
          fechaHasta: this.fechaFinal,
          estadoProyecto: this.estadoProyecto
        };
        console.log('query', data);
        const pdf = await this.$service.post('proyectos/reporteEstadoProyecto', data);
        const contentType = 'application/pdf';
        const blob = this.b64toBlob(pdf, contentType);
        this.documentoPdfEstado = URL.createObjectURL(blob);
        this.pdfGeneradoEstado = true;
      } else {
        this.$message.error('Faltan campos por llenar');
      }
    },
    // Filtro para Proyectos por Fechas y Comunidad
    verFichaComunidad () {
      this.$confirm('Reporte Proyectos por Comunidad en desarrollo', () => {
        this.$message.success('Presionaste aceptar');
      }, () => {
        this.$message.warning('Presionaste cancelar');
      });
    },
    async resetCampos () {
      this.listaComunidades = null;
      this.listaCategorias = null;
      this.idComunidades = null;
      this.idCategorias = null;
      this.dateInicio = null;
      this.dateFinal = null;
      this.fechaInicio = null;
      this.fechaFinal = null;
      this.dateInicioComunidad = null;
      this.dateFinalComunidad = null;
      this.fechaInicioComunidad = null;
      this.fechaFinalComunidad = null;
      this.estadoProyecto = null;
      const respuestaComunidades = await this.$service.get('comunidades');
      this.listaComunidades = respuestaComunidades.rows;
      const respuestaCategorias = await this.$service.get('categorias');
      this.listaCategorias = respuestaCategorias.rows;
    },
    b64toBlob (b64Data, contentType = '', sliceSize = 512) {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
  },
  async mounted () {
    this.$nextTick(async () => {
    });
    const respuestaComunidades = await this.$service.get('comunidades');
    this.listaComunidades = respuestaComunidades.rows;
    const respuestaCategorias = await this.$service.get('categorias');
    this.listaCategorias = respuestaCategorias.rows;
  },
};

</script>
<style lang="scss" scoped>

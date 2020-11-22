<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        :sm="12"
        :md="12"
        :lg="12"
        :xs="12"
        class="mt-2 mb-2"
        >
        <v-alert
          border="left"
          type="success"
          text
          >
          Para mejorar el seguimiento y control de Proyectos, REPORTES <br>
          <strong><small>Gobiero Autónomo Municipal de Catacora</small></strong>
        </v-alert>
      </v-col>
    </v-row>
    <!-- &&&&&&&&&&&6   FILTROS PARA REPORTES     &&&&&&&&&&&&&&&  -->
    <v-row align="center">
      <v-col class="d-flex"
        cols="12"
        :md="6"
        :xs="12"
        :sm="12"
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
              label="Fecha Inicio"
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
        :md="6"
        :xs="12"
        :sm="12"
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
              label="Fecha Final"
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
      <v-col class="d-flex"
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
          outlined
          v-model="idComunidades"
          prepend-icon="terrain"
          item-text="nombre"
          item-value="id"
          :items="listaComunidades"
          label="Comunidad"
        ></v-select>
      </v-col>
      <v-col class="d-flex"
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
          outlined
          v-model="idCategorias"
          prepend-icon="category"
          item-text="nombre"
          item-value="id"
          :items="listaCategorias"
          label="Categoria"
        ></v-select>
      </v-col>
    </v-row>
    <!-- Fin fila de filtros -->
    <v-col
      cols="12"
      :sm="12"
      :md="12"
      :lg="12"
      :xs="12"
      class="mt-2 mb-2"
      >
      <v-btn color="warning" @click.stop="buscarFiltro">BUSCAR</v-btn>
      <v-btn class="ml-2" color="info" @click.stop="resetCampos">BORRAR</v-btn>
    </v-col>
  </v-container>
</template>
<script>

export default {
  data () {
    return {
      listaComunidades: [],
      listaCategorias: [],
      idComunidades: null,
      idCategorias: null,
      dateInicio: null,
      dateFinal: null,
      fechaInicio: null,
      fechaFinal: null,
    };
  },
  methods: {
    buscarFiltro () {
      this.$confirm('Reporte en desarrollo', () => {
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
      const respuestaComunidades = await this.$service.get('comunidades');
      this.listaComunidades = respuestaComunidades.rows;
      const respuestaCategorias = await this.$service.get('categorias');
      this.listaCategorias = respuestaCategorias.rows;
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

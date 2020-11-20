<template>
  <v-container fluid>
        <!-- $$$$$$$$$ FILTRO DEL DASH $$$$$$$$$$ -->
        <!-- $$$$$$$$$    FIN FILTRO   $$$$$$$$$$ -->
        <!------- Echarts ------->
        <v-row>
          <!-- pie proyectos por Comunidades -->
          <v-col class="d-flex"
            cols="12"
            :md="6"
            :xs="12"
            :sm="12"
            >
            <div class="card-chart elevation-1 pa-1">
            <v-chart :options="pieProyectos(dataProyectosComunidades, 'Número de Proyectos por Comunidades', 'nombre', 'cantidad')" class="mb-5" autoresize ref="numeroProyectos"/>
            </div>
          </v-col>
          <!-- pie proyectos por Categorias -->
          <v-col class="d-flex"
            cols="12"
            :md="6"
            :xs="12"
            :sm="12"
            >
            <div class="card-chart elevation-1 pa-1">
            <v-chart :options="pieProyectos(dataProyectosCategorias, 'Número de Proyectos por Categorias', 'nombre', 'cantidad')" class="mb-5" autoresize ref="numeroProyectos"/>
            </div>
          </v-col>
          <v-divider></v-divider>
          <!-- Bar para proyectos por comunidades -->
          <v-col class="d-flex"
            cols="12"
            :md="6"
            :xs="12"
            :sm="12"
            >
            <div class="card-chart elevation-1 pa-1">
            <v-chart :options="barVertical(dataProyectosComunidades, 'Número de Proyectos por Comunidad', 'nombre', 'cantidad')" class="mb-5" autoresize ref="numeroProyectos"/>
            </div>
          </v-col>
          <!-- Bar para proyectos por Categorias -->
          <v-col class="d-flex"
            cols="12"
            :md="6"
            :xs="12"
            :sm="12"
            >
            <div class="card-chart elevation-1 pa-1">
            <v-chart :options="barVertical(dataProyectosCategorias, 'Número de Proyectos por Categorias', 'nombre', 'cantidad')" class="mb-5" autoresize ref="numeroProyectos"/>
            </div>
          </v-col>
        </v-row>
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
            Representación gráfica de los principales indicadores sobre los (PROYECTOS)<br>
            <strong><small>que está orientada a la toma de decisiones para optimizar la estrategia del Gobieno Autónomo Municipal de Catacora (Área técnica de Proyectos).</small></strong>
          </v-alert>
        </v-col>
  </v-container>
</template>
<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/dataset';
import 'echarts/map/js/world';
import 'zrender/lib/svg/svg';

export default {
  components: {
    'v-chart': ECharts,
    // LMap,
    // LTileLayer,
    // LGeoJson,
  },
  data () {
    return {
      listaComunidades: [],
      listaCategorias: [],
      dataProyectosComunidades: [],
      dataProyectosCategorias: [],
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      date: null,
      dateFinal: null,
      fechaInicio: null,
      fechaFinal: null
    };
  },
  methods: {
    async getData () {
      const respuestaCantidad = await this.$service.get('proyectos/cantidad-proyectos');
      this.dataProyectosComunidades = respuestaCantidad;

      const respuestaCantidadCategorias = await this.$service.get('proyectos/cantidad-proyectos-categorias');
      this.dataProyectosCategorias = respuestaCantidadCategorias;
    },
    setDataInCharts() {
      const { numeroProyectos } = this.$refs;
      if (numeroProyectos) {
        numeroProyectos.hideLoading();
      }
    },

    pieProyectos(data, title, key = 'name', value = 'value') {
      const nombre = data.map(d => d[key]);
      const pie = data.map(d => d[value]);
      return {
        // backgroundColor: '#2c343c',
        title: {
          text: title,
          textStyle: {
            color: '#004D40'
          },
          subtext: title,
          left: 'center'
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: 'Descargar como imagen'
            }
          },
          left: 10
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: nombre,
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            name: 'Pie',
            data: [
              { value: pie[0], name: nombre[0] },
              { value: pie[1], name: nombre[1] },
              { value: pie[2], name: nombre[2] },
              { value: pie[3], name: nombre[3] },
              { value: pie[4], name: nombre[4] },
              { value: pie[5], name: nombre[5] },
              { value: pie[6], name: nombre[6] },
              { value: pie[7], name: nombre[7] },
              { value: pie[8], name: nombre[8] },
              { value: pie[9], name: nombre[9] }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    },

    barVertical(data, title, key = 'name', value = 'value') {
      const xAxis = data.map(d => d[key]);
      const yAxis = data.map(d => d[value]);
      const xAxisType = 'category';
      const yAxisType = 'value';
      return {
        title: {
          text: title,
          textStyle: {
            color: '#004D40'
          },
          left: 'center'
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: 'Descargar como imagen'
            }
          },
          left: 10
        },
        xAxis: {
          type: xAxisType,
          data: xAxis,
        },
        yAxis: {
          type: yAxisType,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [{
          data: yAxis,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top'
              }
            }
          },
          animationEasing: 'elastic',
        }]
      };
    },
  },
  async mounted () {
    this.$nextTick(async () => {
      try {
        const chartLoader = {
          text: 'Cargando...',
          color: '#1680c2',
          size: '50px',
          textColor: '#eee',
          maskColor: 'rgba(0, 0, 0, 0.3)',
          zlevel: 1,
          arcRadius: 120,
          lineWidth: 8,
        };
        const { numeroProyectos } = this.$refs;
        numeroProyectos.showLoading(chartLoader);
        await this.getData();
        this.setDataInCharts();
      } catch (error) {
        this.$message.error(error.message);
      }
    });
    const respuestaComunidades = await this.$service.get('comunidades');
    this.listaComunidades = respuestaComunidades.rows;
    const respuestaCategorias = await this.$service.get('categorias');
    this.listaCategorias = respuestaCategorias.rows;
  },
};
</script>
<style lang="scss" scoped>
</style>

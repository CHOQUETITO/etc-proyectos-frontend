<template>
  <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex"
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
                @input="date = false"
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
              prepend-icon="terrain"
              :items="items"
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
              prepend-icon="category"
              :items="items"
              label="Categoria"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col
          cols="12"
          :sm="12"
          :md="12"
          :lg="12"
          :xs="12"
          >
          <div class="card-chart elevation-1 pa-1">
          <v-chart :options="barVertical(dataProyectos, 'Número de Proyectos', 'nombre', 'cantidad')" class="mb-5" autoresize ref="numeroProyectos"/>
          </div>
          </v-col>
        </v-row>
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
      dataProyectos: [],
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
      this.dataProyectos = respuestaCantidad;
    },
    setDataInCharts() {
      const { numeroProyectos } = this.$refs;
      if (numeroProyectos) {
        numeroProyectos.hideLoading();
      }
    },
    barVertical(data, title, key = 'name', value = 'value') {
      const xAxis = data.map(d => d[key]);
      const yAxis = data.map(d => d[value]);
      const xAxisType = 'category';
      const yAxisType = 'value';
      return {
        title: {
          text: title,
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
  mounted () {
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
  },
};
</script>
<style lang="scss" scoped>
</style>

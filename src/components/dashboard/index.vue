<template>
  <div>
    <v-container fluid>
      <template>
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
      </template>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    date: null,
    dateFinal: null,
  }),
};
</script>
<style lang="scss" scoped>
</style>

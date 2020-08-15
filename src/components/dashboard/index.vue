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
            <v-select
              :items="items"
              outlined
              label="Fecha Inicio"
            ></v-select>
          </v-col>
          <v-col class="d-flex"
            cols="12"
            :md="6"
            :xs="12"
            :sm="12"
            >
            <v-select
              :items="items"
              outlined
              label="Fecha Final"
            ></v-select>
          </v-col>
          <v-col class="d-flex"
            cols="12"
            :md="6"
            :xs="12"
            :sm="12"
            >
            <v-select
              :items="items"
              outlined
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
              :items="items"
              outlined
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
  }),
};
</script>
<style lang="scss" scoped>
</style>

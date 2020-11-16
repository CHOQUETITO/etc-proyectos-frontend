<template>
  <div>
    <!-- TEMPLATE PARA FILTROS COMUNIDADES, CATEGORIAS Y FECHAS-->
    <template>
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
                v-model="dateFiltroInicio"
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
                    v-model="form.fechaInicio"
                    label="Fecha Inicio"
                    prepend-icon="event"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.fechaInicio"
                  @input="dateFiltroInicio = false"
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
                v-model="dateFiltroFinal"
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
                    v-model="form.fechaFinal"
                    label="Fecha Final"
                    prepend-icon="event"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.fechaFinal"
                  @input="dateFiltroFinal = false"
                  :first-day-of-week="0"
                  locale="es-EN"
                  >
                </v-date-picker>
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
                outlined
                prepend-icon="terrain"
                item-text="nombre"
                item-value="id"
                @change="actualizarFiltro"
                v-model= "idComunidad"
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
                prepend-icon="category"
                @change="actualizarFiltroCategoria"
                v-model="idCategoria"
                item-text="nombre"
                item-value="id"
                :items="listaCategorias"
                label="Categoria"
              ></v-select>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </template>
    <!--------------------FIN FILTROS COMUNIDADES, CATEGORIAS Y FECHAS-------------->
    <!-- INICIO crud-table PROYECTOS------------------------- -->
    <v-divider></v-divider>
    <crud-table
      :headers="headers"
      :url="url"
      :filters="filters"
      :widthModal="500"
      :order="order"
      :custom="true"
      >
      <!-- BUTTON AGREGAR -->
      <template slot="buttons">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
              @click.native.stop="openModal"
              slot="activator"
            ><v-icon dark>add</v-icon> Agregar </v-btn>
          </template>
            <span> Agregar Proyecto </span>
        </v-tooltip>
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
        <v-tooltip bottom color="blue-grey darken-2">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click.stop="verCronogramas(Object.assign({}, items))">
              <v-icon color="blue-grey darken-2">event</v-icon>
            </v-btn>
          </template>
          <span>Ver Seguimientos</span>
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
            <v-tooltip bottom color="error">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.stop="verCronogramas(Object.assign({}, item))">
                  <v-icon color="blue">trending_up</v-icon>
                </v-btn>
              </template>
              <span>Ver seguimiento</span>
            </v-tooltip>
            <v-tooltip bottom color="error">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.stop="verFicha(Object.assign({}, item))">
                  <v-icon color="blue">picture_as_pdf</v-icon>
                </v-btn>
              </template>
              <span>Ver ficha</span>
            </v-tooltip>
          </td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.comunidad.nombre }}</td>
          <td>{{ item.poa.nombre }}</td>
          <td>{{ item.empresa.nombre }}</td>
          <td>{{ item.categoria.nombre }}</td>
          <td>{{ item.fechaInicio }}</td>
          <td>{{ item.fechaFinal }}</td>
          <td>
            <v-btn outlined :color="item.estado === 'ACTIVO' ? 'info' : 'default'">{{ item.estado}}</v-btn>
          </td>
        </tr>
      </template>
    </crud-table>
    <!-- Fin crud-table PROYECTOS----------------------------------- -->
    <!-- SLOT PARA EL FORMULARIO AGREGAR PROYECTO----------->
    <v-dialog
      persistent
      v-model="abrirDialogo"
      width="800"
      >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="save"
        >
        <v-card>
          <v-card-title class="teal darken-4 white--text">
            <v-container fluid>
              <v-row no-gutters>
                <v-col
                  align="start"
                  justify="center"
                  :cols="11">
                  <v-icon color="white">{{ form.id ? 'assignment' : 'assignment' }}</v-icon>
                  {{ form.id ? 'Editar Proyecto' : 'Adicionar Proyecto' }}
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
                :md="12"
                :xs="12"
                :sm="12"
                >
                <v-text-field
                  dense
                  color="success"
                  clearable
                  required
                  :rules="rules.nombre"
                  v-model="form.nombre"
                  prepend-icon="assignment"
                  label="Nombre del Proyecto"
                  >
                </v-text-field>
              </v-col>
            </v-row >
            <v-row no-gutters>
              <v-col
                cols="12"
                :md="12"
                :xs="12"
                :sm="12"
                >
                <v-text-field
                  color="success"
                  clearable
                  required
                  dense
                  :rules="rules.descripcion"
                  v-model="form.descripcion"
                  prepend-icon="assignment"
                  label="Descripción del Proyecto"
                  >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                :md="6"
                :xs="12"
                :sm="6"
                >
                <v-select
                  color="success"
                  clearable
                  required
                  dense
                  :rules="rules.idComunidad"
                  v-model="form.idComunidad"
                  item-text="nombre"
                  item-value="id"
                  :items="listaComunidades"
                  prepend-icon="assignment"
                  label="Comunidad donde se ejecuta el Proyecto"
                  >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                :md="6"
                :xs="12"
                :sm="6"
                >
                <v-select
                  color="success"
                  clearable
                  required
                  dense
                  :rules="rules.categoria"
                  v-model="form.idCategoria"
                  item-text="nombre"
                  item-value="id"
                  :items="listaCategorias"
                  prepend-icon="assignment"
                  label="Categoria del Proyecto"
                  >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                :md="6"
                :xs="12"
                :sm="6"
                >
                <v-select
                  color="success"
                  clearable
                  required
                  dense
                  :rules="rules.poa"
                  v-model="form.idPoa"
                  item-text="nombre"
                  item-value="id"
                  :items="listaPoas"
                  prepend-icon="assignment"
                  label="Poa del Proyecto"
                  >
                </v-select>
              </v-col>
              <v-col
                cols="12"
                :md="6"
                :xs="12"
                :sm="6"
                >
                <v-select
                  color="success"
                  clearable
                  required
                  dense
                  :rules="rules.empresa"
                  v-model="form.idEmpresa"
                  item-text="nombre"
                  item-value="id"
                  :items="listaEmpresas"
                  prepend-icon="assignment"
                  label="Empresa que ejecuta el Proyecto"
                  >
                </v-select>
              </v-col>
            </v-row>
            <v-row no-gutters>
            </v-row>
            <v-row no-gutters>
              <v-col
                cols="12"
                :md="6"
                :xs="12"
                :sm="6"
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
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      color="seccess"
                      dense
                      :rules="rules.fechaInicio"
                      v-model="form.fechaInicio"
                      label="Fecha Inicio"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.fechaInicio"
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
                :sm="6"
                >
                <v-menu
                  v-model="dateFinal"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  locale="es-EN"
                  min-width="290px"
                  >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      color="success"
                      dense
                      :rules="rules.fechaFinal"
                      v-model="form.fechaFinal"
                      label="Fecha Final"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.fechaFinal"
                    @input="dateFinal = false"
                    :first-day-of-week="0"
                    locale="es-EN"
                  ></v-date-picker>
                </v-menu>
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
                  :md="12"
                  :lg="5"
                  cols="12"
                  >
                  <small class="error--text text-required">* Los campos son obligatorios</small>
                </v-col>
              </v-row>
              <v-row>
                <v-btn @click.stop="closeModal"><v-icon>cancel</v-icon> Cancelar </v-btn>
                <v-btn color="primary" type="submit" :disabled="!valid">
                <v-icon dark>check</v-icon> Enviar</v-btn>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <!-- Fin AGREGAR y EDITAR FORMULARIO---------------------------- -->
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
    <!-- Inicio de V-DIALOG -DATA-TABLE para CRONOGRAMAS ----------- -->
    <v-dialog
      persistent
      v-model="abrirDialogoCronogramas"
      width="1200"
      >
      <v-card class="mx-auto mt-5" max-with="900">
        <v-card-title class="teal darken-4 white--text">
          <v-container fluid>
            <v-row no-gutters>
              <v-col
                align="start"
                justify="center"
                :cols="11">
                <v-icon color="white">business</v-icon>
                Cronograma de Actividades
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
        <v-data-table
          :headers="headersCronogramas"
          :items="listaCronogramas"
          class="elevation-1"
          >
          <template v-slot:top>
            <v-toolbar
              flat
              >
              <v-toolbar-title>Proyecto:</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <!-- v-dialog para Agregar Cronograma desde proyectos-->
              <v-dialog
                v-model="abrirDialogoAgregarCronogramas"
                max-width="500px"
                >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >
                    Agregar Actividad
                  </v-btn>
                </template>

                <!-- FORMULARIO PARA AGREGAR O EDITAR UNA ACTIVIDAD -->
                <v-card>
                  <v-card-title class="mx-auto mt-5" max-with="500">
                    <v-container fluid>
                      <v-row no-gutters>
                        <v-col
                          align="start"
                          justify="center"
                          :cols="11">
                          <v-icon>{{ formCronogramas.id ? 'assignment' : 'assignment' }}</v-icon>
                          {{ formCronogramas.id ? 'Editar Cronograma' : 'Adicionar Cronograma' }}
                        </v-col>
                        <v-col :cols="1">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn icon color="gray" v-on="on" @click.stop="closeModalC">
                                <v-icon>close</v-icon>
                              </v-btn>
                            </template>
                            <span>Cerrar ventana</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-title>
                <v-form
                  ref="formCronogramas"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="saveCronogramas"
                  >
                  <v-card>
                    <v-card-title class="mx-auto mt-5" max-with="500">

                    </v-card-title>
                    <v-container fluid>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          :md="12"
                          :xs="12"
                          :sm="12"
                          >
                          <v-select
                            color="success"
                            clearable
                            required
                            dense
                            :rules="rules.nombreProyecto"
                            v-model="formCronogramas.idProyecto"
                            item-text="nombre"
                            item-value="id"
                            :items="listaProyectos"
                            prepend-icon="assignment"
                            label="Nombre del Proyecto"
                            >
                          </v-select>
                        </v-col>
                      </v-row>
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
                            :rules="rules.nombre"
                            v-model="formCronogramas.nombre"
                            prepend-icon="calendar_today"
                            label="Nombre del Cronograma"
                            >
                          </v-text-field>
                        </v-col>
                      </v-row >
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          :md="12"
                          :xs="12"
                          :sm="12"
                          >
                          <v-text-field
                            color="success"
                            clearable
                            required
                            dense
                            :rules="rules.actividad"
                            v-model="formCronogramas.actividad"
                            prepend-icon="calendar_today"
                            label="Actividad del Cronograma"
                            >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          :md="6"
                          :xs="12"
                          :sm="6"
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
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                color="seccess"
                                dense
                                :rules="rules.fecIniCronograma"
                                v-model="formCronogramas.fecIniCronograma"
                                label="Fecha Inicio de la Actividad"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="formCronogramas.fecIniCronograma"
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
                          :sm="6"
                          >
                          <v-menu
                            v-model="dateFinal"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            locale="es-EN"
                            min-width="290px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                color="success"
                                dense
                                :rules="rules.fecFinCronograma"
                                v-model="formCronogramas.fecFinCronograma"
                                label="Fecha Final de la Actividad"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="formCronogramas.fecFinCronograma"
                              @input="dateFinal = false"
                              :first-day-of-week="0"
                              locale="es-EN"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          :md="12"
                          :xs="12"
                          :sm="12"
                          >
                          <v-select
                            color="success"
                            clearable
                            required
                            dense
                            prepend-icon="account_circle"
                            v-model="formCronogramas.estadoActividad"
                            :rules="rules.estadoActividad"
                            :items="estadoActividad"
                            label="Estado de la Actividad"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          :md="12"
                          :xs="12"
                          :sm="12"
                          >
                          <v-text-field
                            color="success"
                            clearable
                            required
                            dense
                            :rules="rules.observacion"
                            v-model="formCronogramas.observacion"
                            prepend-icon="calendar_today"
                            label="Observaciones"
                            >
                          </v-text-field>
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
                            <v-btn block @click.stop="closeModalC"><v-icon>cancel</v-icon> Cancelar </v-btn>
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
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <!-- SLOT PARA ACCIONES DE DATA-TABLE------->
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom color="success">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.stop="openModalCronogramas(item)">
                  <v-icon color="success">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar registro</span>
            </v-tooltip>
            <v-tooltip bottom color="error">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.prevent="itemDeleteCronogramas(Object.assign({}, item))">
                  <v-icon color="red">delete</v-icon>
                </v-btn>
              </template>
              <span>Eliminar registro</span>
            </v-tooltip>
          </template>
          <template v-slot:item.estadoActividad="{ item }">
            <v-chip
              :color="getColor(item.estadoActividad)"
              dark
              >
              {{ item.estadoActividad }}
            </v-chip>
          </template>
          <template v-slot:item.glutenfree="{ item }">
            <v-simple-checkbox
              class="teal darken-1"
              :v-model="glutenfree(item.estadoActividad)"
              :value="glutenfree(item.estadoActividad)"
              :disabled="glutenfree(item.estadoActividad)"
            ></v-simple-checkbox>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
    <!---- FIN de V-DIALOG -DATA-TABLE para CRONOGRAMAS ----------- -->
    <!-- -- INICIO V-DIALOG PDF------------------------------------ -->
    <v-dialog v-model="pdfGenerado" width="900" persistent>
      <v-toolbar color="secondary" dark text>
        <span class="title">Ficha de proyecto</span>
        <v-spacer></v-spacer>
        <v-btn class="mx-2" fab dark small color="primary" @click="pdfGenerado = false">
          <v-icon dark>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card style="height: 80vh">
        <v-card-text class="pa-0" style="height: 100%">
          <iframe :src="documentoPdf" width="100%"  height="100%" type="application/pdf"></iframe>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CrudTable from '@/plugins/crud-table/CrudTable.vue';
import actions from '@/plugins/crud-table/mixins/crud-table';

export default {
  mixins: [actions],
  data: () => ({
    valid: false,
    listaComunidades: [],
    idComunidad: null,
    idCategoria: null,
    listaEmpresas: [],
    itemsProyecto: [],
    items: [],
    listaPoas: [],
    listaCategorias: [],
    listaCronogramas: [],
    abrirDialogo: false,
    abrirDialogoCronogramas: false,
    abrirDialogoAgregarCronogramas: false,
    estadoActividad: ['PENDIENTE', 'DESARROLLO', 'CONCLUIDO'],
    listaProyectos: [],
    // prueba Domingo

    // fin prueba
    rules: {
      nombre: [
        val => (val || '').length > 0 || 'El campo nombre no puede estar vacío'
      ],
      descripcion: [
        val => (val || '').length > 0 || 'El campo descripción no puede estar vacío'
      ],
      idComunidad: [
        val => (val || '') || 'Seleccione una comunidad'
      ],
      categoria: [
        val => (val || '') || 'Selecciones una categoria'
      ],
      poa: [
        val => (val || '') || 'Seleccione el poa'
      ],
      empresa: [
        val => (val || '') || 'Seleccione una empresa'
      ],
      fechaInicio: [
        val => (val || '').length > 0 || 'El campo de la fecha inicio no puede estar vacío'
      ],
      fechaFinal: [
        val => (val || '').length > 0 || 'El campo de la fecha final no puede estar vacío'
      ]
    },
    url: 'proyectos',
    urlCronogramas: '',
    order: ['createdAt', 'DESC'],
    headers: [
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'ACTIONS', class: 'teal darken-4 white--text' },
      { text: 'Nombre', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Comunidad', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Poa', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Empresa', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Categoria', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Fecha Inicio', value: 'fechaInicio', class: 'teal darken-4 white--text' },
      { text: 'Fecha Final', value: 'fechaFinal', class: 'teal darken-4 white--text' },
      { text: 'Estado', value: 'estado', class: 'teal darken-4 white--text' },
    ],
    headersCronogramas: [
      { text: '', value: 'glutenfree', class: 'teal darken-4 white--text' },
      { text: 'Nombre', value: 'nombre', class: 'teal darken-4 white--text' },
      { text: 'Actividad', value: 'actividad', class: 'teal darken-4 white--text' },
      { text: 'Fecha Inicio', value: 'fecIniCronograma', class: 'teal darken-4 white--text' },
      { text: 'Fecha Final', value: 'fecFinCronograma', class: 'teal darken-4 white--text' },
      { text: 'Estado de Actividad', value: 'estadoActividad', class: 'teal darken-4 white--text' },
      { text: 'Observación', value: 'observacion', class: 'teal darken-4 white--text' },
      { text: 'Acciones', divider: false, sortable: false, align: 'center', value: 'actions', class: 'teal darken-4 white--text' },
    ],
    form: {
      id: '',
      nombre: '',
      descripcion: '',
      idComunidad: '',
      idPoa: '',
      idEmpresa: '',
      idCategoria: '',
      // idCronograma: '',
      fechaInicio: '',
      fechaFinal: ''

    },
    formCronogramas: {
      id: '',
      idProyecto: '',
      nombre: '',
      actividad: '',
      fecIniCronograma: '',
      fecFinCronograma: '',
      estadoActividad: '',
      observacion: ''
    },
    filters: [
      {
        field: 'nombre',
        label: 'Nombre del Proyecto',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'fechaInicio',
        label: 'Desde',
        type: 'text',
        typeG: 'String'
      },
      {
        field: 'fechaFinal',
        label: 'Hasta',
        type: 'text',
        typeG: 'String'
      }
    ],
    date: null,
    dateFinal: null,
    pdfGenerado: false,
    documentoPdf: null,
    dateFiltroInicio: null,
    dateFiltroFinal: null,
    filtroComunidadesValue: null,
  }),
  methods: {
    reset () {
      this.form = {
        id: '',
        nombre: '',
        descripcion: '',
        idComunidad: '',
        idPoa: '',
        idEmpresa: '',
        idCategoria: '',
        // idCronograma: '',
        fechaInicio: '',
        fechaFinal: ''
      };
    },
    // Metodo para CRONOGRAMAS DOMINGO
    getColor (estadoActividad) {
      if (estadoActividad === 'PENDIENTE') return 'red';
      else if (estadoActividad === 'DESARROLLO') return 'orange';
      else return 'green';
    },
    glutenfree (estadoActividad) {
      console.log('--glu--', estadoActividad);
      if (estadoActividad === 'PENDIENTE') return false;
      else if (estadoActividad === 'DESARROLLO') return false;
      else return true;
    },
    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close () {
      this.abrirDialogoAgregarCronogramas = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete () {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },
    // FIN DOMINGO
    async verCronogramas(proyecto) {
      this.abrirDialogoCronogramas = true;
      const respuestaCronogramas = await this.$service.get(`cronogramas?idProyecto=${proyecto.id}`);
      this.listaCronogramas = respuestaCronogramas.rows;
    },
    async verFicha(proyecto) {
      console.log('Cronogra en desarrollo');
      const pdf = await this.$service.post(`proyectos/reporte/${proyecto.id}`);
      const contentType = 'application/pdf';
      const blob = this.b64toBlob(pdf, contentType);
      this.documentoPdf = URL.createObjectURL(blob);
      this.pdfGenerado = true;
    },
    itemDelete ({ items }) {
      console.log('--items---', items);
      const message = '¿Está seguro de eliminar este registro?';
      this.$confirm(message, async () => {
        try {
          await this.$service.delete(`proyectos/${items.id}`);
          await this.updateList();
          this.$message.success('Registro eliminado satisfactoriamente');
        } catch (err) {
          this.$message.error(err.message);
        }
      }, () => {});
    },
    // Metodo para eliminar Cronogramas Tito
    itemDeleteCronogramas ({ items }) {
      console.log('--items---', items);
      const message = '¿Está seguro de eliminar este registro?';
      this.$confirm(message, async () => {
        try {
          await this.$service.delete(`cronogramas/${items.id}`);
          await this.updateList();
          this.$message.success('Registro eliminado satisfactoriamente');
        } catch (err) {
          this.$message.error(err.message);
        }
      }, () => {});
    },
    closeModal () {
      this.abrirDialogo = false;
      this.abrirDialogoCronogramas = false;
      this.abrirDialogoAgregarCronogramas = false;
      this.reset();
    },
    closeModalC () {
      this.abrirDialogoAgregarCronogramas = false;
      this.reset();
    },
    async openModal ({ items }) {
      console.log('--itemsProy--', items);
      if (items && items.id) {
        this.$nextTick(() => {
          this.form = items;
        });
      } else {
        this.reset();
      }
      this.abrirDialogo = true;
      const respuestaComunidades = await this.$service.get('comunidades');
      this.listaComunidades = respuestaComunidades.rows;
      const respuestaEmpresas = await this.$service.get('empresas');
      this.listaEmpresas = respuestaEmpresas.rows;
      const respuestaPoas = await this.$service.get('poas');
      this.listaPoas = respuestaPoas.rows;
      const respuestaCategorias = await this.$service.get('categorias');
      this.listaCategorias = respuestaCategorias.rows;
      console.log('---->', this.abrirDialogo);
    },
    async openModalCronogramas ({ items }) {
      console.log('--items--', items);
      if (items && items) {
        this.$nextTick(() => {
          this.form = items;
        });
      } else {
        this.reset();
      }
      this.abrirDialogoAgregarCronogramas = true;
      console.log('Cronogra en desarrollo');
      // const respuestaCronogramas = await this.$service.get(`cronogramas?idProyecto=${proyecto.id}`);
      // this.listaCronogramas = respuestaCronogramas.rows;
    },
    /**
     * @function save
     * @description Esta funcion esta creada para guardar en la BD
     */
    async save () {
      if (this.$refs.form.validate()) {
        const data = { ...({}, this.form) };
        console.log('------>', data);
        delete data.id_comunidad;
        delete data.id_empresa;
        delete data.id_poa;
        delete data.id_categoria;
        if (data.id) {
          const response = await this.$service.put(`proyectos/${data.id}`, data);
          if (response) {
            this.abrirDialogo = false;
            await this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          const response = await this.$service.post('proyectos', data);
          console.log('response', response);
          if (response) {
            this.abrirDialogo = false;
            await this.updateList();
            this.$message.success('El registro fue agregado correctamente');
          }
        }
      } else {
        this.$message.error('Faltan campos por llenar');
      }
    },
    // Metodo saveCronogramas para guardar Cronogramas
    /**
     * @function save
     * @description Esta funcion esta creada para guardar en la BD
     */
    async saveCronogramas () {
      if (this.$refs.formCronogramas.validate()) {
        const data = { ...({}, this.formCronogramas) };
        if (data.id) {
          const response = await this.$service.put(`cronogramas/${data.id}`, data);
          if (response) {
            this.abrirDialogoAgregarCronogramas = false;
            this.$store.commit('closeModal');
            await this.updateList();
            this.$message.success('Se actualizó el registro correctamente');
          }
        } else {
          const response = await this.$service.post('cronogramas', data);
          if (response) {
            this.abrirDialogoAgregarCronogramas = false;
            this.$store.commit('closeModal');
            await this.updateList();
            this.$message.success('El registro fue agregado correctamente');
          }
        }
      } else {
        this.$message.error('Faltan campos por llenar');
      }
    },
    // Metodo para filtrar por comunidades
    async actualizarFiltro () {
      console.log('----', this.idComunidad);
      const respuestaComunidades = await this.$service.get(`proyectos?idComunidad=${this.idComunidad}`);
      console.log('---->', respuestaComunidades);
      // this.items = respuestaComunidades.rows;
      const items = respuestaComunidades.rows;
      console.log('---tito---', items);
    },
    // Metodo para filtrar por categorias
    async actualizarFiltroCategoria () {
      console.log('----IdCat--', this.idCategoria);
      const respuestaCategorias = await this.$service.get(`proyectos?idCategoria=${this.idCategoria}`);
      console.log('---->', respuestaCategorias);
      // this.items = respuestaComunidades.rows;
      const items = respuestaCategorias.rows;
      console.log('---titoCat---', items);
      // this.getData(items);
    },
    // async getData () {
    // console.log('----', this.idComunidad);
    // const respuestaComunidades = await this.$service.get('proyectos');
    // console.log('---->', respuestaComunidades);
    // this.itemsProyecto = respuestaComunidades.rows;
    // this.items = [];
    // console.log('---itemsproyecto....', this.itemsProyecto);
    // },
  },
  async mounted () {
    this.$nextTick(() => {
      // this.getData();
    });
    const respuestaComunidades = await this.$service.get('comunidades');
    this.listaComunidades = respuestaComunidades.rows;
    const respuestaCategorias = await this.$service.get('categorias');
    this.listaCategorias = respuestaCategorias.rows;
    const respuestaProyectos = await this.$service.get('proyectos');
    this.listaProyectos = respuestaProyectos.rows;
  },
  // Computed agregado para Cronogramas
  components: {
    CrudTable
  }
};
</script>

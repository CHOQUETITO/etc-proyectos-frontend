<v-dialog
      persistent
      v-model="abrirDialogoCronogramas"
      width="900"
      >
    <v-card>
      <v-card-title class="ma-0 pa-1">
        <v-container fluid>
          <v-row no-gutters>
            <v-col
              align="start"
              justify="center"
              :cols="11">
              <v-icon>{{ form.id ? 'assignment' : 'assignment' }}</v-icon>
              {{ form.id ? 'Editar Cronograma' : 'Adicionar Cronograma' }}
            </v-col>
            <v-col :cols="1">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon color="gray" v-on="on" @click.stop="closeModalCronogramas">
                    <v-icon>close</v-icon>
                  </v-btn>
                </template>
                <span>Cerrar ventana</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <v-container>
        <crud-table
    :headers="headersCronogramas"
    :url="urlCronogramas"
    :filters="filters"
    :widthModal="900"
    :order="order"
    :custom="true"
    >
      <template slot="buttons">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
              @click.native.stop="openModalCronogramas"
              slot="activator"
            ><v-icon dark>calendar_today</v-icon> Agregar </v-btn>
          </template>
            <span> Agregar Cronograma </span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA LAS ACCIONES DEL CRUD TABLE  -->
      <template slot="actions" slot-scope="item">
        <v-tooltip bottom color="success">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="openModalCronogramas(item)">
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
      </template>
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr v-for="item in items" :key="item.id">
          <td>
            <v-tooltip bottom color="success">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.stop="openModalCronogramas(Object.assign({}, items))">
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
          </td>
          <td>{{ item.proyecto.nombre }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.actividad }}</td>
          <td>{{ item.fecIniCronograma }}</td>
          <td>{{ item.fecFinCronograma }}</td>
          <td>
            <v-btn outlined :color="item.estadoActividad === 'PENDIENTE' ? 'error' : 'success'">{{ item.estadoActividad}}</v-btn>
          </td>
          <td>{{ item.observacion }}</td>
          <td>
            <v-btn outlined :color="item.estado === 'ACTIVO' ? 'info' : 'default'">{{ item.estado}}</v-btn>
          </td>
        </tr>
      </template>
    </crud-table>
      </v-container>
    </v-card>
</v-dialog>



 <!------------ Inicio del Crud Table CRONOGRAMAS ------->
    <crud-table
    v-model="abrirDialogoCronogramas"
    :headers="headersCronogramas"
    :url="urlCronogramas"
    :filters="filters"
    :widthModal="900"
    :order="order"
    :custom="true"
    >
      <template slot="buttons">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
              @click.native.stop="openModalCronogramas"
              slot="activator"
            ><v-icon dark>calendar_today</v-icon> Agregar </v-btn>
          </template>
            <span> Agregar Cronograma </span>
        </v-tooltip>
      </template>
      <!-- SLOT PARA LAS ACCIONES DEL CRUD TABLE  -->
      <template slot="actions" slot-scope="item">
        <v-tooltip bottom color="success">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="openModalCronogramas(item)">
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
      </template>
      <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
      <template slot="items" slot-scope="items">
        <tr v-for="item in items" :key="item.id">
          <td>
            <v-tooltip bottom color="success">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click.stop="openModalCronogramas(Object.assign({}, items))">
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
          </td>
          <td>{{ item.proyecto.nombre }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.actividad }}</td>
          <td>{{ item.fecIniCronograma }}</td>
          <td>{{ item.fecFinCronograma }}</td>
          <td>
            <v-btn outlined :color="item.estadoActividad === 'PENDIENTE' ? 'error' : 'success'">{{ item.estadoActividad}}</v-btn>
          </td>
          <td>{{ item.observacion }}</td>
          <td>
            <v-btn outlined :color="item.estado === 'ACTIVO' ? 'info' : 'default'">{{ item.estado}}</v-btn>
          </td>
        </tr>
      </template>
    </crud-table>
    <!-------------- Fin del Crud Table CRONOGRAMAS----------->

    <!--
    <v-dialog
      persistent
      v-model="abrirDialogoCronogramas"
      width="900"
      >
      <!-- v-data-table INICIO--------------------------------------->
        <!-- <v-data-table
            :headers="headersCronogramas"
            :items="listaCronogramas"
            :items-per-page="5"
            class="elevation-1"
            :filters="filters"
            :widthModal="900"
            :order="order"
            :custom="true"
            >
            <!-- SLOT PARA LAS ACCIONES DEL DATA TABLE  -->
           <!-- <template slot="actions" slot-scope="item">
              <v-tooltip bottom color="success">
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="openModalCronogramas(item)">
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
            </template>
            <template slot="buttons">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    dark
                    v-on="on"
                    @click.native.stop="openModalCronogramas"
                    slot="activator"
                  ><v-icon dark>calendar_today</v-icon> Agregar </v-btn>
                </template>
                  <span> Agregar Cronograma </span>
              </v-tooltip>
            </template>
            <!-- SLOT PARA TODOS LOS ITEMS (Solo en caso de que se quiera personalizar cada columna o mas de 1 columna) -->
            <!-- <template slot="items" slot-scope="items">
              <tr v-for="item in items" :key="item.id">
                <td>
                  <v-tooltip bottom color="success">
                    <template v-slot:activator="{ on }">
                      <v-btn icon v-on="on" @click.stop="openModalCronogramas(Object.assign({}, items))">
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
                </td>
                <td>{{ item.proyecto.nombre }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.actividad }}</td>
                <td>{{ item.fecIniCronograma }}</td>
                <td>{{ item.fecFinCronograma }}</td>
                <td>
                  <v-btn outlined :color="item.estadoActividad === 'PENDIENTE' ? 'error' : 'success'">{{ item.estadoActividad}}</v-btn>
                </td>
                <td>{{ item.observacion }}</td>
                <td>
                  <v-btn outlined :color="item.estado === 'ACTIVO' ? 'info' : 'default'">{{ item.estado}}</v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
      <v-card>
        <v-card-title class="ma-0 pa-1">
          <v-container fluid>
            <v-row no-gutters>
              <v-col
                align="start"
                justify="center"
                :cols="11">
                <v-icon>{{ form.id ? 'assignment' : 'assignment' }}</v-icon>
                {{ form.id ? 'Cronograma de Actividades' : 'Cronograma de Actividades' }}
              </v-col>
              <v-col :cols="1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn icon color="gray" v-on="on" @click.stop="closeModalCronogramas">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </template>
                  <span>Cerrar ventana</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <v-container>
        </v-container>
      </v-card>
    </v-dialog>
    -->

    {{items.proyecto.nombre}}
    <v-simple-checkbox
              class="teal darken-1"
              :v-model="glutenfree(item.estadoActividad)"
              :value="glutenfree(item.estadoActividad)"
              :disabled="glutenfree(item.estadoActividad)"
            ></v-simple-checkbox>
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
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
<!-- &&&&&&&&&&&&&&&&&&&&& con V-CARD-TEXT  &&&&&&&&&&&&&&&&&&& -->
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
                <v-card @submit.prevent="saveCronogramas">
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
                  <v-card-text>
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
                  </v-card-text>
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
<!-- %%%%%%%%%%%%cambiando ususarios-->
        
        numeroDocumento: '',
        complemento: '',
        complementoVisible: false,
        fechaNacimiento: '',
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        apellidoCasada: '',
        id_pais_origen: null,
        parIdEstadoCivil: 1,
        parIdTipoDocumento: 1,
        parIdTipoPersona: 1,
        genero: 'MASCULINO',
        nombre_completo: '',
        telefono: '',
        celular: '',
        correoElectronico: '',

<!-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&6-->

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
                :rules="rules.numeroDocumento"
                v-model="formUsuario.persona.numeroDocumento"
                prepend-icon="account_circle"
                label="Número de documento"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
                :rules="rules.nombres"
                v-model="formUsuario.persona.nombres"
                prepend-icon="account_circle"
                label="Nombres"
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
                label="Primer apellido"
                required
                dense
                v-model="formUsuario.persona.primerApellido"
                :rules="rules.primerApellido"
                prepend-icon="account_circle"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
                label="Segundo apellido"
                v-model="formUsuario.persona.segundoApellido"
                :rules="rules.segundoApellido"
                prepend-icon="account_circle"
                clearable
              ></v-text-field>
            </v-col>
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
                    v-model="formUsuario.persona.fechaNacimiento"
                    label="Fecha de nacimiento"
                    prepend-icon="event"
                    readonly
                    :rules="rules.fechaNacimiento"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formUsuario.persona.fechaNacimiento"
                  @input="date = false"
                  :first-day-of-week="0"
                  locale="es-EN"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
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
                v-model="formUsuario.persona.correoElectronico"
                :rules="rules.email"
                prepend-icon="contact_mail"
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
                label="Teléfono"
                dense
                v-model="formUsuario.persona.telefono"
                prepend-icon="contact_phone"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
<!-- rRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRrrr-->
Inicio del Proyecto:{{proyectoActual.fechaInicio}}
                Entrega del Proyecto:{{proyectoActual.fechaFinal}}

<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
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
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->




<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%DASH%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
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
              prepend-icon="category"
              item-text="nombre"
              item-value="id"
              :items="listaCategorias"
              label="Categoria"
            ></v-select>
          </v-col>
        </v-row>
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%FIND%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
<!-- %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% -->
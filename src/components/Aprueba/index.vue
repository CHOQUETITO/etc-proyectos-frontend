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
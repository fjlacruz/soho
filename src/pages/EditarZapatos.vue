<template>
  <div>
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Editar</q-card-section>
          <q-form id="editarZapato" @submit.prevent="editar">
          <input type="hidden" name="id" :value="$route.params.id" />
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.descripcion"
                  name="descripcion"
                  id="descripcion"
                  filled
                  hint="Descripcion"
                  dense="dense"
                  :value="formEditar.descripcion"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.marca"
                  name="marca"
                  id="marca"
                  filled
                  hint="Marca"
                  dense="dense"
                  :value="formEditar.marca"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.color"
                  name="color"
                  id="color"
                  filled
                  hint="Color"
                  dense="dense"
                  :value="formEditar.color"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>

              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="formEditar.stock"
                  name="stock"
                  id="stock"
                  filled
                  hint="Stock"
                  dense="dense"
                  :value="formEditar.stock"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              &nbsp;
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Editar" type="submit" color="primary" />&nbsp;
                 <q-btn icon-right="cancel" label="Eliminar" type="submit" color="red" @click="eliminar(formEditar.id)"/>&nbsp;
                <q-btn icon-right="chevron_left" label="regtresar" type="submit" color="orange" to="/"/>
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </div>
    </div>
 <div class="q-pa-md q-gutter-sm">

  </div>
  </div>
</template>

<script>
import sesion from "../mixins/sesion.js";
import axios from "axios";
import env from '../config/env.js' 

export default {
  name: "editar",
  data() {
    return {
      formEditar: {},
      id:''
    };
  },
  computed: {
    token() {
      return JSON.parse(this.$q.localStorage.getItem("token"));
    }
  },
  methods: {
    getId() {
      const id = this.$route.params.id;
      axios
        .get(`${env.endpoint}/zapatos/` + id)
        .then(res => {
          this.formEditar = res.data.response;
          //console.log(this.formEditar)
        });
    },
    editar() {
      const id = this.$route.params.id;
      const form = document.getElementById("editarZapato");
      axios
        .post(
          `${env.endpoint}/zapatos/`+ id, new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data;
          console.log(this.respuesta); 
          if (res.data.response == "success") {
            this.$q.notify({
              message: "Zapato editado",
              color: "teal-6",
              icon: "check",
              position: "bottom-right"
            });
            this.$router.push("/");
          } else {
            this.$q.notify({
              message: "No se han detectado cambios",
              color: "red-5",
              icon: "warning",
              position: "bottom-right"
            });
          }
        });
    },
    eliminar(id) {
      axios
        .get(
          `${env.endpoint}/zapatos/delete/`+ id
        )
        .then(res => {
          this.$q.notify({
            message: "Dato Eliminado",
            color: "red-5",
            icon: "warning",
            position: "bottom-right"
          });
          this.$router.push("/");
        });
    },
  },
  created() {
    this.getId();
  },
  mixins: [sesion]
};
</script>

<template>
  <div>
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section >Registrar</q-card-section>
          <q-form id="editarZapato" @submit.prevent="registrar">
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="descripcion"
                  name="descripcion"
                  id="descripcion"
                  filled
                  hint="Descripcion"
                  dense="dense"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="marca"
                  name="marca"
                  id="marca"
                  filled
                  hint="Marca"
                  dense="dense"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="color"
                  name="color"
                  id="color"
                  filled
                  hint="Color"
                  dense="dense"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>

              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="stock"
                  name="stock"
                  id="stock"
                  filled
                  hint="Stock"
                  dense="dense"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              &nbsp;
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Registrar" type="submit" color="primary" />&nbsp;
                <q-btn icon-right="chevron_left" label="regresar" type="submit" color="orange" to="/"/>
              </div>
            </q-card-section>
          </q-form>
        </q-card>
      </div>
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
      descripcion:'',
      marca:'',
      color:'',
      stock:''
    };
  },
  computed: {
    token() {
      return JSON.parse(this.$q.localStorage.getItem("token"));
    }
  },
  methods: {
   
    registrar() {
    
      const form = document.getElementById("editarZapato");
      axios
        .post(
          `${env.endpoint}/zapatos/`, new FormData(form)
        )
        .then(res => {
          this.respuesta = res.data;
          console.log(this.respuesta); 
          if (res.data.response == "success") {
            this.$q.notify({
              message: "Registro Exitoso",
              color: "teal-6",
              icon: "warning",
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
    }
  },
  created() {
 
  },
  mixins: [sesion]
};
</script>

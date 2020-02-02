<template>
  <div>
    <input type="hidden" name="id" :value="$route.params.id" />
    <div class="q-pa-lg"></div>
    <div class="row justify-center">
      <div class="col-12 col-md-8 q-pa-xs">
        <q-card class="my-card">
          <q-card-section>Cambiar Clave </q-card-section>
          <q-form id="editarUsuario" @submit.prevent="editar">
            <q-separator inset />
            <q-card-section>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="nuevaClave"
                  name="nuevaClave"
                  id="nuevaClave"
                  maxlength="15"
                  type="password"
                  filled
                  hint="Nueva Calve"
                  dense="dense"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 &&  val.length > 3 || 'Campo Obligatorio', 'Minimo 8 Caracteres']"
                />
              </div>
              <div class="col-12 col-xs-12 q-pa-xs">
                <q-input
                  v-model="confirmarClave"
                  name="confirmarClave"
                  id="confirmarClave"
                  type="password"
                  filled
                  hint="Confirmar Clave"
                  dense="dense"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Campo Obligatorio']"
                />
              </div>
              <q-separator inset />&nbsp;
              <div class="col-6 col-xs-6 q-pa-xs">
                <q-btn icon-right="send" label="Cambiar Calve" type="submit" color="primary" />&nbsp;
                <q-btn icon-right="chevron_left" label="regresar" type="submit" color="orange" to="/" />
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
      formEditar: {},
      nuevaClave: "",
      confirmarClave: "",
      id:''
    };
  },

  methods: {
    getUser() {
      const token = JSON.parse(this.$q.localStorage.getItem("token"));
      axios
        .get(
          `${env.endpoint}/usuarios?token=` + token
        )
        .then(res => {
          this.id = res.data.response[0].id;
          this.nombres = res.data.response[0].nombres;
          this.clave = res.data.response[0].clave;
        });
    },
    editar() {
      if (this.nuevaClave == this.confirmarClave) {
        const form = document.getElementById("editarUsuario");
        axios
          .post(
            `${env.endpoint}/cambiar-clave/` + this.id, new FormData(form))
          .then(res => {
            this.respuesta = res.data;
            if (res.data.response == "success") {
              this.$q.notify({
                message: "Su clave de Acceso ha sido Modificada",
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
      } else {
        this.$q.notify({
          message: "Las Claves no coinciden",
          color: "red-5",
          icon: "warning",
          position: "bottom-right"
        });
        this.nuevaClave = "";
        this.confirmarClave = "";
      }
    }
  },
  created() {
    this.getUser();
  },
  mixins: [sesion]
};
</script>

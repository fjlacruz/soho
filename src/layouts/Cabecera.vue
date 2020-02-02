<template>
   <q-layout view="lHh Lpr lFf">
      <q-header elevated class="bg-primary text-white">
         <q-toolbar>
            <q-toolbar-title>Zapatos</q-toolbar-title>
            <div v-if="token">
               <q-btn-dropdown flat style="color: primary" :label="nombres">
                  <q-list>
                     <q-item clickable v-close-popup :to="'/cambiarClave/'+ id">
                        <q-item-section>
                           <q-item-label>Cambiar Clave</q-item-label>
                        </q-item-section>
                     </q-item>
                     <q-item clickable v-close-popup @click="salir">
                        <q-item-section>
                           <q-item-label>Salir</q-item-label>
                        </q-item-section>
                     </q-item>
                  </q-list>
               </q-btn-dropdown>
            </div>
            <div v-else>
               <q-btn flat style="color: primary" label="Login" to="/login"/>
            </div>
         </q-toolbar>
      </q-header>
      <q-page-container>
         <router-view />
      </q-page-container>
      <q-footer elevated class="bg-grey-8 text-white">
         <q-toolbar>
            <q-toolbar-title class="text-center text-weight-thin text-subtitle2" >
               @Francisco Javier La Cruz
            </q-toolbar-title>
         </q-toolbar>
      </q-footer>
   </q-layout>
</template>

<script>
import sesion from "../mixins/sesion.js";
import axios from "axios";
import env from '../config/env.js';
export default {
	name: 'inicio',
	data() {
		return {
			token: '',
			nombres: '',
			id: ''
		}
	},
	created() {
		this.getUser();
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
					this.token = res.data.response[0].token;
				});
		},
		salir() {
			const token = JSON.parse(this.$q.localStorage.getItem("token"));

			axios
				.post(`${env.endpoint}/logout?token=` + token)
				.then(res => {
					console.log(token);
					console.log(res.data.res);
					if (res.data.res == "success") {
						this.$q.localStorage.remove("token");
						this.$router.push("/login");
					}
				});
		}
	}
}
</script>

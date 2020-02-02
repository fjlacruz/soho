<template>
   <q-layout view="hHh lpR fFf">
      <q-page-container>
         <div class="row justify-center">
            <div class="col-12 col-md-6 q-pa-xs">
               <div class="q-pa-md text-weight-bold">Listado de Zapatos </div>
               <table class="q-table" id="mitabla">
                  <thead>
                     <tr>
                        <th class="text-left">Descripcion</th>
                        <th class="text-left">Marca</th>
                        <th class="text-left">Color</th>
                        <th class="text-left">Stock</th>
                        <th class="text-left" v-if="token"></th>
                     </tr>
                  </thead>
                  <tbody v-for="item in listar" :key="item.id">
                     <tr>
                        <td class="text-left">{{ item.descripcion}}</td>
                        <td class="text-left">{{ item.marca}}</td>
                        <td class="text-left">{{ item.color}}</td>
                        <td class="text-left">{{ item.stock}}</td>
                        <td class="text-left" v-if="token">
                           <q-btn
                              round
                              color="primary"
                              icon="edit"
                              size="xs"
                              :to="'/editarZapatos/'+item.id"
                              href="#"
                              />
                           <q-tooltip>Editar</q-tooltip>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
         <q-page-sticky position="bottom-right" :offset="[18, 58]" v-if="token">
            <q-btn fab icon="add" color="primary" to="/agregar" />
            <q-tooltip>Agregar</q-tooltip>
         </q-page-sticky>
      </q-page-container>
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
			id: '',
			listar: []
		}
	},
	created() {
		this.zapatosList();
		this.getUser();
	},
	methods: {
		zapatosList() {
			axios
				.get(`${env.endpoint}/zapatos`)
				.then(res => {
					this.listar = res.data.response;
					//console.log(this.listar);

				});
		},
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
					//console.log(this.token)
				});
		},
	}
} 
</script>

<style>
table#mitabla {
    border-collapse: collapse;
    border: 1px solid #CCC;
    font-size: 12px;
}
 
table#mitabla th {
    font-weight: bold;
    background-color: #E1E1E1;
    padding:5px;
}
 
table#mitabla tbody tr:hover td {
    background-color: #F3F3F3;
}
 
table#mitabla td {
    padding: 5px 10px;
}
</style>



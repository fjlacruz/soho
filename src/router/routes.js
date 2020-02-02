const routes = [

 
    {
        path: '/',
        component: () =>
            import ('layouts/Cabecera.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/Inicio')
        }]
    },
   {
        path: '/login',
        component: () =>
            import ('pages/Login')
    },
 
    {
        path: '/editarZapatos/:id',
        component: () =>
            import ('layouts/Cabecera.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/EditarZapatos')
        }]
    },
    {
        path: '/cambiarClave/:id_usuario',
        component: () =>
            import ('layouts/Cabecera.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/CambiarClave')
        }]
    },
    {
        path: '/agregar',
        component: () =>
            import ('layouts/Cabecera.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/Agregar')
        }]
    },

]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    })
}

export default routes

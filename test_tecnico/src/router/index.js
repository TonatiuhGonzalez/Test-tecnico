import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ToDo from '@/views/ToDo.vue'
import Timer from '@/views/Timer.vue'
import GitProfile from '@/views/GitProfile.vue'


Vue.use(VueRouter)

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: '/Login', name: 'Login', component: Login },
    { path: '/ToDo', name: 'ToDo', component: ToDo, meta:{ requiresAuth: true}},
    { path: '/Timer', name: 'Timer', component: Timer, meta:{ requiresAuth: true} },
    { path: '/GitProfile', name: 'GitProfile', component: GitProfile, meta:{ requiresAuth: true} },
]

const router = new VueRouter({
    routes
})

export default router;
<template>
    <div class="Home">
        <div class="container has-text-centered">
            <div class="columns is-centered">
                <div class="column is-6">
                    <b-carousel>
                        <b-carousel-item v-for="(carousel, i) in 3" :key="i">
                            <section :class="`hero is-medium`">
                                <div class="hero-body">
                                    <b-image class="image is-fullwidth is-fullheight" :src="getImage(i)"></b-image>
                                </div>
                            </section>
                        </b-carousel-item>
                    </b-carousel>
                </div>
                <div
                    class="column is-6 has-text-centered is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
                    <h1 class="title">Bienvenido</h1>
                    <h2 class="subtitle" v-if="!isLoggedIn">Para comenzar, inicie sesión</h2>
                    <h2 class="subtitle" v-else>Seleccione la herramienta que quiere usar pulsando sobre las opciones del menú superior</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueCookies from 'vue-cookies'
export default {
    name: 'Home',
    data(){
        return{
          isLoggedIn: VueCookies.get('loggedIn') === 'true'
        };
      },
    methods: {
        getImage(value) {
            return `./src/components/${value}.png`
        }
    }
}
</script>
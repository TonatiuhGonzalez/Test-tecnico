<template>
  <div class="hero is-fullheight is-primary is-bold">
    <b-navbar centered>
        <template #brand>
            <b-navbar-item @click="goToHome">
                <img src="@/components/hmh.png">
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item class ="is-size-4 mr-4" @click="goToToDo">Lista de pendientes</b-navbar-item>
            <b-navbar-item class ="is-size-4 mr-4" @click="goToTimer">Temporizador</b-navbar-item>
            <b-navbar-item class ="is-size-4 mr-4" @click="goToGitProfile">Perfil de Git</b-navbar-item>
        </template>
        <template #end>
            <div class="buttons">
              <b-button v-if="isLoggedIn" type="is-link is-light" @click="logout">Log Out</b-button>
              <b-button v-if="!isLoggedIn" type="is-info" @click="goToLogin">Log In</b-button>
            </div>
        </template>      
    </b-navbar>
    <div class="column">
      <router-view></router-view>
    </div>
  </div>  
</template>

<script>
  import { defineComponent } from 'vue'
  import VueCookies from 'vue-cookies';
  import router from './router';
    export default defineComponent({
      name:'App',
      data(){
        return{
          isLoggedIn: VueCookies.get('loggedIn') === 'true'
        };
      },
      methods:{
        goToHome(){
          this.$router.push('/')
        },
        goToToDo(){
          this.$router.push('/ToDo')
        },
        goToTimer(){
          this.$router.push('/Timer')
        },
        goToGitProfile(){
          this.$router.push('/GitProfile')
        },
        goToLogin(){
          this.$router.push('/Login')
        },
        logout(){
          VueCookies.remove('loggedIn');
          this.isLoggedIn = false;
          router.push('/');
        },
        goTable(){
          this.$router.push('/Table')
        }
      }
    });
  router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (VueCookies.get('loggedIn') === 'true') {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});
</script>
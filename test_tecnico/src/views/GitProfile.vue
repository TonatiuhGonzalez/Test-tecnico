<template>
  <div class="GitProfile">
    <div class="container has-text-centered">
      <p class="title mb-4">Perfil de Git</p>
    </div>

    <div class="container">
      <div class="columns is-centered">
        <div class="column is-6 is-offset-4">
          <b-field>
            <b-input class="is-full" v-model="username" placeholder="Nombre de usuario de GitHub"
              @keyup.enter="buscarUsuario" rounded></b-input>
          </b-field>
        </div>
        <div class="column is-6">
          <b-field>
            <b-button @click="buscarUsuario" rounded>Buscar</b-button>
          </b-field>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-fifths">
          <div v-if="usuario">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th colspan="2" class="has-text-centered">
                    Perfil de GitHub
                  </th>
                </tr>
                <tr>
                  <th colspan="2" class="has-text-centered">
                    {{ usuario.login }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="has-text-centered">
                      <b-image :src="usuario.avatar_url" :alt="usuario.login" rounded
                        class="is-128x128 centered-image"></b-image>
                    </div>
                  </td>
                  <td class="is-vcentered has-text-centered" v-if="usuario.bio">
                    {{ usuario.bio }}
                  </td>
                  <td class="is-vcentered has-text-centered" v-else>
                    Sin bio
                  </td>
                </tr>
                <tr>
                  <td class="custom-width">Nombre:</td>
                  <td class="has-text-centered" v-if="usuario.name">{{ usuario.name }}</td>
                  <td class="has-text-centered" v-else>Sin nombre de usuario</td>
                </tr>
                <tr>
                  <td class="custom-width">URL del perfil:</td>
                  <td class="has-text-centered">{{ usuario.html_url }}</td>
                </tr>
                <tr>
                  <td class="custom-width">Seguidores:</td>
                  <td class="has-text-centered">{{ usuario.followers }}</td>
                </tr>
                <tr>
                  <td class="custom-width">Repositorios públicos:</td>
                  <td class="has-text-centered">{{ usuario.public_repos }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="container has-text-centered">
            <div class="columns is-centered">
              <div class="column is-full">
                <p>Introduzca el usuario de git que quiere consultar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <div class="column is-full" style="width: 60%; height: 60%;">
              <b-image src="src/components/404.png" class="centered-image" alt=""></b-image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'GitProfile',
  data() {
    return {
      username: '',
      usuario: null,
      error: null
    };
  },
  methods: {
    buscarUsuario() {
      this.error = null;
      this.usuario = null;

      fetch(`https://api.github.com/users/${this.username}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Usuario no encontrado');
          }
        })
        .then(data => {
          this.usuario = data;
        })
        .catch(error => {
          this.error = error.message;
        });
    }
  }
};
</script>
<style>
.custom-width {
  width: 25%;
}

.custom-align {
  text-align: center;
}

.centered-image {
  display: block;
  margin: 0 auto;
  /* Centrar horizontalmente */
}
</style>
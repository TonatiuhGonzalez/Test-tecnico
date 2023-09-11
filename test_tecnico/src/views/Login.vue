<template>
    <section>
        <div>
            <div class="container has-text-centered">
                <div class="columns is-centered">
                    <div class="column is-full">
                        <p> Por favor, inicie sesión para poder usar las herramientas del sistema.</p>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <form @submit.prevent="login" class="box">
                            <b-field label="Usuario">
                                <b-input type="text" v-model="formData.username" required></b-input>
                            </b-field>

                            <b-field label="Contraseña">
                                <b-input type="password" v-model="formData.password" required password-reveal></b-input>
                            </b-field>

                            <div class="field">
                                <button type="submit" class="button is-success">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import md5 from 'crypto-js/md5';
import VueCookies from 'vue-cookies';
export default {
    name: 'Login',
    data() {
        return {
            formData: {
                username: '',
                password: ''
            },
            loginSuccess: false,
            loginError: false
        };
    },
    methods: {
        async login() {
            const hashedPassword = md5(this.formData.password).toString();
            const username = '';
            const password = '';
            try {
                const response = await axios.get('https://mocki.io/v1/3e408794-39ed-4c75-bb6e-c49c578de293', {
                    auth: {
                        username,
                        password: hashedPassword
                    }
                });
                if (response.data.userName === this.formData.username
                    && response.data.password === hashedPassword) {
                    this.loginSuccess = true;
                    this.loginError = false;
                    VueCookies.set('loggedIn', 'true', '1d');
                    this.isLoggedIn = true;
                    this.$router.push('/');
                }
                else {
                    this.loginError = true;
                    this.loginSuccess = false;
                }
            }
            catch (error) {
                console.error(error);
                this.loginError = true;
                this.loginSuccess = false;
            }
        }
    }
}
</script>
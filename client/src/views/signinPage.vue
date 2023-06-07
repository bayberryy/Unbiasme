<template>
    <div>
        <p class="texto">Login</p>
        <div class="Registro">
            <form @submit.prevent="submitForm">
                <span class="fontawesome-user"></span><input type="text" v-model="username" required placeholder="Username" autocomplete="off"> 
                <span class="fontawesome-lock"></span><input type="password" v-model="password"  required placeholder="password" autocomplete="off"> 
                <button id="button" type="submit">Sign in</button>
            </form>
        </div>
        <div id="error">
            {{error}}
            {{authenticateMessage}}
        </div>  
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SigninPage',
    data() {
        return {
            username: '',
            email: '',
            error: '',
            authenticateMessage: ''
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post('/api/signin', {
                    username: this.username,
                    password: this.password
                })
                console.log(response)
                this.$router.push('/home')

            } catch (error) {
                this.error = error.response.data.message
                console.log('errormessage',error.response.data.message);
            }
        }
    }
}
</script>

<style scoped>
@import '@/assets/css/signup.css';
</style>
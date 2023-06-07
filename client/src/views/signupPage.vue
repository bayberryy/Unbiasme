<template>
    <div>
        <p class="texto">Register</p>
        <div class="Registro">
            <!-- <form action="/signup" method="POST" enctype="application/json"> -->
            <form @submit.prevent="submitForm">
                <span class="fontawesome-user"></span><input type="text" v-model="username" required placeholder="Username" autocomplete="off"> 
                <span class="fontawesome-envelope-alt"></span><input type="text" v-model="email" required placeholder="Email Address" autocomplete="off">
                <span class="fontawesome-lock"></span><input type="password" v-model="password"  required placeholder="password" autocomplete="off"> 
                <button id="button" type="submit">Sign Up</button>
            </form>
        </div>
        <div id="error">
            {{error}}
        </div> 
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignupPage',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            error: ''
        }
    },

    methods: {
    async submitForm() {
      try {
        const response = await axios.post('/api/signup', {
          username: this.username,
          email: this.email,
          password: this.password
        })
        console.log('this working')
        console.log(response.data)
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
@import '@/assets/css/signup.css'
</style>

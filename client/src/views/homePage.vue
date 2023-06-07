<template>
    <div>
        <header>
            <h2>Welcome to UnBiasMe</h2>
            </header>
            <main>
            <p>Unconscious bias is a bias that we are not aware of, and it can happen when our brains make quick judgments based on past experiences and background information. These judgments can affect how we interact with others and how we make decisions. Unconscious bias can have a significant impact on the workplace, leading to negative outcomes such as discrimination, favoritism, and inequality. Some examples of unconscious bias in the workplace include making assumptions about someone's capabilities or limitations based on their gender, race, or age, overlooking someone's contributions or ideas because of their background or education, or gravitating towards people who are similar to oneself in terms of appearance or background. Unconscious bias can lead to a lack of diversity in hiring, promotions, and team-building, which can ultimately result in less innovation and less effective decision-making. To combat unconscious bias in the workplace, it is important to raise awareness of it and to encourage a culture of inclusivity and diversity. </p>
            <img src="@/assets/images/unconscious-bias.jpg" alt="placeholder image">
            </main>

        <form @submit="signOut">
            <button class="logout-button" type="submit">Sign out</button>
        </form>
    </div>
    
</template>

<script>
import axios from 'axios'

export default {
    name: 'HomePage',
    methods: {
    async signOut() {
        try {
            const response = await axios.post('/api/signout');
            console.log(response);
            this.$router.push('/iat')
            console.log('routed to iat')
        } catch (error) {
        console.error('Error signing out:', error);
        }
    }
}
}
</script>

<style scoped>
/* @import '@/assets/css/home.css'; */

.logout-button {
background-color: #2c90c6;
border: 1px solid #2c90c6;
border-radius: 15px;
-moz-border-radius: 15px;
-webkit-border-radius: 15px;
-ms-border-radius: 15px;
-o-border-radius: 15px;
color: #fff;
font-weight: bold;
line-height: 32px;
text-align: center;
text-transform: uppercase;
width: 100px;
position: absolute;
top: 10px;
right: 50px;
}
</style>


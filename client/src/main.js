import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from '@/App.vue';
import DisplayPage from '@/views/displayPage.vue'
import SignupPage from '@/views/signupPage.vue'
import SigninPage from '@/views/signinPage.vue'
import HomePage from '@/views/homePage.vue'

const routes = [
    {
        path: '/',
        name: 'App',
        component: App
    },
    {
        path: '/home',
        component: HomePage
    },
    {
        path: '/iat',
        name: 'DisplayPage',
        component: DisplayPage
    },
    {
        path: '/signup',
        name: 'SignupPage',
        component: SignupPage
    },
    {
        path: '/signin',
        name: 'SigninPage',
        component: SigninPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


createApp(App)
    .use(router)
    .mount('#app');

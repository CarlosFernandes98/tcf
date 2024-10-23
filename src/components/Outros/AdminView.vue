<template>
    <div class="home">
        <AdminComponent v-if="isAuthenticated" />
        <div v-else>
            <h2>Você precisa estar logado para acessar esta área.</h2>
            <router-link to="/login">Faça login</router-link>
        </div>
    </div>
</template>

<script>
import AdminComponent from '@/components/TCF_Components/AdminComponent.vue';

export default {
    name: "AdminView",
    components: {
        AdminComponent
    },
    computed: {
        isAuthenticated() {
            return !!localStorage.getItem('token'); // Verifica se o token está presente
        }
    }
};
</script>

<style>
body,
html {
    overflow-x: hidden;
    font-family: 'Roboto', sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.home {
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, rgb(236, 236, 236), #1e2f97);
}
</style>

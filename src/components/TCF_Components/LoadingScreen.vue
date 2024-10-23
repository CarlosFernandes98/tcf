<template>
    <div class="loading-container">
        <div class="logo-container">
            <img src="@/assets/LogoTCFCreative_white.png" alt="Logo" class="logo" />
        </div>
        <div class="loading-circle"></div>
    </div>
</template>

<script>
export default {
    name: "LoadingScreen",
};
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #000000;
}

.logo-container {
    animation: zoomInOut 2s infinite ease-in-out;
}

.logo {
    width: 150px;
    /* Tamanho inicial do logo */

}

.loading-circle {
    margin-top: 20px;
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top: 5px solid #ffffff;
    /* Cor do círculo */
    border-radius: 50%;
    animation: spin 2s linear infinite;
}

/* Animação de zoom in e zoom out do logo */
@keyframes zoomInOut {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.06);
    }
}

/* Animação de rotação do círculo */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
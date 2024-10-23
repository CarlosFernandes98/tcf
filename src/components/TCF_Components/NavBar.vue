<template>
    <nav class="navbar slide-in">
        <div class="logo">
            <router-link to="/">
                <img src="@/assets/LogoTCFCreative_white.png" alt="Logo" />
            </router-link>
            <button class="menu-toggle" @click="toggleMenu">
                <span class="menu-icon"></span>
            </button>
        </div>
        <div :class="['nav-links', { visible: visible }]">
            <router-link to="/home" active-class="active" @click="closeMenu">HOME</router-link>
            <router-link to="/portfolio" active-class="active" @click="closeMenu">PORTEFOLIO</router-link>
            <router-link to="/services" active-class="active" @click="closeMenu">SERVIÇOS</router-link>
            <!-- <router-link to="/faq" active-class="active" @click="closeMenu">FAQ</router-link> -->
            <router-link to="/contacts" active-class="active" @click="closeMenu">CONTACTOS</router-link>
            <!-- <router-link to="/about" active-class="active" @click="closeMenu">SOBRE NÓS</router-link> -->
        </div>
    </nav>
</template>
<script>
export default {
    data() {
        return {
            visible: false, // Controla a visibilidade das links da Navbar
            isMobile: false, // Controla o estado de mobile
        };
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
        setTimeout(() => {
            if (!this.isMobile) {
                this.visible = true; // Exibe os links da NavBar após 5 segundos
            }
        }, 3000); // 5 segundos de carregamento
    },
    methods: {
        toggleMenu() {
            this.visible = !this.visible;
        },
        closeMenu() {
            if (this.isMobile) {
                this.visible = false; // Exibe os links da NavBar após 5 segundos
            }
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 950; // Define o breakpoint para mobile
        },
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkMobile);
    },
};
</script>


<style scoped>
.navbar {
    /* Permite que os filhos sejam posicionados em relação a ela */
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    /* Ajuste do padding */
    font-family: 'Poppins', sans-serif;
    height: 100px;
    padding-top: 70px;
    padding-left: 100px;
    padding-right: 100px;
}

.logo {
    /* Logo flutua sobre a navbar */
    transform: translateX(-50%);
    margin-left: 30px;
    /* Ajusta a centralização do logo */
}

.logo img {
    height: 130px;
    /* Ajuste a altura do logo conforme necessário */
}

.nav-links {
    display: flex;
    gap: 2.5rem;
    flex-grow: 1;
    justify-content: center;
    /* Centraliza os links */
    opacity: 0;
    /* Inicialmente invisível */
    transition: opacity 2s ease;

}

.nav-links.visible {
    opacity: 1;
    animation: slide-in 1.5s ease forwards;
}

.nav-links a {
    position: relative;
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s ease;
}


.nav-links a {
    position: relative;
    color: #c3c3c3;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
    /* Adicione transform à transição */
}

.nav-links a:hover {
    color: #ffffff;
    /* Defina a cor desejada ao passar o mouse */
    transform: scale(1.1);
    /* Adicione o efeito de zoom */
}

.nav-links a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.nav-links a.active {
    color: #ffffff;
}

.nav-links a.active::after {
    transform: scaleX(1);
}

.auth-button {
    font-family: 'Poppins', sans-serif;
    color: white;
    background-color: transparent;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
    border: none;
    font-size: medium;

}

.auth-button:hover {
    cursor: pointer;
}

.auth-container {
    position: absolute;
    right: 15%;
    margin-left: auto;
}


.menu-toggle {
    background: none;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 1000;
    padding: 15px;

}

.menu-icon {
    width: 25px;
    height: 2px;
    background-color: white;
    display: block;
    position: relative;
}

.menu-icon::before,
.menu-icon::after {
    content: '';
    width: 25px;
    height: 2px;
    background-color: white;
    display: block;
    position: absolute;
}

.menu-icon::before {
    top: -8px;
}

.menu-icon::after {
    bottom: -8px;
}

/* Mobile Styles */
@media (max-width: 950px) {
    .navbar {
        height: auto;
        flex-direction: column;
        align-items: center;
        /* Centraliza o conteúdo da navbar */
        justify-content: center;
        /* Alinha o conteúdo no centro verticalmente */
        margin: 0px;
        margin-top: 20px;
    }

    .logo {
        /* position: relative; */
        /* Use relative para facilitar o alinhamento */
        transform: none;
        /* margin-bottom: 20px; */
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .logo img {
        height: 100px;
    }

    .menu-toggle {
        position: absolute;
        display: block;
        position: absolute;
        top: 20px;
        right: 10px;
        background-color: transparent;
    }

    .nav-links {
        position: fixed;
        left: 0;
        width: 100%;
        height: 100vh;
        /* O menu agora cobre toda a altura da tela */
        background-color: rgba(0, 0, 0, 0.9);
        /* Cor de fundo */
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        padding: 1rem 0;
        transform: translateY(-100%);
        /* Inicialmente fora da tela */
        transition: transform 0.5s ease;
        z-index: 1000;
        top: 0;
        /* Ajuste a posição do menu */
        opacity: 0;
        padding-bottom: 110px;
        /* Começa invisível */
    }

    .nav-links.mobile {
        transform: translateY(0);
    }

    .nav-links.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .nav-links a {
        font-size: 1.2rem;
        margin: 0.5rem 0;
    }
}
</style>
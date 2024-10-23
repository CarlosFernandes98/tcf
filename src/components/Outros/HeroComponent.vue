<template>
    <div class="container">
        <h1 class="title" ref="title" :class="{ 'animate': isTitleVisible }">Revolucione suas ideias com Impressão 3D de
            Alta Precisão
        </h1>
        <h2 class="sub-text" ref="subText" :class="{ 'animate': isSubTextVisible }">
            Transformamos a sua visão em realidade através de soluções personalizadas de prototipagem e
            impressão 3D de última geração.
        </h2>
        <button class="button-more" @click="handleClick" ref="viewMore" :class="{ 'animate': isButtonVisible }">
            <span>SABER MAIS</span>
        </button>
    </div>
</template>


<script>
export default {
    name: "HeroComponent",
    data() {
        return {
            isTitleVisible: false,
            isSubTextVisible: false,
            isButtonVisible: false,
            isMobile: false, // Controla o estado de mobile

        };
    },
    methods: {
        handleClick() {
            this.$router.push('/portfolio');
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 768; // Define o breakpoint para mobile
        },
        beforeUnmount() {
            window.removeEventListener("resize", this.checkMobile);
        },
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
        // Usando Intersection Observer para detectar quando os elementos entram na tela
        const observerOptions = {
            root: null, // Usando viewport como padrão
            threshold: 0.1, // Detecção ao 10% do elemento estar visível
        };

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isTitleVisible = true;
                }
            });
        }, observerOptions);

        const subTextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isSubTextVisible = true;
                }
            });
        }, observerOptions);

        const buttonObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isButtonVisible = true;
                }
            });
        }, observerOptions);

        // Observando os elementos
        titleObserver.observe(this.$refs.title);
        subTextObserver.observe(this.$refs.subText);
        buttonObserver.observe(this.$refs.viewMore);
    },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body,
html {
    overflow-x: hidden;
}

.container {
    margin-top: 60px;
    height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Animação inicial */
.title,
.sub-text,
.button-more {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.6s ease, transform 0.6s ease;
    margin-top: 20px;
}

/* Animação ao scroll */
.title.animate,
.sub-text.animate,
.button-more.animate {
    opacity: 1;
    transform: translateY(0);
}

.title {
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 20px;
    width: 60%;
    text-align: center;
    color: #ffffff;
}

.sub-text {
    font-weight: 300;
    font-size: 1.5rem;
    width: 60%;
    text-align: center;
}

.button-more {
    background-color: white;
    color: #ffffff;
    font-size: 15px;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    margin-top: 3%;
    background-color: #8c8c8c;

}

.button-more i {
    margin-left: 10px;
}

.button-more:hover {
    transform: scale(1.05) translateY(-5px);
}



@media (max-width: 950px) {
    .container {
        margin-top: 0px;
    }

    .title {
        font-size: 2.5rem;
        /* Tamanho da fonte reduzido para mobile */
        width: 80%;
        /* Largura aumentada para melhor visualização */
    }

    .sub-text {
        font-size: 1.2rem;
        /* Tamanho da fonte reduzido para mobile */
        width: 80%;
        /* Largura aumentada para melhor visualização */
    }

    .button-more {
        font-size: 14px;
        /* Tamanho da fonte reduzido para mobile */
        padding: 0.8rem 1.5rem;
        margin-top: 30px;

        /* Reduzindo o padding para um botão mais compacto */
    }
}
</style>
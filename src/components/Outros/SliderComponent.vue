<template>
    <div class="slider-container" @scroll="handleScroll" ref="slider">
        <div v-for="(slide, index) in slides" :key="index" class="slide"
            :style="{ backgroundImage: `url(${slide.image})` }">
            <div class="title-container">
                <h1>
                    <span class="title-part title-top">{{ slide.titlePart1 }}</span>
                    <span class="title-part title-bottom">{{ slide.titlePart2 }}</span>
                </h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SliderComponent",
    data() {
        return {
            currentSlideIndex: 0,
            slides: [
                {
                    image: require('@/assets/background/2024-05-11-10.46.54-2-scaled.jpg'),
                    titlePart1: "Desporto",
                    titlePart2: "Motorizado",
                },
                {
                    image: require('@/assets/background/2024-05-12-22.24.20-1-scaled.jpg'),
                    titlePart1: "Ensaios",
                    titlePart2: "Fotográficos",
                },
                {
                    image: require('@/assets/background/dji_fly_20221201_162828_249_1669912118427_photo_optimized-scaled.jpg'),
                    titlePart1: "Fotografia",
                    titlePart2: "Aérea",
                },
                {
                    image: require('@/assets/background/IMG_0456-scaled-e1717667226200.jpg'),
                    titlePart1: "Eventos",
                    titlePart2: "Desportivos",
                },
            ],
            intervalId: null,
        };
    },

    mounted() {
        setTimeout(() => {
            this.startAutoScroll();
        }, 3000);
    },

    beforeUnmount() {
        clearInterval(this.intervalId);
    },

    methods: {
        handleScroll() {
            const slider = this.$refs.slider;
            const scrollPositionX = slider.scrollLeft;
            const slideWidth = slider.clientWidth;

            const newIndex = Math.floor(scrollPositionX / slideWidth);

            if (newIndex !== this.currentSlideIndex) {
                this.currentSlideIndex = newIndex;
                this.updateSlideClasses();
            }
        },
        startAutoScroll() {
            this.intervalId = setInterval(() => {
                if (this.currentSlideIndex < this.slides.length - 1) {
                    this.currentSlideIndex++;
                } else {
                    this.currentSlideIndex = 0;
                }
                this.scrollToCurrentSlide();
                this.updateSlideClasses();
            }, 5000);
        },
        scrollToCurrentSlide() {
            const slider = this.$refs.slider;
            const slideWidth = slider.clientWidth;
            slider.scrollTo({
                left: this.currentSlideIndex * slideWidth,
                behavior: 'smooth',
            });
        },
        updateSlideClasses() {
            const slides = this.$refs.slider.children;
            for (let i = 0; i < slides.length; i++) {
                if (i === this.currentSlideIndex) {
                    slides[i].classList.add('active');
                } else {
                    slides[i].classList.remove('active');
                }
            }
        },
    }
};
</script>

<style scoped>
.slider-container {
    height: 100vh;
    /* Altura do container */
    width: 100vw;
    /* Largura do container */
    overflow-x: scroll;
    /* Rolagem horizontal */
    overflow-y: hidden;
    /* Sem rolagem vertical */
    white-space: nowrap;
    /* Impede que os slides quebrem a linha */
    position: relative;
    /* Alterado para relative */
    top: 0;
    /* Alinha ao topo da viewport */
    left: 0;
    /* Alinha à esquerda da viewport */
    display: flex;
    /* Flex para alinhar os slides horizontalmente */
    scroll-behavior: smooth;
    /* Animação suave para rolagem */
    scrollbar-width: none;
    /* Esconde a barra de rolagem no Firefox */
}

.slider-container::-webkit-scrollbar {
    display: none;
    /* Esconde a barra de rolagem no Chrome/Safari */
}

.slide {
    height: 100vh;
    /* Altura do slide */
    width: 100vw;
    /* Largura do slide */
    background-size: cover;
    /* Cobre todo o slide com a imagem */
    background-position: center;
    /* Centraliza a imagem */
    display: inline-block;
    /* Permite que os slides sejam inline */
    flex-shrink: 0;
    /* Impede que os slides encolham */
    position: relative;
    /* Para posicionar os elementos internos */
}

.title-container {
    position: absolute;
    /* Para que o título seja posicionado no slide */
    right: 5%;
    /* Margem da direita */
    top: 50%;
    /* Centro vertical */
    transform: translateY(-50%);
    /* Centraliza verticalmente */
    color: white;
    /* Cor do texto */
    padding: 20px;
    /* Padding ao redor do texto */
    border-radius: 10px;
    /* Bordas arredondadas */
    opacity: 0;
    /* Inicialmente invisível */
    transition: opacity 3.5s ease;
    /* Transição suave para a opacidade */
    margin-top: 30px;
    /* Margem acima do título */
}

.slide.active .title-container {
    opacity: 1;
    /* Torna visível o título do slide ativo */
}

.title-part {
    display: block;
    /* Permite que cada parte do título ocupe uma linha */
    transition: transform 0.5s ease, opacity 0.5s ease;
    /* Transição suave para as transformações */
}

.title-top {
    transform: translateY(-20px);
    /* Move para cima inicialmente */
    opacity: 0;
    /* Inicialmente invisível */
}

.slide.active .title-top {
    transform: translateY(0);
    /* Restaura a posição original */
    opacity: 1;
    /* Torna visível */
}

.title-bottom {
    transform: translateY(20px);
    /* Move para baixo inicialmente */
    opacity: 0;
    /* Inicialmente invisível */
}

.slide.active .title-bottom {
    transform: translateY(0);
    /* Restaura a posição original */
    opacity: 1;
    /* Torna visível */
}

h1 {
    font-size: 4.5rem;
    /* Tamanho da fonte */
    font-style: italic;
    /* Estilo itálico */
    margin: 0;
    /* Remove margens */
}

/* Estilos Responsivos */
@media (max-width: 768px) {
    .title-container {
        padding: 10px;
        /* Reduz o padding para telas menores */
    }

    h1 {
        font-size: 3rem;
        /* Ajusta o tamanho da fonte para telas pequenas */
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 2.5rem;
        /* Ajusta ainda mais para telas muito pequenas */
    }

    .title-container {
        right: 50px;
        /* Ajusta a posição do título */
        padding: 5px;
        /* Reduz o padding */
    }
}
</style>

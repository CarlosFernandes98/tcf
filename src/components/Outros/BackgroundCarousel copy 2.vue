<template>
    <div class="slider-container" ref="slider">
        <!-- Imagem atual -->
        <div class="background-image" :style="{
            backgroundImage: 'url(' + currentSlide.image + ')',
            transform: `translateX(0%)`
        }"></div>

        <!-- Nova imagem que entra -->
        <!-- <div class="new-image next-image" :style="{
            backgroundImage: 'url(' + nextSlide.image + ')',
            transform: `translateX(${nextTranslateX}%)`
        }"></div> -->

        <div class="new-image next-image" :class="{ 'below': nextTranslateX === 0 }" :style="{
            backgroundImage: 'url(' + nextSlide.image + ')',
            transform: `translateX(${nextTranslateX}%)`
        }"></div>


        <div class="title-container" v-if="currentSlide">
            <h1>
                <span class="title-part title-top">{{ currentSlide.titlePart1 }}</span>
                <span class="title-part title-bottom">{{ currentSlide.titlePart2 }}</span>
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "BackgroundCarousel",
    data() {
        return {
            currentSlideIndex: 0,
            currentTranslateX: 0,
            nextTranslateX: 100,
            currentOpacity: 1, // Inicialmente, a imagem atual é completamente visível
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
            transitionDuration: 5000, // 2 segundos de duração da transição
        };
    },
    computed: {
        currentSlide() {
            return this.slides[this.currentSlideIndex];
        },
        nextSlide() {
            return this.slides[(this.currentSlideIndex + 1) % this.slides.length];
        },
    },
    mounted() {
        this.startSlideShow();
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    },
    methods: {
        startSlideShow() {
            this.intervalId = setInterval(() => {
                this.animateSlides();
            }, 5000); // Troca de imagem a cada 5 segundos
        },
        animateSlides() {
            // Inicia a animação de transparência e movimento
            this.currentOpacity = 0;
            this.nextTranslateX = 0;

            // Espera o tempo da transição para trocar de slide
            setTimeout(() => {
                // Atualiza o índice antes de ressetar a posição
                this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;

                // Reseta as posições para a próxima transição
                this.currentTranslateX = 0;
                this.nextTranslateX = 100;
                this.currentOpacity = 1; // Reseta opacidade para o próximo ciclo
            }, this.transitionDuration);
        },
    },
};


</script>

<style scoped>
.slider-container {
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.background-image {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 2s ease-in, opacity 2s ease-in;
    /* Adiciona transição de opacidade */
    opacity: 1;
    /* Opacidade inicial */
    /* Animação suave para a transição */
}


.new-image {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 2s ease-out, z-index 0s ease 2s;
    /* Transição suave de z-index */
    z-index: 1;
    /* Inicialmente a nova imagem está por cima */
}

.next-image {
    position: absolute;
    top: 0;
    left: 0;
}

.new-image.below {
    z-index: -1;
    /* Quando a imagem está com translateX(0), ela vai para trás */
}

.title-container {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    padding: 20px;
    border-radius: 10px;
}

.title-part {
    display: block;
}

h1 {
    font-size: 4.5rem;
    font-style: italic;
    margin: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .title-container {
        padding: 10px;
    }
}

@media (max-width: 480px) {
    .title-container {
        right: 50px;
        padding: 5px;
    }
}
</style>

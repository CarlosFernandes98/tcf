<template>
    <div class="slider-container" ref="slider">
        <div v-for="(slide, index) in slides" :key="index" class="slide" :class="{ 'blur-effect': !isHomeRoute }"
            :style="{ backgroundImage: `url(${slide.image})` }">
            <div class="overlay" :style="{ opacity: overlayOpacity }"></div>

            <div class="title-container" v-if="isHomeRoute">
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
    name: "BackgroundCarousel",
    data() {
        return {
            currentSlideIndex: 0,
            slides: [
                {
                    image: require('@/assets/background/2024-05-12-22.24.20-1-scaled.jpg'),
                    titlePart1: "Ensaios",
                    titlePart2: "Fotográficos",
                },
                // {
                //     image: require('@/assets/background/Digital-transformation-banner-scaled.jpg'),
                //     titlePart1: "Soluções",
                //     titlePart2: "Digitais",
                // },
                // {
                //     image: require('@/assets/background/image1.png'),
                //     titlePart1: "Web",
                //     titlePart2: "Solutions",
                // },
                {
                    image: require('@/assets/background/99u_image_1.jpg'),
                    titlePart1: "Branding e",
                    titlePart2: "Design",
                },
                {
                    image: require('@/assets/background/2024-05-11-10.46.54-2-scaled.jpg'),
                    titlePart1: "Desporto",
                    titlePart2: "Motorizado",
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
    computed: {
        isHomeRoute() {
            return this.$route.path === '/home';
        },
        overlayOpacity() {
            return this.isHomeRoute ? 0.1 : 1.0; // Ajuste os valores conforme necessário
        }
    },
    mounted() {
        setTimeout(() => {
            this.updateSlideClasses();
        }, 1000);
        setTimeout(() => {
            this.startAutoScroll();
        }, 3000);
    },

    beforeUnmount() {
        clearInterval(this.intervalId);
    },

    methods: {
        startAutoScroll() {
            this.intervalId = setInterval(() => {
                if (this.currentSlideIndex < this.slides.length - 1) {
                    this.currentSlideIndex++;
                } else {
                    this.currentSlideIndex = 0;
                }
                this.scrollToCurrentSlide(5000);
                this.updateSlideClasses();
            }, 10000);
        },
        scrollToCurrentSlide(duration) {
            const slider = this.$refs.slider;
            const slideWidth = slider.clientWidth;
            const start = slider.scrollLeft;
            const end = this.currentSlideIndex * slideWidth;
            const change = end - start;
            const increment = 20;

            let currentTime = 0;

            const animateScroll = () => {
                currentTime += increment;
                const val = this.easeInOutQuad(currentTime, start, change, duration);
                slider.scrollLeft = val;

                if (currentTime < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            animateScroll();
        },

        updateSlideClasses() {
            const slides = this.$refs.slider.children;
            for (let i = 0; i < slides.length; i++) {
                const titleContainer = slides[i].querySelector('.title-container');
                if (titleContainer) {
                    if (i === this.currentSlideIndex) {
                        slides[i].classList.add('active');
                        titleContainer.classList.add('slide-in');
                    } else {
                        slides[i].classList.remove('active');
                        titleContainer.classList.remove('slide-in');
                    }
                }
            }
        },
        easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
    },
    watch: {
        '$route.path': function (newPath) {
            if (newPath === '/home') {
                this.updateSlideClasses();
            }
        }
    }
};
</script>

<style scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    filter: blur();
    transition: opacity 2.5s ease;
    /* Adiciona transição suave à opacidade */
}

.blur-effect {
    filter: blur(5px);
    transition: filter 1.5s ease;
    /* Adiciona transição suave ao blur */
}


.slider-container {
    height: 100vh;
    width: 100vw;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: flex;
    scroll-behavior: smooth;
    scrollbar-width: none;
}

.slider-container::-webkit-scrollbar {
    display: none;
}

.slide {
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;
    display: inline-block;
    flex-shrink: 0;
    position: relative;
    transition: transform 10.0s ease, filter 0.5s ease;
    background-color: black;

}

/* Aplica o zoom apenas ao slide ativo */
.slide.active {
    transform: scale(1.20);
    /* Efeito de zoom ao slide ativo */
    z-index: 1;
    /* Para garantir que o slide ativo fique acima dos outros */
}

.slide:not(.active) {
    z-index: 0;
    /* Os slides não ativos ficam atrás do slide ativo */
}

.title-container {
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%) translateX(-100%);
    /* Começa fora da tela à esquerda */
    transition: opacity 3.5s ease, transform 5s ease;
    /* Adiciona a transição de transformação */
    color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    opacity: 0;
    margin-top: 30px;
    z-index: 2;

}

.slide.active .title-container {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
    /* Move para a posição original */
}

.title-container.slide-in {
    opacity: 0;
    /* Inicialmente invisível */
    transform: translateY(-50%) translateX(-100%);
    /* Começa fora da tela à esquerda */
}

.slide.active .title-container.slide-in {
    opacity: 1;
    /* Fica visível ao ativar */
    transform: translateY(-50%) translateX(0);
    /* Move para a posição original */
}

.slide.active .title-container {
    opacity: 1;
}

.title-part {
    display: block;
    transition: transform 3.5s ease, opacity 1.5s ease;
}

.title-top {
    transform: translateY(-20px);
    opacity: 0;
}

.slide.active .title-top {
    transform: translateY(0px);
    opacity: 1;
}

.title-bottom {
    transform: translateY(20px);
    opacity: 0;
}

.slide.active .title-bottom {
    transform: translateY(-20px);
    opacity: 1;
}

h1 {
    font-size: 4.8rem;
    font-style: italic;
    margin: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .title-container {
        padding: 10px;
    }

    h1 {
        font-size: 3rem;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 2.5rem;
    }

    .title-container {
        right: 50px;
        padding: 5px;
    }
}
</style>

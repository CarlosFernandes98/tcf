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
    name: "BackgroundCarousel",
    data() {
        return {
            currentSlideIndex: 0, // Índice do slide atual
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
        // Atraso de 3 segundos para o primeiro slide
        setTimeout(() => {
            this.startAutoScroll(); // Inicia o scroll automático após o atraso de 3 segundos
        }, 3000);
    },

    beforeUnmount() {
        clearInterval(this.intervalId); // Limpa o intervalo ao destruir o componente
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
                    // Quando estiver no último slide, volte ao primeiro
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
                    slides[i].classList.add('active'); // Adiciona a classe 'active' ao slide atual
                } else {
                    slides[i].classList.remove('active'); // Remove a classe 'active' dos outros slides
                }
            }
        },
    }
};
</script>

<style scoped>
.slider-container {
    height: 100vh;
    width: 100vw;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
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
}

.title-container {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    padding: 20px;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 3.5s ease;
    margin-top: 30px;
}

.slide.active .title-container {
    opacity: 1;
}

.title-part {
    display: block;
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.title-top {
    transform: translateY(-20px);
    opacity: 0;
}

.slide.active .title-top {
    transform: translateY(0);
    opacity: 1;
}

.title-bottom {
    transform: translateY(20px);
    opacity: 0;
}

.slide.active .title-bottom {
    transform: translateY(0);
    opacity: 1;
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

    h1 {
        font-size: 3rem;
        /* Adjust title size for mobile */
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 2.5rem;
        /* Further reduce title size for smaller devices */
    }

    .title-container {
        right: 50px;
        /* Adjust positioning */
        padding: 5px;
    }
}
</style>

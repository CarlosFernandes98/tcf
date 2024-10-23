<template>
    <div class="carousel-container">
        <div class="video-info">
            <h1 class="video-title" ref="title" :class="{ 'animate': isTitleVisible }">
                Serviços de Fotografia e Vídeo
            </h1>
            <p class="video-description" ref="description" :class="{ 'animate': isDescriptionVisible }">
                É essencial promover o seu serviço ou produto com imagens atrativas. Uma boa imagem pode comunicar uma
                mensagem de maneira mais clara e direta. O foco deve ser criar uma presença reconhecível na mente do
                público, para que a sua marca se torne a escolha óbvia quando o consumidor precisar do que oferece.
            </p>
        </div>
        <div class="carousel-player">
            <img v-for="(image, index) in images" :key="index" :src="image" alt="carousel image" class="carousel-image"
                :class="{ 'active': currentIndex === index }" @error="handleImageError" />
        </div>
    </div>
</template>

<script>
export default {
    name: "ServiceCarousel1Component",
    data() {
        return {
            images: [
                require('@/assets/background/2024-05-11-10.46.54-2-scaled.jpg'),
                require('@/assets/background/dji_fly_20221201_162828_249_1669912118427_photo_optimized-scaled.jpg'),
                require('@/assets/background/IMG_0456-scaled-e1717667226200.jpg'),
            ],
            currentIndex: 0,
            isTitleVisible: true,
            isDescriptionVisible: true,
        };
    },

    mounted() {
        // const observerOptions = {
        //     root: null,
        //     threshold: 0.1,
        // };

        // const titleObserver = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             this.isTitleVisible = true;
        //         }
        //     });
        // }, observerOptions);

        // const descriptionObserver = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             this.isDescriptionVisible = true;
        //         }
        //     });
        // }, observerOptions);

        // titleObserver.observe(this.$refs.title);
        // descriptionObserver.observe(this.$refs.description);

        // Mudar de imagem automaticamente a cada 5 segundos
        setInterval(() => {
            this.nextImage();
        }, 5000);
    },
    methods: {
        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        handleImageError(event) {
            console.error("Erro ao carregar a imagem:", event.target.src);
            event.target.style.display = 'none'; // Esconde a imagem se não carregar
        }
    }
};
</script>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.carousel-container {
    display: flex;
    justify-content: space-between;
    /* Espaça os itens igualmente */
    align-items: center;
    margin-top: 60px;
    padding: 0 0px;
    border-radius: 30px;
    gap: 30px;
    /* Espaço entre o texto e o carousel */
}

.carousel-player {
    position: relative;
    overflow: hidden;
    max-width: 550px;
    width: 50%;
    /* Define que o carousel ocupará 50% da largura */
    height: 300px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.carousel-image {
    width: 100%;
    height: auto;
    transition: opacity 1s ease;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}

.carousel-image.active {
    opacity: 1;
}

.video-info {
    width: 50%;
    /* Define que o texto ocupará 50% da largura */
    padding-right: 40px;
}

.video-title,
.video-description {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.6s ease, transform 0.6s ease;
}

.video-title.animate,
.video-description.animate {
    opacity: 1;
    transform: translateY(0);
}

.video-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 20px;
}

.video-description {
    color: #c9c9c9;
    line-height: 1.6;
    text-align: justify;
    font-size: 1.2rem;
}

/* Ajustes para telas menores */
@media (max-width: 768px) {
    .carousel-container {
        flex-direction: column;
        align-items: center;
    }

    .carousel-player {
        width: 100%;
        /* Ocupa toda a largura disponível */
        margin-bottom: 20px;
    }

    .video-info {
        width: 100%;
        /* Ocupa toda a largura disponível */
        padding-right: 0px;
    }

    .video-title {
        font-size: 2rem;
        text-align: center;
    }

    .video-description {
        font-size: 1rem;
        text-align: justify;
    }
}
</style>
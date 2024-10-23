<template>
    <div class="video-container">
        <div class="video-player">
            <video autoplay muted loop controls class="hover-video">
                <source :src="videoSrc" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
            </video>
        </div>
        <div class="video-info">
            <h1 class="video-title" ref="title" :class="{ 'animate': isTitleVisible }">
                Transforme Suas Ideias em Realidade com Impressão 3D
            </h1>
            <p class="video-description" ref="description" :class="{ 'animate': isDescriptionVisible }">
                Descubra como nossa tecnologia de impressão 3D pode revolucionar seus projetos! No vídeo, você verá
                como transformamos conceitos inovadores em protótipos precisos e produtos finais, oferecendo soluções
                personalizadas para diversas indústrias. Seja no setor automotivo, design, arquitetura ou medicina,
                nossa impressão 3D garante qualidade, agilidade e redução de custos. Explore o futuro da fabricação
                aditiva e veja como podemos ajudar sua empresa a inovar de forma rápida e eficiente.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "VideoPlayerComponent",
    props: {
        videoSrc: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isTitleVisible: false,
            isDescriptionVisible: false,
            isMobile: false, // Controla o estado de mobile
        };
    },
    methods: {
        checkMobile() {
            this.isMobile = window.innerWidth <= 768; // Define o breakpoint para mobile
        },
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);

        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isTitleVisible = true;
                }
            });
        }, observerOptions);

        const descriptionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isDescriptionVisible = true;
                }
            });
        }, observerOptions);

        titleObserver.observe(this.$refs.title);
        descriptionObserver.observe(this.$refs.description);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkMobile);
    },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.video-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    padding: 0px 50px 0px 50px;
    background-color: rgba(0, 0, 0, 0.200);
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 30px;
}

/* Estilos do player de vídeo */
.video-player video {
    width: 100%;
    max-width: 550px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* Animação ao passar o mouse sobre o vídeo */
.video-player video:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

/* Estilos da seção de informações (título e descrição) */
.video-info {
    flex: 1;
    padding-left: 40px;
}

/* Título e descrição inicial */
.video-title,
.video-description {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.6s ease, transform 0.6s ease;
}

/* Título e descrição animada ao aparecer */
.video-title.animate,
.video-description.animate {
    opacity: 1;
    transform: translateY(0);
}

/* Título */
.video-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 20px;
}

/* Descrição */
.video-description {
    color: #c9c9c9;
    line-height: 1.6;
    text-align: justify;
    font-size: 1.2rem;
}

/* Responsividade */
@media (max-width: 768px) {
    .video-container {
        flex-direction: column;
        /* Altera a direção para coluna em mobile */
        align-items: center;
        /* Centraliza os itens */
    }

    .video-player {
        margin-bottom: 20px;
        /* Espaço entre o vídeo e o texto */
    }

    .video-title {
        font-size: 2rem;
        /* Reduz o tamanho da fonte para mobile */
        text-align: center;
        /* Centraliza o texto */
    }

    .video-description {
        font-size: 1rem;
        /* Reduz o tamanho da fonte para mobile */
        text-align: justify;
    }

    .video-info {
        flex: 1;
        padding-left: 0px;
    }

}
</style>

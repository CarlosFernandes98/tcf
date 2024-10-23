<template>
    <div class="container">
        <div class="about-container">
            <div class="left-side">
                <p class="text" ref="aboutTitle" :class="{ 'animate': isAboutTitleVisible }">
                    Nós somos o design da experiência
                </p>
                <p class="subtext" ref="aboutSubtext" :class="{ 'animate': isAboutSubtextVisible }">
                    Olá sou o Ricardo, sou Engenheiro Mecânico e esta é a minha ideia de negócio
                    Criar produtos através da impressão 3D
                </p>
                <div>
                    <blockquote class="quote" ref="quote" :class="{ 'animate': isQuoteVisible }">
                        "People ignore design that ignores people"
                    </blockquote>
                </div>
            </div>
            <div class="right-side">
                <img src="@/assets/profile_1.png" alt="Minha Foto" class="about-image" ref="aboutImage"
                    :class="{ 'animate': isAboutImageVisible }" />

            </div>
        </div>
        <AboutMeCV />
        <LetsTalkComponent :isVisible="isModalVisible" @close="closeModal" />
    </div>
</template>

<script>
import AboutMeCV from './AboutMeCV.vue';
import LetsTalkComponent from './LetsTalkComponent.vue';

export default {
    name: "AboutMeComponent",
    components: {
        AboutMeCV,
        LetsTalkComponent
    },
    data() {
        return {
            isAboutTitleVisible: false,
            isAboutSubtextVisible: false,
            isAboutImageVisible: false,
            isQuoteVisible: false,
            isButtonVisible: false,
            isModalVisible: false,
        };
    },
    methods: {
        handleLearnMore() {
            this.$router.push('/about'); // Redireciona para uma página "Sobre"
        },
        handleTalk() {
            console.log("Let's Talk clicked!");
        },
        // handlePortfolio() {
        //     console.log("Portfolio clicked!");
        // },
        openModal() {
            this.isModalVisible = true; // Abre o modal
        },
        closeModal() {
            this.isModalVisible = false; // Fecha o modal
        },
    },
    mounted() {
        // Usando Intersection Observer para detectar quando os elementos entram na tela
        const observerOptions = {
            root: null, // Usando viewport como padrão
            threshold: 0.1, // Detecção ao 10% do elemento estar visível
        };

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isAboutTitleVisible = true;
                }
            });
        }, observerOptions);

        const subTextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isAboutSubtextVisible = true;
                }
            });
        }, observerOptions);

        // const buttonObserver = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             this.isButtonVisible = true;
        //         }
        //     });
        // }, observerOptions);

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isAboutImageVisible = true;
                }
            });
        }, observerOptions);

        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isQuoteVisible = true;
                }
            });
        }, observerOptions);

        // Observando os elementos
        titleObserver.observe(this.$refs.aboutTitle);
        subTextObserver.observe(this.$refs.aboutSubtext);
        // buttonObserver.observe(this.$refs.talkButton);
        // buttonObserver.observe(this.$refs.portfolioButton);
        imageObserver.observe(this.$refs.aboutImage);
        quoteObserver.observe(this.$refs.quote);
    },
};
</script>

<style scoped>
.container {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    margin-bottom: 0px;
    padding-bottom: 20px;
    padding-left: 10%;
    padding-right: 10%;
    background-color: rgba(0, 0, 0, 0.200);
}

.about-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
}

.left-side {
    width: 50%;
    display: flex;
    flex-direction: column;
}

.right-side {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text,
.subtext,
.quote,
.button-talk,
.button-portfolio {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.6s ease, transform 0.6s ease;
}

/* Animação ao scroll */
.text.animate,
.subtext.animate,
.quote.animate,
.button-talk.animate,
.button-portfolio.animate {
    opacity: 1;
    transform: translateY(0);
}

.text {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 3rem;
    color: #ffffff;
    padding-top: 50px;
}

.subtext {
    margin-bottom: 20px;
    font-size: 14px;
    color: rgb(211, 211, 211);
}

.quote {
    font-size: 1.3rem;
    font-style: italic;
    color: rgb(255, 255, 255);
    border-left: 4px solid #8c8c8c;
    padding: 10px;
}

.buttons {
    display: flex;
    gap: 10px;
}

.button-talk,
.button-portfolio {
    background-color: #8c8c8c;
    color: white;
    font-size: 15px;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.3s ease;
}

.about-image {
    width: 50%;
    /* Ajuste para 100% da largura disponível */
    height: auto;
    /* Mantenha a proporção */
    margin-top: 20px;
    box-shadow: 10px;
}

.button-talk:hover,
.button-portfolio:hover {
    transform: scale(1.05) translateY(-5px);
}

/* Media Queries para responsividade */
@media (max-width: 768px) {
    .about-container {
        flex-direction: column;
        /* Muda para coluna em telas menores */
        align-items: center;
        /* Centraliza os itens */
        text-align: justify;

    }

    .left-side,
    .right-side {
        width: 100%;
        /* Largura total para cada lado */
        /* Ajuste o padding */
    }

    .text {
        font-size: 2rem;
        /* Reduz o tamanho da fonte */
        text-align: center;
        /* Centraliza o texto */
    }

    .subtext {
        text-align: center;
        /* Centraliza o texto */
    }

    .quote {
        font-size: 1.2rem;
        /* Ajusta o tamanho da citação */
        text-align: center;
        /* Centraliza a citação */
    }
}
</style>

<template>
    <div class="feature-section">
        <div class="text-section">
            <h1 class="main-title" ref="mainTitle" :class="{ 'animate': isMainTitleVisible }">
                Olá, sou o Ricardo
            </h1>
            <h2 class="sub-title" ref="subTitle" :class="{ 'animate': isSubTitleVisible }">
                Engenheiro Mecânico: Transformando conceitos em realidade
            </h2>
            <p class="intro-text" ref="introText" :class="{ 'animate': isIntroTextVisible }">
                Sou especializado em desenvolver soluções mecânicas inovadoras, desde o design de sistemas complexos até
                a otimização de processos de fabricação. Minha paixão é unir tecnologia e eficiência para criar produtos
                que fazem a diferença.
            </p>

            <div class="cv-section">
                <h2 class="cv-title">Currículo</h2>
                <div class="cv-container">
                    <div class="cv-entry" ref="cvEntry1" :class="{ 'animate': isCvEntry1Visible }">
                        <h3 class="cv-position">Engenheiro Mecânico Sênior</h3>
                        <span class="cv-company">ABC Engenharia - 2020 - Presente</span>
                        <p class="cv-description">
                            Responsável pelo desenvolvimento de projetos mecânicos complexos, liderando equipes de
                            design e
                            fabricação. Expertise em análise estrutural, simulações e prototipagem.
                        </p>
                    </div>
                    <div class="cv-entry" ref="cvEntry2" :class="{ 'animate': isCvEntry2Visible }">
                        <h3 class="cv-position">Engenheiro de Processos</h3>
                        <span class="cv-company">XYZ Indústrias - 2015 - 2020</span>
                        <p class="cv-description">
                            Implementação de otimizações nos processos de manufatura, utilizando metodologias Lean e Six
                            Sigma
                            para redução de custos e melhoria de eficiência.
                        </p>
                    </div>
                    <div class="cv-entry" ref="cvEntry3" :class="{ 'animate': isCvEntry3Visible }">
                        <h3 class="cv-position">Estagiário de Engenharia</h3>
                        <span class="cv-company">Tech Solutions - 2013 - 2015</span>
                        <p class="cv-description">
                            Assistência no desenvolvimento de projetos mecânicos, análise de viabilidade de materiais e
                            suporte
                            à equipe de engenharia em diversas frentes.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Seção de Como Comecei -->
            <div class="started-section" ref="startedSection" :class="{ 'animate': isStartedSectionVisible }">
                <h2 class="started-title">Como Comecei</h2>
                <p class="started-text">
                    Minha jornada na engenharia começou na universidade, onde me apaixonei pela mecânica e pela
                    capacidade de
                    transformar ideias em realidade. Durante os meus estudos, participei de diversos projetos práticos
                    que
                    me proporcionaram a experiência e o conhecimento necessários para entrar no mercado de trabalho.
                </p>
            </div>

            <!-- Seção de O Que Me Inspira -->
            <div class="inspiration-section" ref="inspirationSection"
                :class="{ 'animate': isInspirationSectionVisible }">
                <h2 class="inspiration-title">O Que Me Inspira</h2>
                <p class="inspiration-text">
                    Sou inspirado pela inovação e pelo impacto positivo que a engenharia pode ter na sociedade. Acredito
                    que a tecnologia deve ser usada para resolver problemas e criar soluções sustentáveis que melhorem a
                    vida das pessoas.
                </p>
            </div>

            <!-- Seção de Áreas de Interesse -->
            <div class="interest-section" ref="interestSection" :class="{ 'animate': isInterestSectionVisible }">
                <h2 class="interest-title">Principais áreas de interesse</h2>
                <div class="interest-list">
                    <div class="interest-item">
                        <i class="fas fa-robot"></i>
                        <p>Automação Industrial</p>
                    </div>
                    <div class="interest-item">
                        <i class="fas fa-leaf"></i>
                        <p>Tecnologias Sustentáveis</p>
                    </div>
                    <div class="interest-item">
                        <i class="fas fa-laptop-code"></i>
                        <p>Desenvolvimento CAD</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "AboutMeCV",
    data() {
        return {
            hoveredIndex: null,
            isMainTitleVisible: false,
            isSubTitleVisible: false,
            isIntroTextVisible: false,
            isCvEntry1Visible: false,
            isCvEntry2Visible: false,
            isCvEntry3Visible: false,
            isStartedSectionVisible: false,
            isInspirationSectionVisible: false,
            isInterestSectionVisible: false,
        };
    },
    mounted() {
        // Criando observador para as animações
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const mainTitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isMainTitleVisible = true; // Marca o título principal como visível
                }
            });
        }, observerOptions);

        const subTitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isSubTitleVisible = true; // Marca o subtítulo como visível
                }
            });
        }, observerOptions);

        const introTextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isIntroTextVisible = true; // Marca o texto introdutório como visível
                }
            });
        }, observerOptions);

        const cvEntry1Observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isCvEntry1Visible = true; // Marca o primeiro item do currículo como visível
                }
            });
        }, observerOptions);

        const cvEntry2Observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isCvEntry2Visible = true; // Marca o segundo item do currículo como visível
                }
            });
        }, observerOptions);

        const cvEntry3Observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isCvEntry3Visible = true; // Marca o terceiro item do currículo como visível
                }
            });
        }, observerOptions);

        const startedSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isStartedSectionVisible = true; // Marca a seção de "Como Comecei" como visível
                }
            });
        }, observerOptions);

        const inspirationSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isInspirationSectionVisible = true; // Marca a seção de "O Que Me Inspira" como visível
                }
            });
        }, observerOptions);

        const interestSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isInterestSectionVisible = true; // Marca a seção de "Áreas de Interesse" como visível
                }
            });
        }, observerOptions);

        // Observando os elementos
        mainTitleObserver.observe(this.$refs.mainTitle);
        subTitleObserver.observe(this.$refs.subTitle);
        introTextObserver.observe(this.$refs.introText);
        cvEntry1Observer.observe(this.$refs.cvEntry1);
        cvEntry2Observer.observe(this.$refs.cvEntry2);
        cvEntry3Observer.observe(this.$refs.cvEntry3);
        startedSectionObserver.observe(this.$refs.startedSection);
        inspirationSectionObserver.observe(this.$refs.inspirationSection);
        interestSectionObserver.observe(this.$refs.interestSection);
    },
};
</script>

<style scoped>
.feature-section {
    text-align: center;
    padding: 20px;
    /* Add padding for mobile */
}

.text-section {
    text-align: left;
}

/* Estilo para o título principal com animação */
.main-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: rgb(255, 255, 255);
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.main-title.animate {
    opacity: 1;
    transform: translateX(0);
}

/* Estilo para os subtítulos e textos */
.sub-title,
.intro-text {
    margin-bottom: 10px;
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 0.6s ease, transform 0.6s ease;
    color: rgb(212, 212, 212);
    margin-bottom: 20px;
    text-align: justify;
    /* Justifica o texto */
}

.sub-title.animate,
.intro-text.animate {
    opacity: 1;
    transform: translateX(0);
}

/* Estilos para a seção de currículo */
.cv-section {
    text-align: left;
    color: rgb(255, 255, 255);
}

.cv-title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #8c8c8c;
}

.cv-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.cv-entry {
    margin-bottom: 20px;
    opacity: 0;
    transform: translateY(50%);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.cv-entry.animate {
    opacity: 1;
    transform: translateY(0);
}

.interest-section {
    text-align: center;
    padding: 50px;
}

.interest-title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #ffffff;
}

.interest-list {
    display: flex;
    justify-content: space-around;
    color: #ffffff;
    flex-wrap: wrap;
    /* Allows items to wrap in mobile view */
}

.interest-item {
    transition: transform 1.3s ease, color 1.3s ease;
    cursor: pointer;
    margin: 10px;
    /* Adjust margin for better spacing on mobile */
}

.interest-item:hover {
    transform: scale(1.1);
    color: #8c8c8c;
}

.interest-item i {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.interest-item:hover i {
    color: #8c8c8c;
}

/* Seções adicionais com animações */
.started-section,
.inspiration-section {
    text-align: center;
    color: #ffffff;
    opacity: 0;
    transform: translateY(50%);
    transition: opacity 0.6s ease, transform 0.6s ease;
    margin-bottom: 20px;
}

.started-section.animate,
.inspiration-section.animate {
    opacity: 1;
    transform: translateY(0);
}

.started-title,
.inspiration-title {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #ffffff;
}

.started-text,
.inspiration-text {
    font-size: 1.1rem;
    font-weight: 300;
    margin-bottom: 20px;
    color: #ffffff;
    text-align: justify;
    /* Justifica o texto */
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {

    .main-title {
        font-size: 2rem;
        /* Smaller font size for mobile */
    }

    .cv-container {
        text-align: justify;
        padding: 0px;
    }

    .sub-title,
    .intro-text,
    .started-text,
    .inspiration-text {
        font-size: 1rem;
        /* Adjust font size for readability */
    }

    .cv-title {
        font-size: 1.5rem;
        /* Smaller cv title */
    }

    .interest-title {
        font-size: 1.5rem;
        /* Smaller interest title */
    }

    .interest-item {
        flex: 1 0 45%;
        /* Adjust items to fit better on smaller screens */
        margin: 5px;
        /* Reduce margin for mobile */
    }
}

@media (max-width: 480px) {
    .main-title {
        font-size: 1.5rem;
        /* Further reduce for very small screens */
    }

    .cv-container {
        text-align: justify;
        padding: 0px;
    }

    .sub-title,
    .intro-text,
    .started-text,
    .inspiration-text {
        font-size: 0.9rem;
        /* Further reduce for very small screens */
    }

    .cv-title {
        font-size: 1.2rem;
        /* Further reduce for very small screens */
    }

    .interest-title {
        font-size: 1.2rem;
        /* Further reduce for very small screens */
    }
}
</style>
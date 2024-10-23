<template>
    <div class="feature-section">
        <div class="icon-container">
            <div class="icon-card" ref="iconCard1" :class="{ 'animate': isIcon1Visible }" @mouseover="hoverIcon(0)"
                @mouseleave="resetIcon(0)">
                <i :class="['fas', 'fa-cube', { 'hovered': hoveredIndex === 0 }]"></i>
                <h3 class="icon-title">Prototipagem Rápida</h3>
                <p class="icon-description">
                    Criação de protótipos funcionais em tempo recorde, permitindo iterações rápidas no desenvolvimento
                    de produtos.
                </p>
            </div>
            <div class="icon-card" ref="iconCard2" :class="{ 'animate': isIcon2Visible }" @mouseover="hoverIcon(1)"
                @mouseleave="resetIcon(1)">
                <i :class="['fas', 'fa-tools', { 'hovered': hoveredIndex === 1 }]"></i>
                <h3 class="icon-title">Personalização Total</h3>
                <p class="icon-description">
                    Oferecemos soluções personalizadas para atender às suas necessidades específicas, desde designs até
                    cores.
                </p>
            </div>
            <div class="icon-card" ref="iconCard3" :class="{ 'animate': isIcon3Visible }" @mouseover="hoverIcon(2)"
                @mouseleave="resetIcon(2)">
                <i :class="['fas', 'fa-clock', { 'hovered': hoveredIndex === 2 }]"></i>
                <h3 class="icon-title">Eficiência e Velocidade</h3>
                <p class="icon-description">
                    Impressão 3D otimizada para reduzir o tempo de produção e garantir entregas rápidas e confiáveis.
                </p>
            </div>
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    name: "FeatureComponent",
    data() {
        return {
            hoveredIndex: null,
            isIcon1Visible: false,
            isIcon2Visible: false,
            isIcon3Visible: false,
        };
    },
    methods: {
        hoverIcon(index) {
            this.hoveredIndex = index;
        },
        resetIcon() {
            this.hoveredIndex = null;
        }
    },
    mounted() {
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const iconObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target === this.$refs.iconCard1) this.isIcon1Visible = true;
                    if (entry.target === this.$refs.iconCard2) this.isIcon2Visible = true;
                    if (entry.target === this.$refs.iconCard3) this.isIcon3Visible = true;
                }
            });
        }, observerOptions);

        iconObserver.observe(this.$refs.iconCard1);
        iconObserver.observe(this.$refs.iconCard2);
        iconObserver.observe(this.$refs.iconCard3);
    },
};
</script>

<style scoped>
.feature-section {
    text-align: center;
    padding: 30px 10px;
    /* Reduzido para melhor responsividade */
    margin-bottom: 50px;
}

.icon-container {
    display: flex;
    flex-wrap: wrap;
    /* Permite quebra de linha em dispositivos pequenos */
    justify-content: center;
    /* Centraliza os ícones */
}

.icon-card {
    flex: 1 1 calc(33.333% - 20px);
    /* Cada cartão ocupa 1/3 do espaço, menos margens */
    margin: 10px;
    /* Espaçamento entre os cartões */
    transition: transform 0.3s ease;
    position: relative;
    padding: 20px;
    text-align: center;
}

.icon-card:hover {
    transform: translateY(-10px);
}

.icon-card i {
    font-size: 3rem;
    transition: color 0.3s ease;
}

.hovered {
    color: #39ffbd;
    cursor: none;
}

.line {
    position: absolute;
    top: 50%;
    left: 10%;
    width: 80%;
    height: 2px;
    background-color: #ccc;
    z-index: -1;
}

.icon-title {
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
    margin: 20px 0 10px;
    /* Espaçamento em cima e embaixo do título */
}

.icon-description {
    font-size: 0.9rem;
    /* Ajustado para melhor leitura em mobile */
    text-align: center;
    font-weight: 300;
}

/* Responsividade */
@media (max-width: 768px) {
    .icon-card {
        flex: 1 1 100%;
        /* Ocupa 100% do espaço em mobile */
    }

    .icon-title {
        font-size: 1.4rem;
        /* Ajusta o tamanho da fonte do título */
    }

    .icon-description {
        font-size: 0.9rem;
        /* Ajusta o tamanho da fonte da descrição */
    }
}
</style>

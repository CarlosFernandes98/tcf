<template>
    <div class="container">
        <h1 class="title" ref="title" :class="{ 'animate': isTitleVisible }">Nossos Serviços</h1>
        <h1 class="sub-text" ref="subText" :class="{ 'animate': isSubTextVisible }">Estamos comprometidos em
            transformar suas ideias em realidade através de soluções inovadoras de impressão 3D</h1>
    </div>
</template>

<script>
export default {
    name: "ServicesIntroComponent",
    data() {
        return {
            isTitleVisible: false,
            isSubTextVisible: false,
        };
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

        // Observando os elementos
        titleObserver.observe(this.$refs.title);
        subTextObserver.observe(this.$refs.subText);
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* Adicionado padding para melhor espaçamento em mobile */
}

.title,
.sub-text {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;

}

.title.animate,
.sub-text.animate {
    opacity: 1;
    transform: translateY(0);
}

.title {
    font-weight: bold;
    font-size: 2rem;
    /* Ajuste o tamanho da fonte para mobile */
    margin-bottom: 10px;
    width: 100%;
    /* Ajustado para 100% em dispositivos móveis */
    max-width: 600px;
    /* Largura máxima para manter a legibilidade em telas maiores */
    text-align: center;
    color: rgb(255, 255, 255);
}

.sub-text {
    font-weight: 300;
    font-size: 1.5rem;
    /* Ajuste o tamanho da fonte para mobile */
    width: 100%;
    /* Ajustado para 100% em dispositivos móveis */
    max-width: 600px;
    /* Largura máxima para manter a legibilidade em telas maiores */
    text-align: center;
    color: rgb(200, 200, 200);
    font-size: 1.2rem;
}

/* Botão de compra */
.buy-now {
    background-color: white;
    color: #00aaff;
    font-size: 15px;
    /* Ajuste o tamanho da fonte para mobile */
    border: none;
    padding: 1rem 2rem;
    /* Mantenha o padding para facilitar o toque */
    cursor: pointer;
    border-radius: 5px;
    transition: transform 1.3s ease;
    display: flex;
    align-items: center;
    margin-top: 3%;
}

.buy-now i {
    margin-left: 10px;
}

.buy-now:hover {
    transform: scale(1.05) translateY(-5px);
}

/* Estilos para dispositivos móveis */
@media (max-width: 768px) {
    .title {
        font-size: 1.8rem;
        /* Tamanho reduzido para telas menores */
    }

    .sub-text {
        font-size: 1.2rem;
        /* Tamanho reduzido para telas menores */
    }

    .buy-now {
        font-size: 14px;
        /* Tamanho reduzido para o botão */
        padding: 0.8rem 1.5rem;
        /* Ajuste de padding para o botão */
    }
}
</style>

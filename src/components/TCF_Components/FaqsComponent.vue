<template>
    <div class="faq-container">
        <div class="faq-content-wrapper">
            <div class="faq-section">
                <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
                    <div class="faq-question" @click="toggleFAQ(index)">
                        <h3>{{ faq.question }}</h3>
                        <span class="arrow" :class="{ 'open': activeFAQ === index }">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                    </div>
                    <transition name="fade">
                        <div v-if="activeFAQ === index" class="faq-answer">
                            <p>{{ faq.answer }}</p>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeFAQ: null, // Controla qual FAQ está aberta
            faqs: [
                {
                    question: "O que é impressão 3D?",
                    answer: "Impressão 3D é um processo de fabricação que cria objetos tridimensionais a partir de um modelo digital, camada por camada.",
                },
                {
                    question: "Quais materiais posso usar?",
                    answer: "Utilizamos uma variedade de materiais, incluindo PLA, ABS, PETG e resinas para impressão 3D.",
                },
                {
                    question: "Qual é a precisão das impressões?",
                    answer: "A precisão depende da impressora e do material utilizados, mas geralmente podemos alcançar uma precisão de até 0,1 mm.",
                },
                {
                    question: "Quanto tempo leva para imprimir um objeto?",
                    answer: "O tempo de impressão varia com o tamanho e a complexidade do objeto, podendo levar de algumas horas a vários dias.",
                },
                {
                    question: "Posso trazer meu próprio design?",
                    answer: "Sim! Aceitamos arquivos em formatos como STL, OBJ e AMF. Se precisar de ajuda, nossa equipe pode ajudar a otimizar o seu design.",
                },
                {
                    question: "Quais são os custos de impressão?",
                    answer: "Os custos variam conforme o material, o volume e a complexidade do design. Entre em contato conosco para um orçamento personalizado.",
                },
                {
                    question: "Vocês fazem entregas?",
                    answer: "Sim, fazemos entregas em todo o país. Os custos e prazos variam conforme a localização.",
                },
                {
                    question: "Quais são as aplicações da impressão 3D?",
                    answer: "A impressão 3D pode ser usada em várias áreas, como prototipagem, produção de peças personalizadas, design de produtos, e muito mais.",
                },
            ],
        };
    },
    methods: {
        toggleFAQ(index) {
            this.activeFAQ = this.activeFAQ === index ? null : index; // Alterna entre abrir e fechar as perguntas
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* Adicionado padding para melhor espaçamento em mobile */
}

.container h2 {
    font-size: 2rem;
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
    margin-bottom: 20px;
    width: 100%;
    /* Ajustado para 100% em dispositivos móveis */
    max-width: 600px;
    /* Largura máxima para manter a legibilidade em telas maiores */
    text-align: center;
    color: rgb(200, 200, 200);
    font-size: 1.2rem;
}

.faq-container {
    display: flex;
    justify-content: center;
}

.faq-content-wrapper {
    width: 100%;
}

.faq-section {
    background: rgba(0, 0, 0, 0.325);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
}



.faq-section:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    /* Efeito de sombra ao passar o mouse */
}

.faq-section h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #ffffff;
    /* Cor do título */
    text-align: center;
}

.faq-item {
    border-bottom: 1px solid #e0e0e0;
    padding: 15px 0;
    cursor: pointer;
    /* Altera o cursor para indicar que é interativo */
}

.faq-item:last-child {
    border-bottom: none;
    /* Remove a borda do último item */
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.faq-question h3 {
    font-size: 1.0rem;
    color: #ffffff;
    /* Cor do texto das perguntas */
    margin: 0;
    /* Remove margens */
    transition: color 0.3s;
    /* Suaviza a mudança de cor */
}

.faq-question:hover h3 {
    color: #7a7a7a;
    /* Muda a cor ao passar o mouse */
}

.arrow {
    font-size: 1.5rem;
    color: #888;
    /* Cor da seta */
    transition: transform 0.3s ease, color 0.3s;
    /* Suaviza a transição */
}

.arrow.open {
    transform: rotate(180deg);
    /* Roda a seta ao abrir */
    color: #ffffff;
    /* Muda a cor da seta ao abrir */
}

.faq-answer {
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    /* Cor de fundo clara para a resposta */
}

.faq-answer p {
    margin: 0;
    color: #ffffff;
    /* Cor do texto das respostas */
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active em versões anteriores de Vue */
    {
    opacity: 0;
    /* Animação de entrada e saída */
}
</style>

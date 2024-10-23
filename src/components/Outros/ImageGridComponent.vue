<template>
    <div class="grid-container">
        <div v-for="(item, index) in cards" :key="index" class="card" :class="{ 'animate': visibleCards[index] }"
            ref="cards">
            <div class="image-container">
                <img :src="require(`@/assets/example-image/${item.image}`)" :alt="item.name" class="image">
            </div>
            <div class="card-name">{{ item.name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ImageGridComponent",
    data() {
        return {
            cards: [
                { name: "Consultoria e Definição do Projeto", image: "dev0.jpg" },
                { name: "Desenvolvimento do Modelo 3D", image: "dev3.jpeg" },
                { name: "Escolha de Materiais", image: "dev4.jpeg" },
                { name: "Impressão 3D", image: "dev2.jpeg" },
                { name: "Acabamento e Pós-Processamento", image: "dev2.jpeg" },
                { name: "Entrega e Suporte", image: "dev1.jpg" },
                { name: "Modelação 3D", image: "dev2.jpeg" },
                { name: "Prototipagem rápida", image: "dev4.jpeg" },
                { name: "Fabrico de peças personalizadas - Impressão 3D", image: "dev4.jpeg" },
                { name: "Design e otimização de peças", image: "dev4.jpeg" },
                { name: "Produção de peças de substituição", image: "dev1.jpg" },
                { name: "Consultoria técnica", image: "dev0.jpg" }
            ],
            visibleCards: []
        };
    },
    mounted() {
        this.visibleCards = Array(this.cards.length).fill(false);

        const observerOptions = {
            root: null,
            threshold: 0.1, // Detecção ao 10% do elemento estar visível
        };

        const cardObserver = new IntersectionObserver((entries) => { // Removido 'observer'
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(this.$refs.cards).indexOf(entry.target);
                    if (index !== -1) {
                        this.visibleCards.splice(index, 1, true);
                    }
                }
            });
        }, observerOptions);

        // Observa cada card
        this.$refs.cards.forEach(card => {
            cardObserver.observe(card);
        });
    }
};
</script>

<style scoped>
.grid-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    padding: 20px;
    padding-bottom: 100px;
    margin: 20px;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 1.6s ease;
    width: 300px;
}

.card.animate {
    opacity: 1;
    transform: translateY(0);
}

.card:hover {
    transform: scale(1.05);
}

.image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.image {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
    object-fit: cover;
}

.card:hover .image {
    transform: scale(1.1);
    cursor: pointer;
}

.card-name {
    margin-top: 10px;
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
    color: rgb(255, 255, 255);
}
</style>

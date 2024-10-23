<template>
    <div class="services">
        <!-- <h2>Nossos Serviços</h2> -->
        <div class="services-grid">
            <div class="service-item" v-for="(service, index) in services" :key="index">
                <i :class="service.icon"></i>
                <h3>{{ service.title }}</h3>
                <p>{{ service.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            services: [
                {
                    title: 'Ensaios Fotográficos',
                    description: 'Captura de momentos emocionantes em eventos desportivos, trazendo a energia e a paixão dos atletas para a imagem.',
                    icon: 'fas fa-camera',
                },
                {
                    title: 'Fotografia Desportiva',
                    description: 'Captura de momentos emocionantes em eventos desportivos, trazendo a energia e a paixão dos atletas para a imagem.',
                    icon: 'fas fa-camera',
                },
                {
                    title: 'Fotografia Aérea',
                    description: 'Imagens aéreas impressionantes capturadas com tecnologia de ponta, ideal para promoção de eventos e propriedades.',
                    icon: 'fas fa-paper-plane',
                },
                {
                    title: 'Desenvolvimento Web',
                    description: 'Criação de websites responsivos e funcionais, otimizados para uma experiência de utilizador intuitiva e agradável.',
                    icon: 'fas fa-laptop-code',
                },
                {
                    title: 'Soluções Web Personalizadas',
                    description: 'Desenvolvimento de soluções web adaptadas às necessidades específicas do seu negócio, aumentando a eficiência e o alcance.',
                    icon: 'fas fa-cogs',
                },
                {
                    title: 'Design Gráfico',
                    description: 'Criação de logótipos únicos que refletem a identidade da sua marca e se destacam no mercado.',
                    icon: 'fas fa-paint-brush',
                },

            ],
        };
    },
};
</script>

<style scoped>
.services {
    border-radius: 8px;
    padding: 50px;
    background-color: black;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.service-item {
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

h3 {
    color: #ffffff;
    margin: 10px 0;
}

p {
    color: #a9a9a9;
}

.service-item i {
    font-size: 40px;
    color: #ffffff;
    /* Cor do ícone */
    margin-bottom: 10px;
}
</style>
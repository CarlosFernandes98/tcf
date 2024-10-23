<template>
    <div class="services">
        <div class="container">
            <h1 class="title" ref="title" :class="{ 'animate': true }">Nossos Serviços</h1>
            <h1 class="sub-text" ref="subText" :class="{ 'animate': isSubTextVisible }">Estamos comprometidos em
                transformar suas ideias em realidade através de soluções inovadoras de impressão 3D</h1>
        </div>
        <ServiceCarousel1Component />
        <ServiceCarousel2Component />
        <ServiceCarousel3Component />
        <div class="container">
            <h1 class="title" ref="title" :class="{ 'animate': isTitleVisible }">Perguntas Frequentes</h1>
        </div>
        <FaqsComponent />
    </div>

</template>

<script>
import FaqsComponent from '@/components/TCF_Components/FaqsComponent.vue';
import ServiceCarousel1Component from '@/components/TCF_Components/ServiceCarousel1Component.vue';
import ServiceCarousel2Component from '@/components/TCF_Components/ServiceCarousel2Component.vue';
import ServiceCarousel3Component from '@/components/TCF_Components/ServiceCarousel3Component.vue';

export default {
    components: {
        FaqsComponent,
        ServiceCarousel1Component,
        ServiceCarousel2Component,
        ServiceCarousel3Component,
    },
    data() {

        return {
            isTitleVisible: false,
            isSubTextVisible: false,
            services: [
                {
                    title: "Fotografia",
                    description: "Eventos, retratos, produtos e mais.",
                    icon: "fas fa-camera",
                },
                {
                    title: "Criação de Marcas",
                    description: "Serviços de branding, design de logotipo, etc.",
                    icon: "fas fa-pencil-alt",
                },
                {
                    title: "Web Solutions",
                    description: "Criação de sites, manutenção e SEO.",
                    icon: "fas fa-laptop-code",
                },
            ],
        };
    },
    // mounted() {
    //     const observerOptions = {
    //         root: null, // Usando viewport como padrão
    //         threshold: 0.1, // Detecção ao 10% do elemento estar visível
    //     };

    //     const titleObserver = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting && !this.isTitleVisible) {
    //                 requestAnimationFrame(() => {
    //                     this.isTitleVisible = true;
    //                 });
    //             }
    //         });
    //     }, observerOptions);

    //     const subTextObserver = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting && !this.isSubTextVisible) {
    //                 requestAnimationFrame(() => {
    //                     this.isSubTextVisible = true;
    //                 });
    //             }
    //         });
    //     }, observerOptions);

    //     // Observando os elementos
    //     titleObserver.observe(this.$refs.title);
    //     subTextObserver.observe(this.$refs.subText);
    // }
};
</script>

<style scoped>
.services {
    text-align: center;
    padding: 2rem;
}

.service-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 50px;
}

.service-item {
    width: 22%;
    margin: 1rem;
    padding: 1rem;
    border-radius: 8px;
    transition: transform 0.3s;
}

.service-item:hover {
    transform: translateY(-5px);
}

.icon {
    font-size: 3rem;
    color: #4a90e2;
    margin-bottom: 0.5rem;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
}


.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
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


}
</style>
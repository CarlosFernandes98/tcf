<template>
    <div class="container">
        <h1 class="title" ref="title" :class="{ 'animate': isTitleVisible }">Nossos Serviços</h1>
        <h1 class="sub-text" ref="subText" :class="{ 'animate': isSubTextVisible }">Estamos comprometidos em
            transformar suas ideias em realidade através de soluções inovadoras de impressão 3D</h1>
    </div>
</template>

<script>
export default {
    name: "InfoComponent",
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
    margin-bottom: 10px;
    width: 60%;
    text-align: center;
    color: rgb(255, 255, 255);
}

.sub-text {
    font-weight: 300;
    font-size: 1.5rem;
    margin-bottom: 20px;
    width: 60%;
    text-align: center;
    color: rgb(200, 200, 200);
    padding-bottom: 10px;
}

.buy-now {
    background-color: white;
    color: #00aaff;
    font-size: 15px;
    border: none;
    padding: 1rem 2rem;
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
</style>
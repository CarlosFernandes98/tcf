<template>
    <div class="container">
        <div class="gallery-section" v-if="isLoaded">
            <div v-if="selectedPortfolio">
                <h2>{{ selectedPortfolio.title }}</h2>
                <p>{{ selectedPortfolio.description }}</p>
                <div class="gallery-grid">
                    <div v-for="(image, index) in displayedImages" :key="index" class="gallery-item"
                        @click="openModal(index)">
                        <img :src="require(`@/assets/albums/${image}`)" class="gallery-image"
                            alt="Imagem do Portfólio" />
                    </div>
                </div>
                <!-- Botão "Show More" -->
                <button v-if="hasMoreImages" @click="showMoreImages" class="show-more-button">Show More</button>
            </div>
            <div v-else>
                <p>Portfólio não encontrado.</p>
            </div>
        </div>
        <div v-else class="loader">
            <svg class="loader-circle" viewBox="0 0 50 50">
                <circle class="loader-path" cx="25" cy="25" r="20"></circle>
            </svg>
            <p>Carregando portfólio...</p>
        </div>

    </div>
    <!-- Modal for large image display -->
    <div class="modal" v-if="isModalOpen" @click="closeModal">
        <span class="close" @click.stop="closeModal">&times;</span>
        <img :src="currentImage" class="modal-image" @click.stop />
        <div class="nav-buttons">
            <button class="nav-button left" @click.stop="prevImage">&lt;</button>
            <button class="nav-button right" @click.stop="nextImage">&gt;</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedPortfolio: null,
            portfolios: [],
            isModalOpen: false,
            currentIndex: 0,
            isLoaded: false,
            visibleImagesCount: 20, // Número inicial de imagens a serem exibidas
        };
    },
    computed: {
        filteredPortfolio() {
            const idFromUrl = this.$route.params.id;
            return this.portfolios.find(portfolio => portfolio.id.toString() === idFromUrl);
        },
        currentImage() {
            return this.selectedPortfolio
                ? require(`@/assets/albums/${this.selectedPortfolio.images[this.currentIndex]}`)
                : '';
        },
        displayedImages() {
            // Retorna as imagens que devem ser exibidas
            return this.selectedPortfolio ? this.selectedPortfolio.images.slice(0, this.visibleImagesCount) : [];
        },
        hasMoreImages() {
            // Verifica se há mais imagens para mostrar
            return this.selectedPortfolio && this.selectedPortfolio.images.length > this.visibleImagesCount;
        },
    },
    methods: {
        async fetchPortfolios() {
            try {
                const response = await axios.get('/JsonFiles/works.json');
                this.portfolios = response.data;
                this.selectedPortfolio = this.filteredPortfolio;
                this.isLoaded = true;
            } catch (error) {
                console.error('Erro ao buscar os portfólios:', error);
            }
        },
        openModal(index) {
            this.isModalOpen = true;
            this.currentIndex = index;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        nextImage() {
            if (this.selectedPortfolio && this.selectedPortfolio.images.length > 0) {
                this.currentIndex = (this.currentIndex + 1) % this.selectedPortfolio.images.length;
            }
        },
        prevImage() {
            if (this.selectedPortfolio && this.selectedPortfolio.images.length > 0) {
                this.currentIndex = (this.currentIndex - 1 + this.selectedPortfolio.images.length) % this.selectedPortfolio.images.length;
            }
        },
        showMoreImages() {
            this.visibleImagesCount += 20; // Aumenta o número de imagens visíveis
        },
    },
    mounted() {
        this.fetchPortfolios();
    }
};
</script>

<style scoped>
/* Estilo para o botão "Show More" */
.show-more-button {
    margin: 20px auto;
    /* Centraliza o botão */
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.show-more-button:hover {
    background-color: #0056b3;
    /* Cor ao passar o mouse */
}

.container {
    position: relative;
    display: flex;
    flex-direction: column;
    color: #333;
    margin-bottom: 20px;
}

.gallery-section {
    margin: 20px 0;
    text-align: center;
    color: white;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    margin-top: 10px;
    margin: 50px;
    gap: 10px;
    /* Define o espaço entre os itens */

}

.gallery-item {
    position: relative;
    /* Para o título ser posicionado sobre a imagem */
    overflow: visible;
    /* Permite que a imagem aumente de tamanho sem ser cortada */


}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
    /* Animação ao passar o mouse */
}

.gallery-item:hover .gallery-image {
    transform: scale(1.1);
    /* Efeito de zoom ao passar o mouse */
    z-index: 1;
    /* A imagem deve estar acima do fundo */
}

.image-title {
    position: absolute;
    /* Para sobrepor o título na imagem */
    bottom: 10px;
    /* Distância do fundo da imagem */
    left: 50%;
    transform: translateX(-50%) scale(1);
    /* Mantém o tamanho padrão */
    color: white;
    /* Cor do texto */
    padding: 5px 10px;
    /* Espaçamento interno */
    font-size: 16px;
    /* Tamanho da fonte do título */
    text-align: center;
    /* Centraliza o texto do título */
    opacity: 0;
    /* Começa invisível */
    transition: opacity 0.3s, transform 0.3s;
    /* Suaviza a transição */
    z-index: 2;
    /* Garante que o título fique acima da imagem */
}

.gallery-item:hover .image-title {
    opacity: 1;
    /* Título aparece ao passar o mouse */
    transform: translateX(-50%) scale(1.1);
    /* Aumenta o tamanho do texto junto com a imagem */
}

/* Adicionando um z-index para o item da galeria */
.gallery-item:hover {
    z-index: 10;
    /* Aumenta o z-index do item da galeria ao passar o mouse */
}


.search-container {
    position: relative;
    width: 50%;
    margin: 50px;
}

.search-input {
    width: 100%;
    padding: 12px 40px 12px 20px;
    /* Adiciona espaço para o ícone */
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 25px;
    /* Arredondar as bordas */
    transition: border-color 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* Sombra para efeito 3D */
    padding-left: 50px;
}

.search-input:focus {
    outline: none;
    border-color: #007BFF;
    /* Cor ao focar */
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    /* Sombra ao focar */
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    /* Cor do ícone */
    pointer-events: none;
    /* Não interage com o clique */
    font-size: 18px;
    /* Tamanho do ícone */
}


/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    /* Altera a direção do flex para coluna */
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal-image {
    max-width: 90%;
    max-height: 80%;
    border-radius: 10px;
}

.close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 30px;
    cursor: pointer;
}

.nav-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* Alinha os itens no centro verticalmente */
    width: 90%;
    padding: 0 20px;
    position: absolute;
    bottom: 50%;
    /* Mover para o meio verticalmente */
    transform: translateY(50%);
    /* Ajuste para centralizar verticalmente */
}

.nav-button {
    background: none;
    border: none;
    color: #505050;
    font-size: 30px;
    cursor: pointer;
    transition: color 0.3s;
    height: 60px;
    /* Ajuste conforme necessário */
    display: flex;
    align-items: center;
    /* Centraliza o texto dentro do botão verticalmente */
}


.nav-button:hover {
    color: #ccc;
}

.loader {
    text-align: center;
    font-size: 20px;
    color: #666;
    margin: 50px 0;
}

.loader-circle {
    animation: rotate 1s linear infinite;
    width: 50px;
    height: 50px;
}

.loader-path {
    stroke: #007BFF;
    stroke-width: 4;
    fill: none;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        transform: rotate(0deg);
    }

    50% {
        stroke-dasharray: 90, 150;
        transform: rotate(180deg);
    }

    100% {
        stroke-dasharray: 90, 150;
        transform: rotate(360deg);
    }
}
</style>

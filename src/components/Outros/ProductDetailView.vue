<template>
    <div class="product-detail-container">
        <div class="product-detail-wrapper">
            <div class="product-images">
                <img :src="getImageUrl(product.image)" alt="Product image" class="product-image"
                    @load="imageLoaded = true" @error="imageError = true" />
                <!-- <div v-if="imageError && imageLoaded" class="error-message">Image could not be loaded.</div> -->
            </div>
            <div class="product-info">
                <h1 class="product-name">{{ product.name }}</h1>
                <p class="product-description">{{ product.description }}</p>
                <p class="product-price">Price: {{ product.price }}</p>

                <p class="product-rating">
                    Rating:
                    <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= product.rating }">★</span>
                </p>

                <div class="quantity-section">
                    <label for="quantity">Quantity:</label>
                    <input type="number" v-model="quantity" min="1" max="10" class="quantity-input" />
                </div>

                <button class="buy-now" @click="handleBuyNow">Buy Now</button>

                <router-link to="/store">
                    <button class="back-to-store">Back to Store</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "ProductDetailView",
    data() {
        return {
            product: {},
            quantity: 1,
            imageError: false, // Para gerenciar erros de imagem
            imageLoaded: false, // Para gerenciar se a imagem foi carregada
        };
    },
    mounted() {
        this.fetchProduct();
    },
    methods: {
        async fetchProduct() {
            const productId = this.$route.params.id;
            try {
                const response = await axios.get(`http://localhost:3000/products/${productId}`);
                this.product = response.data;
            } catch (error) {
                console.error('Erro ao buscar produto:', error);
            }
        },
        getImageUrl(imagePath) {
            return `http://localhost:3000/${imagePath}`;
        },
        handleBuyNow() {
            alert(`You have selected ${this.quantity} of ${this.product.name}`);
        },
    },
};
</script>

<style scoped>
/* Container principal que centraliza o conteúdo */
.product-detail-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f9;
    padding: 20px;
}

/* Wrapper do conteúdo, organiza as colunas */
.product-detail-wrapper {
    display: flex;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 1200px;
    width: 100%;
}

/* Coluna das imagens do produto */
.product-images {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.product-image {
    width: 300px;
    /* Defina uma largura fixa para a imagem */
    height: 300px;
    /* Defina uma altura fixa para a imagem */
    border-radius: 8px;
    object-fit: cover;
    /* Mantém a proporção da imagem enquanto preenche a área */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Mensagem de erro ao carregar a imagem */
.error-message {
    color: red;
    margin-top: 10px;
}

/* Coluna da descrição do produto */
.product-info {
    flex: 1;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.product-name {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #1e2f97;
}

.product-description {
    font-size: 1rem;
    margin-bottom: 20px;
    color: #666;
    line-height: 1.6;
}

.product-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1e2f97;
    margin-bottom: 20px;
}

/* Avaliação do produto */
.product-rating {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #1e2f97;
}

.star {
    font-size: 1.2rem;
    color: #ccc;
}

.star.filled {
    color: #ffcc00;
}

/* Seção de quantidade */
.quantity-section {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #1e2f97;
}

.quantity-input {
    width: 60px;
    padding: 5px;
    font-size: 1rem;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* Botão de comprar */
.buy-now {
    background-color: #28a745;
    color: white;
    font-size: 1rem;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;
}

.buy-now:hover {
    background-color: #218838;
}

/* Botão de voltar */
.back-to-store {
    background-color: #1e2f97;
    color: white;
    font-size: 1rem;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-to-store:hover {
    background-color: #005fa3;
}
</style>

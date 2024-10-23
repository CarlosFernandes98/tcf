<template>
    <div class="download-container">
        <div class="introduction" ref="introSection" :class="{ 'animate': isIntroVisible }">
            <div class="intro-text-container">
                <h2 class="download-title">Revima Models Download</h2>
                <p class="intro-text">Faz download das nossas peças no formato STL</p>
            </div>
        </div>
        <div class="models-container">
            <RevimaModelsComponent />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import RevimaModelsComponent from '@/components/TCF_Components/RevimaModelsComponent.vue';



export default {
    name: "RevimaModelsView",
    components: {
        RevimaModelsComponent
    },
    data() {
        return {
            downloadItems: [], // Armazena os itens baixados
            loading: true, // New loading state
            // filterOwner: 'NomeDoOwner', // Exemplo de proprietário a ser filtrado
        }
    },
    async mounted() {
        await this.fetchModelsItems(); // Certifique-se de que os dados estão sendo buscados
    },
    methods: {
        async fetchModelsItems() {
            this.loading = true; // Start loading
            try {
                const response = await axios.get('http://localhost:3000/revima-api/files/');

                console.log('Raw data from API:', response.data);

                // Verificar se todos os itens têm o campo 'owner'
                response.data.forEach(item => {
                    console.log(`Owner do item ${item.id}:`, item.owner);
                });

                this.downloadItems = response.data
                    .filter(item => item.owner && item.owner.toLowerCase().includes('revima')) // Usando 'revima' em letras minúsculas
                    .map(item => ({
                        id: item.id,
                        image: item.image,
                        title: item.name || 'Sem título',
                        description: item.description || 'Sem descrição',
                        price: item.price || 0,
                        rating: item.rating || 0,
                        likes: item.likes || 0,
                        downloads: item.downloads || 0,
                        publisherName: item.publisherName || 'Without Publisher Name',
                        publisherImage: item.publisherImage || 'Without Publisher Image',
                        category: item.category || this.exampleCategories[Math.floor(Math.random() * this.exampleCategories.length)],
                        filePath: item.file_path || '',
                        owner: item.owner || 'Without Owner Name',
                        submissionDate: new Date(item.submissionDate).toLocaleDateString() || 'Sem data',
                        animation: 'none'
                    }));
                console.log('Processed download items:', this.downloadItems);
            } catch (error) {
                console.error('Erro ao buscar itens do portfólio:', error);
            } finally {
                this.loading = false; // Stop loading
            }
        }
    },
};
</script>

<style>
.download-container {
    padding: 40px;
    background-color: #f9f9f9;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.download-title {
    font-size: 24px;
    color: #3b554a;
}

.intro-text {
    font-size: 16px;
    color: #666;
}


.upload-button {
    padding: 10px 20px;
    background-color: #484848;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.upload-button i {
    margin-right: 5px;
}

.upload-button:hover {
    background-color: #333333;
}

.components-container {
    display: flex;
    /* Utiliza flexbox para alinhar os componentes */
    justify-content: space-between;
    /* Espaçamento entre os componentes */
    align-items: stretch;
    /* Certifica-se de que os componentes se estendam na altura */
    /* Cor de fundo do contêiner */
    /* Espaçamento interno para evitar que os componentes toquem as bordas */
    box-sizing: border-box;
    /* Inclui o padding na largura total */
    max-width: 100%;
    /* Garante que o contêiner não ultrapasse a largura da tela */
    overflow: hidden;
    /* Esconde qualquer transbordamento */
}


.models-container {
    justify-content: space-between;
}

/* Carousel will take 30% of the width */
.carousel-container {
    flex: 0 0 30%;
    margin-right: 10px;
}

/* TopSix will take 70% of the width */
.top-six-container {
    flex: 0 0 70%;
}

.introduction {
    position: relative;
    /* Torna o contêiner do texto o pai relativo para o botão absoluto */
    display: flex;
    justify-content: center;
    /* Centraliza o texto horizontalmente */
    align-items: center;
    /* Centraliza o texto verticalmente */
    margin-bottom: 30px;
    /* Ajuste a altura conforme necessário */
}

.intro-text-container {
    text-align: center;
    /* Centraliza o texto dentro do contêiner */
}

.upload-button {
    position: absolute;
    /* Permite que o botão se sobreponha ao texto */
    right: 20px;
    /* Alinha o botão à direita */
    top: 50%;
    /* Centraliza verticalmente em relação ao contêiner */
    transform: translateY(-50%);
    /* Ajusta o botão para ficar centrado verticalmente */
    padding: 10px 20px;
    background-color: #484848;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.upload-button:hover {
    background-color: #333333;
}

.all-products-container {
    padding: 30px;
    /* Add padding of 10px */
}

.view-more-button {
    display: block;
    /* Para garantir que o botão esteja em uma nova linha */
    margin: 20px auto;
    /* Centraliza o botão */
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.view-more-button:hover {
    background-color: #0056b3;
}
</style>

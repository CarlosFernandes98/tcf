<template>
    <div class="download-container">
        <div class="introduction" ref="introSection" :class="{ 'animate': isIntroVisible }">
            <div class="intro-text-container">
                <h2 class="download-title">Área Download</h2>
                <p class="intro-text">Faz download das nossas peças no formato STL</p>
            </div>
            <button class="upload-button" @click="showUploadForm = true">
                <i class="fas fa-upload"></i> Enviar Ficheiro
            </button>
        </div>
        <div class="components-container">
            <DownloadCarouselComponent />
            <div class="top-six-container">
                <TopEightComponent />
            </div>
        </div>
        <!-- <div class="models-container">
            <models-component v-if="downloadItems.length > 0" :download-items="downloadItems"
                :filter-owner="'Revima'"></models-component>
            <p v-else>A carregar itens...</p>

            <models-component v-if="downloadItems.length > 0" :download-items="downloadItems"
                :filter-owner="'Community'"></models-component>
            <p v-else>A carregar itens...</p>
        </div> -->

        <div class="models-container">
            <models-component v-if="downloadItems.length > 0" :key="refreshKey" :download-items="downloadItems"
                :filter-owner="'Revima'">
            </models-component>
            <models-component v-if="downloadItems.length > 0" :key="refreshKey" :download-items="downloadItems"
                :filter-owner="'Community'">
            </models-component>
            <p v-else>A carregar itens...</p>
        </div>
    </div>
    <UploadFormComponent v-if="showUploadForm" @file-uploaded="handleFileUploaded" @close="showUploadForm = false" />
</template>

<script>
import axios from 'axios';
// import RevimaModelsComponent from "@/components/Revima/RevimaModelsComponent.vue";
import DownloadCarouselComponent from "@/components/TCF_Components/DownloadCarouselComponent.vue";
import TopEightComponent from "@/components/TCF_Components/TopEightComponent.vue";
import UploadFormComponent from "@/components/TCF_Components/UploadFormComponent.vue";
// import CommunityModelsComponent from "@/components/Revima/CommunityModelsComponent.vue";
import ModelsComponent from "@/components/TCF_Components/ModelsComponent.vue";


export default {
    name: "HomeView",
    components: {
        TopEightComponent,
        DownloadCarouselComponent,
        UploadFormComponent,
        // RevimaModelsComponent,
        // CommunityModelsComponent,
        ModelsComponent
    },
    data() {
        return {
            showUploadForm: false,
            downloadItems: [], // Armazena os itens baixados
            loading: true, // New loading state
            // filterOwner: 'NomeDoOwner', // Exemplo de proprietário a ser filtrado
        }
    },
    async mounted() {
        await this.fetchModelsItems(); // Certifique-se de que os dados estão sendo buscados
    },
    methods: {
        handleFileUploaded() {
            // A função que você quer chamar ao receber o evento
            console.log('Arquivo foi enviado com sucesso!');
            this.$router.go(0); // Recarregar a página atual
        },
        async fetchModelsItems() {
            this.loading = true; // Start loading
            try {
                const response = await axios.get('http://localhost:3000/revima-api/files/');

                console.log('Raw data from API:', response.data);

                this.downloadItems = response.data.map(item => ({
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
    openModal(index) {
        this.isModalOpen = true;
        this.currentIndex = index;
    },
    closeModal() {
        this.isModalOpen = false;
    },
    handleFileUpload() {
        // Logic to handle file upload
        // You could open a file dialog, for example
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.stl'; // Accept only STL files
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                console.log('Selected file:', file);
                // You can handle the file upload to the server here
            }
        };
        fileInput.click(); // Programmatically click the file input
    },
    viewMore(owner) {
        // Logic to handle "View More" action
        console.log(`Ver mais itens de: ${owner}`);
        // Você pode redirecionar ou abrir um modal aqui
        // Exemplo: this.$router.push({ name: 'ModelDetails', params: { owner } });
    }
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

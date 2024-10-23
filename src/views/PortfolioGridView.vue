<template>
    <div class="container">
        <div class="gallery-section" v-if="isLoaded">
            <!-- <div class="search-container">
                <input type="text" v-model="searchQuery" placeholder="Procurar por título..." class="search-input" />
                <i class="fas fa-search search-icon"></i>
            </div> -->
            <div class="tags-container">
                <span v-for="tag in uniqueTags" :key="tag" @click="toggleTag(tag)"
                    :class="['tag', { active: selectedTags.includes(tag) }]">
                    {{ tag }}
                </span>
            </div>
            <div class="gallery-grid">
                <router-link v-for="work in filteredWorks" :key="work.id"
                    :to="{ name: 'details', params: { id: work.id } }" class="gallery-item">
                    <img v-if="work.images.length > 0" :src="require(`@/assets/albums/${work.images[0]}`)"
                        class="gallery-image" alt="Galeria de Imagens" />
                    <p class="image-title">{{ work.title }}</p>
                </router-link>
            </div>
        </div>
        <div v-else class="loader">
            <p>Carregando imagens...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            // searchQuery: '',
            works: [],
            selectedTags: [],
            isLoaded: false,
            isModalOpen: false,
            currentIndex: 0,
        };
    },
    computed: {
        uniqueTags() {
            const tagsSet = new Set();
            this.works.forEach(work => {
                work.tags.forEach(tag => tagsSet.add(tag));
            });
            return Array.from(tagsSet);
        },
        filteredWorks() {
            return this.works.filter(work => {
                // const matchesSearch = work.title.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesTags = this.selectedTags.length === 0 || work.tags.some(tag => this.selectedTags.includes(tag));
                // return matchesSearch && matchesTags;
                return matchesTags;
            });
        },
    },
    methods: {
        async fetchWorks() {
            try {
                const response = await axios.get('/JsonFiles/works.json');
                this.works = response.data;

                console.log("Dados recebidos: ", this.works);
                this.isLoaded = true;

            } catch (error) {
                console.error('Erro ao buscar as imagens:', error);
            }
        },
        toggleTag(tag) {
            const index = this.selectedTags.indexOf(tag);
            if (index > -1) {
                this.selectedTags.splice(index, 1); // Remove a tag se já estiver selecionada
            } else {
                this.selectedTags.push(tag); // Adiciona a tag se não estiver selecionada
            }
        },
    },
    mounted() {
        this.fetchWorks();
    },
};
</script>

<style scoped>
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
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    margin-top: 10px;
    margin: 50px;
    gap: 10px;
}

.gallery-item {
    position: relative;
    overflow: visible;
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;

}

.gallery-item:hover .gallery-image {
    transform: scale(1.1);
    z-index: 1;
}

.image-title {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%) scale(1);
    color: white;
    padding: 5px 10px;
    font-size: 16px;
    text-align: center;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    z-index: 2;
}

.gallery-item:hover .image-title {
    opacity: 1;
    transform: translateX(-50%) scale(1.1);
}

.search-container {
    position: relative;
    width: 50%;
    margin: 50px;
}

.search-input {
    width: 100%;
    padding: 12px 40px 12px 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 25px;
    transition: border-color 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding-left: 50px;
}

.search-input:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #aaa;
    pointer-events: none;
    font-size: 18px;
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
    width: 90%;
    padding: 0 20px;
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
}

.nav-button {
    background: none;
    border: none;
    color: #505050;
    font-size: 30px;
    cursor: pointer;
    transition: color 0.3s;
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


.tags-container {
    margin: 20px 0;
}

.tag {
    display: inline-block;
    margin: 5px;
    padding: 8px 15px;
    background-color: #007BFF;
    color: white;
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.tag.active {
    background-color: #0056b3;
    /* Cor quando a tag está ativa */
}

.tag:hover {
    background-color: #0056b3;
}
</style>

<template>
    <div class="blog-container">
        <header class="blog-header">
            <h1 class="blog-title">Tutoriais e Dicas sobre Impressão 3D</h1>
            <p class="blog-subtitle">Explore uma variedade de tutoriais, dicas e truques para maximizar seu uso da
                impressão 3D.</p>
        </header>

        <main class="blog-content">
            <article class="blog-post" v-for="post in posts" :key="post.id">
                <h2 class="post-title">{{ post.title }}</h2>
                <p class="post-date">{{ post.date }}</p>
                <p class="post-excerpt">{{ post.excerpt }}</p>
                <button class="read-more" @click="viewPost(post.id)">Ler Mais</button>
            </article>
        </main>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "BlogView",
    data() {
        return {
            posts: [] // Inicializa como um array vazio
        };
    },
    mounted() {
        this.fetchPosts();
    },
    methods: {
        async fetchPosts() {
            try {
                // Faz a chamada à API para obter os posts
                const response = await axios.get('http://localhost:3000/posts'); // URL do backend que serve os posts
                this.posts = response.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    date: post.date,
                    excerpt: post.content.substring(0, 100) + '...' // Cria um resumo do conteúdo
                }));
            } catch (error) {
                console.error("Erro ao buscar os posts:", error);
            }
        },
        viewPost(postId) {
            this.$router.push({ name: 'PostDetailView', params: { id: postId } });
        }
    }
};
</script>

<style scoped>
.blog-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.blog-header {
    text-align: center;
    margin-bottom: 3rem;
}

.blog-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #000000;
}

.blog-subtitle {
    font-size: 1.2rem;
    font-weight: 300;
    color: #ffffff;
}

/* Configura a área de posts como um grid */
.blog-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Define 3 colunas */
    gap: 1rem;
    /* Espaço entre os posts */
    width: 100%;
    max-width: 1200px;
    margin-bottom: 30px;
}

.blog-post {
    padding: 1.5rem;
    border-radius: 5px;
    transition: box-shadow 0.3s ease;
    color: #2f2f2f;
    background-color: white;
}

.blog-post:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.post-title {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #2f2f2f
}

.post-date {
    font-size: 0.9rem;
    color: #999999;
    margin-bottom: 1rem;
}

.post-excerpt {
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.read-more {
    background-color: rgb(72, 72, 72);
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.read-more:hover {
    transform: scale(1.05);
}

.blog-sidebar {
    flex: 1;
    margin-left: 2rem;
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 5px;
}

.blog-sidebar h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.blog-sidebar ul {
    list-style-type: none;
    padding: 0;
}

.blog-sidebar li {
    margin-bottom: 0.5rem;
}

.blog-sidebar a {
    text-decoration: none;
    color: #2f2f2f;
}

.blog-sidebar a:hover {
    text-decoration: underline;
}
</style>

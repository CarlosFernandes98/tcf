<template>
    <div class="post-detail-container">
        <header class="post-detail-header">
            <h1 class="post-title">{{ post.title }}</h1>
            <!-- <p class="post-date">{{ post.date }}</p> -->
            <p class="post-author">Por {{ post.author }}</p>
        </header>
        <div class="post-content">
            <p>{{ post.content }}</p>
        </div>
        <router-link to="/blog">
            <button class="back-button">Voltar para Tutoriais</button>
        </router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "PostDetailView",
    data() {
        return {
            post: {},
        };
    },
    mounted() {
        this.fetchPost();
    },
    methods: {
        async fetchPost() {
            const postId = this.$route.params.id; // Get the post ID from the route
            try {
                const response = await axios.get(`http://localhost:3000/posts/${postId}`);
                this.post = response.data; // Assign the response data to the post
            } catch (error) {
                console.error('Erro ao buscar o post:', error);
            }
        },
    },
};
</script>

<style scoped>
.post-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}

.post-detail-header {
    text-align: center;
    margin-bottom: 2rem;
    color: rgb(22, 22, 22)
}

.post-title {
    font-size: 2.5rem;
    font-weight: bold;
}

.post-date {
    font-size: 1rem;
    color: #999999;
}

.post-author {
    font-size: 1rem;
    color: #999999;
}

.post-content {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #333333;
    margin: 30px 130px 60px 130px;
    text-align: justify;
}

.back-button {
    background-color: rgb(72, 72, 72);
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    margin-bottom: 30px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
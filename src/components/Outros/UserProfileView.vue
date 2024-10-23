<!-- <template>
    <div class="user-profile">
        <h2>Perfil do Utilizador</h2>
        <div v-if="loading" class="loading">Carregando...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
            <div class="profile-image">
                <img :src="user.profilePicture || defaultProfilePicture" alt="Foto do Utilizador" />
            </div>
            <div class="profile-details">
                <p><strong>ID:</strong> {{ user._id }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Nome Completo:</strong> {{ user.fullName }}</p>
                <p><strong>Biografia:</strong> {{ user.bio || 'Sem biografia disponível' }}</p>
                <p><strong>Interesses:</strong> {{ user.interests.length > 0 ? user.interests.join(', ') :
                    'Sem interesses' }}</p>
                <p><strong>Impressoras:</strong></p>
                <ul>
                    <li v-for="printer in user.printers" :key="printer._id">
                        <strong>{{ printer.brand }} {{ printer.model }}</strong>: {{ printer.specifications }}
                    </li>
                </ul>
                <p><strong>Tipo de Conta:</strong> {{ user.accountType }}</p>
                <button @click="editUser" class="edit-button">Editar</button>
            </div>
        </div>
    </div>
</template> -->
<template>
    <div class="container">
        <div class="profile-container">
            <div class="left-side">
                <h2 class="text" ref="profileTitle" :class="{ 'animate': isProfileTitleVisible }">Perfil do Utilizador
                </h2>
                <p class="subtext" ref="profileSubtext" :class="{ 'animate': isProfileSubtextVisible }">
                    Veja as informações do seu perfil e personalize conforme necessário.
                </p>
                <div class="buttons">
                    <button class="edit-button" @click="editUser" ref="editButton"
                        :class="{ 'animate': isButtonVisible }">
                        Editar Perfil
                    </button>
                </div>
            </div>
            <div class="right-side">
                <div class="profile-image" ref="profileImage" :class="{ 'animate': isImageVisible }">
                    <img :src="user.profilePicture || defaultProfilePicture" alt="Foto do Utilizador" />
                </div>
                <div class="profile-details">
                    <p><strong>ID:</strong> {{ user._id }}</p>
                    <p><strong>Email:</strong> {{ user.email }}</p>
                    <p><strong>Nome Completo:</strong> {{ user.fullName }}</p>
                    <p><strong>Biografia:</strong> {{ user.bio || 'Sem biografia disponível' }}</p>
                    <p><strong>Interesses:</strong> {{ user.interests && user.interests.length > 0 ?
                        user.interests.join(', ') : 'Sem interesses' }}</p>
                    <p><strong>Impressoras:</strong></p>
                    <ul>
                        <li v-for="printer in user.printers" :key="printer._id">
                            <strong>{{ printer.brand }} {{ printer.model }}</strong>: {{ printer.specifications }}
                        </li>
                    </ul>
                    <p><strong>Tipo de Conta:</strong> {{ user.accountType }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import defaultProfilePicture from '../assets/OIP.jpg'; // Ajuste do caminho

export default {
    data() {
        return {
            // user: {},
            // loading: true,
            // error: null,
            // defaultProfilePicture
            user: {},
            loading: true,
            error: null,
            defaultProfilePicture,
            isProfileTitleVisible: false,
            isProfileSubtextVisible: false,
            isImageVisible: false,
            isButtonVisible: false,
        };
    },
    async created() {
        const userId = localStorage.getItem('userId'); // Obtém o ID do usuário armazenado
        const token = localStorage.getItem('token'); // Obtém o token armazenado

        try {
            const response = await fetch(`http://localhost:3000/revima-api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Passa o token no cabeçalho
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao obter os dados do usuário');
            }

            this.user = await response.json(); // Armazena os dados do usuário
        } catch (err) {
            this.error = 'Não foi possível carregar os dados do perfil. Tente novamente mais tarde.'; // Mensagem de erro mais amigável
        } finally {
            this.loading = false; // Atualiza o estado de carregamento
        }
    },
    methods: {
        editUser() {
            this.$router.push(`/edit-user/${this.user._id}`); // Redireciona para a página de edição do usuário
        },
    },
    mounted() {
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isProfileTitleVisible = true;
                }
            });
        }, observerOptions);

        const subTextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isProfileSubtextVisible = true;
                }
            });
        }, observerOptions);

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isImageVisible = true;
                }
            });
        }, observerOptions);

        const buttonObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isButtonVisible = true;
                }
            });
        }, observerOptions);

        titleObserver.observe(this.$refs.profileTitle);
        subTextObserver.observe(this.$refs.profileSubtext);
        imageObserver.observe(this.$refs.profileImage);
        buttonObserver.observe(this.$refs.editButton);
    },
};
</script>

<style scoped>
.container {
    background-color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: 20px;
    margin: auto;

}

.profile-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
}

.left-side {
    width: 50%;
    padding: 40px;
}

.right-side {
    width: 50%;
    padding: 40px;
}

.text,
.subtext,
.edit-button,
.profile-image img {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.6s ease, transform 0.6s ease;
}

.text.animate,
.subtext.animate,
.edit-button.animate,
.profile-image.animate img {
    opacity: 1;
    transform: translateY(0);
}

.text {
    font-weight: bold;
    font-size: 2.5rem;
    color: #007bff;
    margin-bottom: 20px;
}

.subtext {
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
}

.profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    border: 3px solid #007bff;
}

.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.buttons {
    margin-top: 20px;
}

.edit-button {
    background-color: #007bff;
    color: white;
    font-size: 16px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.edit-button:hover {
    transform: scale(1.05);
}

.profile-details {
    color: black;
}


@media (max-width: 600px) {
    .profile-container {
        flex-direction: column;
        align-items: center;
    }

    .left-side,
    .right-side {
        width: 100%;
        padding: 20px;
    }

    .edit-button {
        width: 100%;
    }
}
</style>

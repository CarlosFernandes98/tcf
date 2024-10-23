<template>
    <div class="container">
        <div class="content-wrapper">
            <div class="text-section">
                <h2>Registe-se na Revima</h2>
                <p>Crie conta para aceder a todas as nossas funcionalidades.</p>
            </div>

            <div class="form-section">
                <div class="logo">
                    <router-link to="/">
                        <img src="@/assets/RevimaLogoWhite.png" alt="Logo" />
                    </router-link>
                </div>

                <form @submit.prevent="register">
                    <div class="back-button">
                        <button @click.prevent="goBack" aria-label="Voltar atrás">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                    </div>
                    <div class="intro-text">
                        <h2>Cria conta na Revima</h2>
                    </div>

                    <h1 class="register-text">Registo</h1>
                    <input v-model="email" type="email" placeholder="Email" required aria-label="Email" />
                    <input v-model="password" type="password" placeholder="Password" required aria-label="Password" />
                    <input v-model="confirm_password" type="password" placeholder="Confirma a Password" required
                        aria-label="Confirm_password" />
                    <button class="btn-register" type="submit" :disabled="loading">
                        <span v-if="loading" class="spinner"></span>
                        <span v-else>Registar</span>
                    </button>

                    <div class="social-register">
                        <button @click="registerWith('google')" class="social-btn google"
                            aria-label="register with Google">
                            <i class="fab fa-google"></i>
                        </button>
                        <button @click="registerWith('facebook')" class="social-btn facebook"
                            aria-label="register with Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </button>
                        <button @click="registerWith('apple')" class="social-btn apple"
                            aria-label="register with Apple">
                            <i class="fab fa-apple"></i>
                        </button>
                    </div>

                    <div class="separator">
                        <span>Ou</span>
                    </div>

                    <div class="link-create">
                        <router-link to="/login" class="no-decoration">Iniciar sessão</router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            confirm_password: '',
            loading: false,
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);  // Volta para a página anterior
        },

        async register() {
            this.loading = true;

            // Verifica se as passwords correspondem
            if (this.password !== this.confirm_password) {
                alert('As passwords não correspondem. Tente novamente.');
                this.loading = false;
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/revima-api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                    }),
                });

                const data = await response.json(); // Captura o retorno da API
                console.log("Resposta: ", data);

                if (!response.ok) {
                    // Mostra erro específico, se houver
                    alert(data.message || 'Erro ao registar. Tente novamente.');
                    this.loading = false; // Reset loading state
                    return;
                }

                this.email = '';
                this.password = '';
                this.confirm_password = '';

                // // Armazena o token, se necessário
                // localStorage.setItem('token', data.token);
                this.$router.push('/'); // Redireciona após o registo bem-sucedido
            } catch (error) {
                console.error('Erro ao registar:', error);
                alert('Ocorreu um erro durante o registo. Tente novamente mais tarde.');
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
body,
html {
    overflow-x: hidden;
    font-family: 'Poppins', sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}



.container {
    position: relative;
    display: flex;
    color: #333;
    margin-top: 80px;
    margin-bottom: 80px;
}


.content-wrapper {
    display: flex;
    width: 100%;
    margin-left: 150px;
    margin-right: 150px;
}


.text-section {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* Centraliza verticalmente */
    align-items: flex-start;
    /* Alinha à esquerda */
}



.text-section h2 {
    font-size: 2.5rem;
    /* Aumenta o tamanho da fonte */
    margin-bottom: 10px;
    font-weight: 600;
    color: white;
    /* Peso da fonte mais grosso */
}

.text-section p {
    font-size: 1.5rem;
    /* Aumenta o tamanho da fonte */
    color: #c1c1c1;
    line-height: 1.6;
    /* Aumenta a altura da linha para melhor legibilidade */
}


.form-section {
    flex: 1;
    display: flex;
    justify-content: center;
    /* Centraliza horizontalmente o formulário */
    padding: 20px;
}

form {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    width: 450px;
    transition: transform 0.2s;
}


.register-text {
    font-size: 25px;
    color: #333;
}

h1 {
    margin-bottom: 20px;
    font-size: 2.5rem;
    color: #1e2f97;
    text-align: center;

}

/* 

form {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    width: 350px;
    transition: transform 0.2s;
} */

form:hover {
    transform: translateY(-4px);
}

input {
    width: 100%;
    padding: 14px;
    margin: 12px 0;
    border: 1px solid #ffffff;
    border-radius: 25px;
    font-size: 1rem;
    background-color: #f9f9f9;
    color: #333;
    height: 29px;
}

input:focus {
    border-color: #b6b6b6;
    outline: none;
}


button {
    width: 100%;
    padding: 14px;
    background-color: #1e2f97;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    position: relative;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-2px);
}

.social-register {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

.social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin: 5px;

}

.google {
    background-color: #db4437;
}

.facebook {
    background-color: #4267B2;
}

.apple {
    background-color: #000;
}

.social-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}




.link-create {
    font-weight: bold;
    margin-top: 10px;
    font-size: 1.0rem;
    text-align: center;
    cursor: pointer;

}

.link-create:hover {
    color: #6f6f6f;
}


.no-decoration {
    text-decoration: none;
    /* Remove o sublinhado */
    color: inherit;
    /* Mantém a cor do texto */
}


.links {
    margin-top: 10px;
    font-size: 0.9rem;
    text-align: right;
    cursor: pointer;
    /* Alinha o conteúdo à direita */
}

.links a {
    color: #1e2f97;
    text-decoration: none;
    transition: text-decoration 0.2s;
}

.links a:hover {
    text-decoration: underline;
}

.create-account {
    margin-top: 15px;
    text-align: center;
}

.create-account a {
    color: #1e2f97;
    text-decoration: none;
}

.create-account a:hover {
    text-decoration: underline;
}

.btn-register {
    height: 30px;
    background-color: #333;
    padding: 5px;
    margin-top: 20px;
}

.spinner {
    border: 2px solid white;
    border-top: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    position: absolute;
    left: calc(50% - 10px);
    top: calc(50% - 10px);
}

.logo {
    position: absolute;
    /* Logo flutua sobre a navbar */
    top: 10px;
    /* Ajuste a posição vertical conforme necessário */
    left: 15%;
    /* Centraliza horizontalmente em relação à navbar */
    transform: translateX(-50%);
    /* Ajusta a centralização do logo */
}

.logo img {
    height: 100px;
    /* Ajuste a altura do logo conforme necessário */
}

.separator {
    font-size: medium;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
}

.separator span {
    background-color: #fff;
    padding: 0 10px;
    color: #555;
}

.separator::before,
.separator::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
    margin: 0 10px;
}

.intro-text {
    text-align: center;
    margin-bottom: 20px;
}

.intro-text h2 {
    font-size: 1.5rem;
    color: #333;
    font-weight: normal;
}


.back-button {
    margin-bottom: 20px;
    text-align: left;
    /* Alinhar à esquerda */
}

.back-button button {
    background: none;
    /* Remover fundo */
    border: none;
    font-size: 1.2rem;
    color: #000000;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    /* Remover padding extra */
}

.back-button button:hover,
.back-button button:focus {
    background: none;
    /* Garantir que não há fundo no hover */
    color: #000000;
    /* Manter a cor do texto no hover */
    outline: none;
    /* Remover o contorno padrão */
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

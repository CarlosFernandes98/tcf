<template>
    <div class="container">
        <div class="content-wrapper">
            <div class="text-section">
                <h2>Entra em contacto conosco</h2>
                <!-- <p>Fala connosco pelas nossas redes sociais.</p> -->
                <div class="social-login horizontal-links">
                    <button @click="openLink('https://www.linkedin.com/in/revima3d')" class="social-btn linkedin"
                        aria-label="Contact on LinkedIn">
                        <i class="fab fa-linkedin-in"></i>
                    </button>
                    <button @click="openLink('https://www.instagram.com/revima3d/')" class="social-btn instagram"
                        aria-label="Contact on Instagram">
                        <i class="fab fa-instagram"></i>
                    </button>
                    <button @click="openLink('https://www.facebook.com/revima3d')" class="social-btn facebook"
                        aria-label="Contact on Facebook">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                </div>


            </div>

            <div class="form-section">
                <form @submit.prevent="submit">
                    <div class="intro-text">
                        <h2>Envia-nos uma mensagem</h2>
                    </div>

                    <label for="name">Nome</label>
                    <input id="name" v-model="text" type="text" placeholder="Seu Nome" required aria-label="Name" />

                    <label for="email">Email</label>
                    <input id="email" v-model="email" type="email" placeholder="Introduza o seu endereço de email"
                        required aria-label="Email" />

                    <label for="services">Serviços Necessários</label>
                    <select id="services" v-model="selectedService" required aria-label="Services">
                        <option disabled value="">Selecione um serviço</option>
                        <option value="Modelação 3D">Modelação 3D</option>
                        <option value="Prototipagem rápida">Prototipagem rápida</option>
                        <option value="Fabrico de peças personalizadas - Impressão 3D">Fabrico de peças personalizadas -
                            Impressão 3D</option>
                        <option value="Design e otimização de peças">Design e otimização de peças</option>
                        <option value="Produção de peças de substituição">Produção de peças de substituição</option>
                        <option value="Consultoria técnica">Consultoria técnica</option>
                    </select>

                    <label for="message">Mensagem</label>
                    <textarea id="message" v-model="message" placeholder="Sua mensagem aqui" required
                        aria-label="Message" rows="2"></textarea>

                    <button class="btn-submit" type="submit" :disabled="loading">
                        <span v-if="loading" class="spinner"></span>
                        <span v-else>Enviar mensagem</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
    data() {
        return {
            text: "",
            email: "",
            message: "",
            selectedService: "",
            loading: false,
        };
    },
    methods: {
        openLink(url) {
            window.open(url, '_blank'); // Abre a URL em uma nova aba
        },
        async submit() {
            this.loading = true;
            const templateParams = {
                name: this.text,
                email: this.email,
                service: this.selectedService,
                message: this.message,
            };

            try {
                await emailjs.send('service_3rljzwb', 'template_684vwen', templateParams, '3shhOFAeS-bWH03rr');
                alert('Email enviado com sucesso!');
                // Limpar o formulário após o envio
                this.text = "";
                this.email = "";
                this.message = "";
                this.selectedService = "";
            } catch (error) {
                console.error('Erro ao enviar o email:', error);
                alert('Ocorreu um erro ao enviar o email. Tente novamente.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
.container {
    position: relative;
    display: flex;
    color: #333;
    margin-bottom: 60px;
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
    padding: 20px;
    overflow: hidden;
    /* Impede que o conteúdo exceda os limites do contêiner */

}

form {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    /* Define a largura do formulário para ocupar todo o espaço disponível */
    max-width: 450px;
    /* Define uma largura máxima para o formulário */
    transition: transform 0.2s;
    box-sizing: border-box;
    /* Inclui padding e border na largura total */
}


.submit-text {
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
    margin-bottom: 10px;
    margin-top: 5px;
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
    background-color: #7d7d7d;
    transform: translateY(-2px);
}

.social-submit {
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

.btn-submit {
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

.horizontal-links {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    /* Espaço entre os botões */
}

.social-login {
    margin-top: 20px;
}


select {
    width: 100%;
    /* Faz o select ocupar toda a largura do container */
    padding: 5px;
    /* Espaçamento interno para torná-lo mais confortável */
    margin-top: 10px;
    /* Espaçamento superior para afastar de outros elementos */
    margin-bottom: 10px;
    /* Espaçamento inferior */
    border: 1px solid #e0e0e0;
    /* Bordas cinza para harmonizar com outros inputs */
    border-radius: 23px;
    /* Bordas arredondadas para um visual mais suave */
    font-size: 16px;
    /* Tamanho da fonte para facilitar a leitura */
    background-color: white;
    /* Cor de fundo branca */
    color: #333;
    /* Cor do texto */
    appearance: none;
    /* Remove o estilo padrão do navegador (seta, etc.) */
    -webkit-appearance: none;
    /* Remove estilo padrão em navegadores Webkit */
    -moz-appearance: none;
    /* Remove estilo padrão em navegadores Mozilla */
    background-image: url('data:image/svg+xml;base64,...');
    /* Opcional: seta customizada como ícone */
    background-repeat: no-repeat;
    background-position: right 10px center;
    /* Posição da seta à direita */
    background-size: 12px;
    /* Tamanho da seta */
    cursor: pointer;
    /* Mostra o cursor de mão ao passar sobre o select */
    transition: border-color 0.3s ease;
    /* Suaviza transição na cor da borda */
    margin-bottom: 10px;
    margin-top: 5px;
    padding-left: 10px;
}

select:focus {
    border-color: #666666;
    /* Muda a cor da borda ao focar no select */
    outline: none;
    /* Remove o outline padrão */
}

select:disabled {
    background-color: #000000;
    color: black;
    /* Cor de fundo para o select desabilitado */
    cursor: not-allowed;
    /* Cursor de bloqueio para indicar estado desabilitado */
}

textarea {
    background-color: rgb(255, 255, 255);
    width: 100%;
    border-radius: 23px;
    padding: 10px;
    border: 1px solid #ffffff;
    color: black;
    font-size: large;
    margin-bottom: 10px;
    margin-top: 5px;
    resize: none;
    background-color: #f9f9f9;

}

label {
    font-size: 15px;
    color: #bbbbbb;
    margin: 10px;
    display: flex;
}


@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column;
        margin-left: 20px;
        /* Diminui o espaçamento lateral */
        margin-right: 20px;
    }

    .text-section,
    .form-section {
        flex: none;
        /* Evita que as seções cresçam em dispositivos móveis */
        width: 100%;
        /* Ocupa toda a largura disponível */
        padding: 10px;
        /* Reduz o padding */
    }

    .text-section h2 {
        font-size: 2rem;
        text-align: center;
        /* Reduz o tamanho da fonte */
    }

    .text-section p {
        font-size: 1.2rem;
        /* Reduz o tamanho da fonte */
    }

    form {
        padding: 20px;
        /* Reduz o padding no formulário */
        max-width: 100%;
        /* Permite que o formulário ocupe 100% da largura */
    }

    input,
    select,
    textarea {
        font-size: 0.9rem;
        /* Ajusta o tamanho da fonte para inputs */
    }

    button {
        font-size: 0.9rem;
        /* Ajusta o tamanho da fonte dos botões */
    }

    .btn-submit {
        height: 40px;
        /* Aumenta a altura do botão para facilitar o clique em dispositivos móveis */
    }

    .social-login {
        display: flex;
        justify-content: center;
        /* Centraliza horizontalmente */
        align-items: center;
        /* Centraliza verticalmente */
        margin-top: 20px;
        /* Ajuste conforme necessário */
    }

    .text-section {
        flex: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* Centraliza verticalmente */
        align-items: center;
        /* Alinha à esquerda */
    }

    .social-btn {
        width: 35px;
        /* Reduz o tamanho dos botões sociais */
        height: 35px;
        margin: 0 5px;
        /* Adiciona um espaço entre os botões */
    }

    .horizontal-links {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        /* Espaço entre os botões */
    }
}
</style>

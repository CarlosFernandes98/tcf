<template>
    <div class="container">
        <h1 class="title" ref="title" :class="{ 'animate': isTitleVisible }">Envia mail</h1>
        <h1 class="sub-text" ref="subText" :class="{ 'animate': isSubTextVisible }">Tens alguma dúvida? Manda-nos
            mensagem</h1>

        <div class="input-container">
            <input type="text" v-model="name" placeholder="Seu Nome" class="input-field" />
            <input type="email" v-model="email" placeholder="Seu Email" class="input-field" />
            <textarea v-model="message" placeholder="Sua Mensagem" class="input-field message-area"></textarea>
        </div>

        <button class="send-email" @click="sendEmail">Enviar Email</button>
    </div>
</template>

<script>
export default {
    name: "MailComponent",
    data() {
        return {
            isTitleVisible: false,
            isSubTextVisible: false,
            name: '',
            email: '',
            message: '',
        };
    },
    mounted() {
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isTitleVisible = true;
                }
            });
        }, observerOptions);

        const subTextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isSubTextVisible = true;
                }
            });
        }, observerOptions);

        titleObserver.observe(this.$refs.title);
        subTextObserver.observe(this.$refs.subText);
    },
    methods: {
        sendEmail() {
            const subject = `Interesse na startup de ${this.name}`;
            const body = `Olá,\n\nMeu nome é ${this.name} e meu email é ${this.email}.\n\n${this.message}`;
            const mailtoLink = `mailto:example@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    padding: 5%;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.title,
.sub-text {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.title.animate,
.sub-text.animate {
    opacity: 1;
    transform: translateY(0);
}

.title {
    font-weight: 600;
    font-size: 2.5rem;
    margin-bottom: 10px;
    width: 80%;
    text-align: center;
    color: #333;
}

.sub-text {
    font-weight: 300;
    font-size: 1.2rem;
    margin-bottom: 20px;
    width: 80%;
    text-align: center;
    color: #666;
    padding-bottom: 10px;
}

.input-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    color: #555;
}

.input-field {
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    transition: border-color 0.3s ease;
}

.input-field:focus {
    border-color: #007BFF;
    outline: none;
}

.message-area {
    height: 120px;
}

.send-email {
    background-color: #8c8c8c;
    color: white;
    font-size: 16px;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    margin-top: 20px;
}

.send-email:hover {
    background-color: #474747;
    transform: scale(1.05) translateY(-5px);
}
</style>

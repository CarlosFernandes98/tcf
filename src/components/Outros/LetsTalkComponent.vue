<template>
    <div v-if="isVisible" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-content" @click.stop>
            <span class="close" @click="closeModal">&times;</span>
            <h2>Entre em Contato</h2>
            <form @submit.prevent="sendMessage">
                <div class="form-group">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" v-model="name" required class="input-field" />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required class="input-field" />
                </div>
                <div class="form-group">
                    <label for="phone">Telefone:</label>
                    <input type="tel" id="phone" v-model="phone" required class="input-field" />
                </div>
                <div class="form-group">
                    <label for="message">Mensagem:</label>
                    <textarea id="message" v-model="message" required class="input-field textarea-field"></textarea>
                </div>
                <button type="submit" class="submit-button">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "LetsTalkComponent",
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            name: "",
            email: "",
            phone: "", // Novo campo para telefone
            message: "",
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        handleOverlayClick() {
            this.closeModal(); // Fecha o modal ao clicar na overlay
        },
        sendMessage() {
            // Aqui você pode adicionar a lógica para enviar a mensagem
            console.log("Mensagem enviada:", {
                name: this.name,
                email: this.email,
                phone: this.phone, // Incluindo telefone no console
                message: this.message,
            });
            this.closeModal();
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 15px;
    width: 400px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.close {
    cursor: pointer;
    float: right;
    font-size: 24px;
    color: #888;
}

.close:hover {
    color: #333;
}

h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

.label {
    font-weight: bold;
    color: #555;
}

.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: border 0.3s ease;
}

.input-field:focus {
    border: 1px solid #999999;
    outline: none;
}

.textarea-field {
    resize: vertical;
    height: 100px;
}

.submit-button {
    background-color: #b8b8b8;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    width: 100%;
}

.submit-button:hover {
    background-color: #676767;
    transform: translateY(-2px);
}
</style>

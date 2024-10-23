<template>
    <div class="footer-container">
        <img src="~@/assets/LogoTCFCreative_white.png" alt="Logo da TCF Creative" class="company-logo" ref="companyName"
            :class="{ 'animate': isCompanyNameVisible }" />
        <p class="company-info" ref="companyInfo" :class="{ 'animate': isCompanyInfoVisible }">
            tcfcreative@gmail.com<br>
            Vila Real, Portugal
        </p>
        <div class="social-links" ref="socialLinks" :class="{ 'animate': isSocialLinksVisible }">
            <a href="https://www.facebook.com/tcfcreative.pt" target="_blank">
                <i class="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://www.instagram.com/tcfcreative.pt/" target="_blank">
                <i class="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://www.linkedin.com" target="_blank">
                <i class="fab fa-linkedin"></i> LinkedIn
            </a>
        </div>
        <p class="copyright" ref="copyright" :class="{ 'animate': isCopyrightVisible }">
            Copyright ©2024 TCF Creative, All rights reserved.
        </p>
        <p class="powered-by">
            Powered by <a href="https://www.tcfcreative.pt" target="_blank">TCF Creative | Web Solutions</a>
        </p>
    </div>
</template>


<script>

export default {
    name: "FooterComponent",
    data() {
        return {
            isCompanyNameVisible: false,
            isCompanyInfoVisible: false,
            isSocialLinksVisible: false,
            isCopyrightVisible: false,
            isLegalPagesVisible: false,
        };
    },
    mounted() {
        const observerOptions = {
            root: null,
            threshold: 0.1,
        };

        const createObserver = (element, ref, dataKey) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this[dataKey] = true;
                    }
                });
            }, observerOptions);
            observer.observe(this.$refs[ref]);
        };

        createObserver(this.$refs.companyName, 'companyName', 'isCompanyNameVisible');
        createObserver(this.$refs.companyInfo, 'companyInfo', 'isCompanyInfoVisible');
        createObserver(this.$refs.socialLinks, 'socialLinks', 'isSocialLinksVisible');
        createObserver(this.$refs.copyright, 'copyright', 'isCopyrightVisible');
        // createObserver(this.$refs.legalPages, 'legalPages', 'isLegalPagesVisible');
    }
};
</script>

<style scoped>
.footer-container {
    padding: 40px;
    background-color: #000000;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #000000;
}

/* Novo estilo para a imagem da logo */
.company-logo {
    width: 180px;
    /* Ajuste a largura conforme necessário */
    height: auto;
    /* Mantém a proporção */
    margin-bottom: 20px;
    /* Espaço abaixo da imagem */
}

/* Estilo base para o conteúdo */
.company-info,
.social-links,
.copyright,
.legal-pages {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.6s ease, transform 0.6s ease;
    margin-top: 10px;
}

/* Animação ao scroll */
.company-info.animate,
.social-links.animate,
.copyright.animate,
.legal-pages.animate {
    opacity: 1;
    transform: translateY(0);
}

.company-info {
    font-size: 1rem;
    margin-bottom: 20px;
    color: #ffffff;
}

.social-links a {
    margin: 0 10px;
    font-size: 1.0rem;
    color: #cacaca;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    transition: color 0.3s ease;
}

.social-links a:hover {
    color: #005f7f;
}

.social-links i {
    margin-right: 8px;
}

.copyright {
    font-size: 0.9rem;
    color: #c4c4c4;
    margin-top: 20px;
}

.legal-pages a {
    display: block;
    color: #aeaeae;
    font-size: 0.9rem;
    margin: 10px 0;
    text-decoration: none;
    transition: color 0.3s ease;
}

.legal-pages a:hover {
    color: #1e2f97;
}

/* Estilo para a seção "Powered by TCF Web Solutions" */
.powered-by {
    font-size: 0.9rem;
    color: #555;
    margin-top: 20px;
}

.powered-by a {
    color: #ffffff;
    /* Cor do link */
    text-decoration: none;
}

.powered-by a:hover {
    text-decoration: underline;
    /* Sublinhar ao passar o mouse */
}
</style>

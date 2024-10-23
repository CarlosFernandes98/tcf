<template>
    <div class="home">
        <!-- <NavBar /> -->
        <PromotionBannerComponent />
        <ProductsComponent />


    </div>
</template>

<script>

// import NavBar from "@/components/NavBar.vue";
import ProductsComponent from "@/components/TCF_Components/ProductsComponent.vue";
import PromotionBannerComponent from "@/components/TCF_Components/PromotionBannerComponent.vue";


export default {
    name: "StoreView",
    components: {
        // NavBar,
        ProductsComponent,
        PromotionBannerComponent
    },
};
</script>

<style>
body,
html {
    overflow-x: hidden;
    font-family: 'Roboto', sans-serif;

}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.home {
    min-height: 100vh;
    color: white;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, rgb(236, 236, 236), #1e2f97);
}
</style>
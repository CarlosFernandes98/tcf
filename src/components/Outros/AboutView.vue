<template>
    <AboutMeComponent />
</template>

<script>
import AboutMeComponent from "@/components/TCF_Components/AboutMeComponent.vue";


export default {
    name: "HomeView",
    components: {
        AboutMeComponent
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
</style>
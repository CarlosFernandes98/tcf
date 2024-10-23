<template>
  <div class="spacer"></div>
  <HeroComponent />
  <ServicesIconsComponent />


</template>

<script>
import HeroComponent from '@/components/TCF_Components/HeroComponent.vue';
import ServicesIconsComponent from '@/components/TCF_Components/ServicesIconsComponent.vue';

export default {
  name: "HomeView",
  components: {
    HeroComponent,
    ServicesIconsComponent
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

.spacer {
  /* Estilo para o espaço vazio */
  height: 83vh;
  /* Define a altura do espaço para 100vh */
}
</style>

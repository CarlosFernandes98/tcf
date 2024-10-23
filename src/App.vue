<template>
  <div id="app">

    <sf-vue-animated-cursor target="#app" teleport-to="body" borderColor="red" bgColor="#657786" width="38" height="38"
      borderWidth="2" @move="onMove" @click="onClick" @hover="onHover" />
    <LoadingScreen v-if="loading" />
    <div class="container-background" v-else>

      <transition name="slide">
        <NavBar v-if="!$route.meta.hideNavBar" />
      </transition>
      <div class="view-container">
        <transition name="slide">
          <router-view />
        </transition>

      </div>

      <FooterComponent v-if="showFooter" />
    </div>
  </div>

  <div class="carousel">
    <BackgroundCarousel />
  </div>
</template>

<script>
import NavBar from "@/components/TCF_Components/NavBar.vue";
import FooterComponent from "./components/TCF_Components/FooterComponent.vue";
import LoadingScreen from "@/components/TCF_Components/LoadingScreen.vue";
import BackgroundCarousel from "./components/TCF_Components/BackgroundCarousel.vue";



import { SfVueAnimatedCursor } from 'sf-vue-animated-cursor';

export default {
  name: "App",
  components: {
    NavBar,
    FooterComponent,
    LoadingScreen,
    BackgroundCarousel,
    SfVueAnimatedCursor,
  },
  data() {
    return {
      loading: true,
      animating: false,
      showFooter: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  methods: {
    afterEnter() {
      this.animating = false;
    },
    afterLeave() {
      this.animating = false;
    },
    handleRouteChange() {
      this.animating = true;

    }
  },
  watch: {
    '$route'() {
      if (this.animating) return;
      this.handleRouteChange();
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  background-color: black;
  overflow-x: hidden;

}

* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: none;
  flex: 1;
  z-index: 1;

}

/* Transições para a NavBar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 2.5s ease, opacity 2.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Para garantir que o conteúdo e a navbar estão acima do BackgroundCarousel */
.view-container {
  margin-top: 20px;
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

/* Garanta que o Footer também fique acima do BackgroundCarousel */
footer {
  position: relative;
  z-index: 1;
  bottom: 0;
}


.carousel {
  z-index: -1;

}
</style>

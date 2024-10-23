<template>
  <video autoplay muted loop playsinline class="background-video">
    <source :src="videoSrc" type="video/mp4" />
    Seu navegador não suporta o elemento de vídeo.
  </video>
</template>

<script>
export default {
  props: {
    videoSrc: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>
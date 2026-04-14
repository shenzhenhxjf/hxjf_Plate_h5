<template>
  <div class="container">
    <div ref="scaleContent" class="scale-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ScreenScale",
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      const baseW = 1920,
        baseH = 1080;
      const rw = window.innerWidth / baseW,
        rh = window.innerHeight / baseH;
      const s = Math.min(rw, rh);
      const el = this.$refs.scaleContent;
      el.style.transform = `scale(${s})`;
      el.style.width = `calc(100% / ${s})`;
      el.style.height = `calc(100% / ${s})`;
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #010a1c;
}
.scale-content {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
}
</style>

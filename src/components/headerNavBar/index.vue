<script setup lang="ts">
</script>

<template>
  <nav class="header-navbar">
    <div class="navbar-content">
      <img src="@/assets/logo/logo.png" alt="Logo" class="navbar-logo" />
    </div>
  </nav>
</template>

<style scoped>
.header-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 12px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.navbar-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.navbar-logo {
  height: 60px;
  width: auto;
}
</style>

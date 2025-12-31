<template>
  <header class="app-header">
    <div class="left">
      <RouterLink to="/" class="logo-link">
        <img src="../../assets/IMG_0051.jpg" alt="chrom logo" class="logo" />
        <h1 class="title">{{ title }}</h1>
      </RouterLink>
    </div>

    <div class="right">
      <BurgerButton :isOpen="menuOpen" @toggle="$emit('toggle-menu')" />

      <div v-if="menuOpen" class="mobile-backdrop" @click="$emit('toggle-menu')"></div>
      <MobileNav
        v-if="menuOpen"
        :showNavigation="showNavigation"
        @close="$emit('toggle-menu')"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import BurgerButton from './BurgerButton.vue'
import MobileNav from './MobileNav.vue'

interface Props {
  title: string
  showNavigation: boolean
  menuOpen: boolean
}

defineProps<Props>()
defineEmits<{
  'toggle-menu': []
}>()
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-border, #e6e6e6);
  background: var(--color-background, #fff);
  gap: 1rem;
}

.left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-heading, #111827);
}

.logo {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 8px;
}

.right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

.mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.12);
  z-index: 900;
}
</style>

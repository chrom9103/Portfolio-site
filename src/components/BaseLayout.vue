<template>
  <div class="app-container">
    <AppHeader
      :title="props.title"
      :showNavigation="props.showNavigation"
      :menuOpen="showMenu"
      @toggle-menu="toggleMenu"
    />

    <main class="main-content">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AppHeader from './root/AppHeader.vue'
import AppFooter from './root/AppFooter.vue'

interface Props {
  title?: string
  showNavigation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'chrom',
  showNavigation: true
})

const showMenu = ref(false)

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    if (showMenu.value) showMenu.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.main-content {
  padding: 2rem;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  flex-grow: 1;
}
</style>
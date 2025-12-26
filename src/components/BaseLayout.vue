<template>
  <div class="app-container">
    <header class="app-header">
      <div class="left">
        <RouterLink to="/" class="logo-link">
          <img src="../assets/IMG_0051.jpg" alt="chrom logo" class="logo" />
          <h1 class="title">{{ props.title }}</h1>
        </RouterLink>
      </div>

      <div class="right">
        <button :class="['burger', { open: showMenu }]" @click="toggleMenu" aria-label="Open navigation" :aria-expanded="showMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <div v-if="showMenu" class="mobile-backdrop" @click="toggleMenu"></div>
        <nav v-if="showMenu" class="mobile-menu" role="menu" @click.stop>
          <RouterLink to="/" class="mobile-link" @click="toggleMenu" role="menuitem">Home</RouterLink>
          <RouterLink v-if="props.showNavigation" to="/works" class="mobile-link" @click="toggleMenu" role="menuitem">Works</RouterLink>
          <RouterLink to="/articles" class="mobile-link" @click="toggleMenu" role="menuitem">Articles</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p>© chrom All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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

.left { display: flex; align-items: center; gap: 0.75rem; }

.logo-link { display:flex; align-items:center; gap:0.5rem; text-decoration: none; }
.title { font-size: 1.05rem; font-weight: 700; margin: 0; color: var(--color-heading, #111827); }

.logo { width: 36px; height: 36px; object-fit: cover; border-radius: 8px; }

.right { display:flex; align-items:center; gap:0.75rem; position:relative }

.burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 44px;
  height: 44px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
}

.burger:focus { outline: 2px solid rgba(59,130,246,0.3); }
.burger span { display:block; height:2px; background:#111827; margin:3px 0; border-radius:2px; width:18px; transition: transform .15s ease, opacity .15s ease }
.burger.open span:nth-child(1){ transform: translateY(8px) rotate(45deg)}
.burger.open span:nth-child(2){ opacity:0; transform: scaleX(0)}
.burger.open span:nth-child(3){ transform: translateY(-8px) rotate(-45deg)}

.mobile-menu {
  position: absolute;
  right: 8px;
  top: 56px;
  background: white;
  border: 1px solid #e6e6e6;
  box-shadow: 0 6px 18px rgba(15,23,42,0.06);
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 160px;
  z-index: 1000;
}

.mobile-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.12); z-index: 900 }
.mobile-link { display:block; width:100%; padding:0.5rem; text-decoration:none; color: #111827 }
.mobile-link:focus, .mobile-link:hover { background: rgba(0,0,0,0.04) }

.main-content { padding: 2rem; margin: 0 auto; width: 100%; box-sizing: border-box; flex-grow: 1 }
.footer { background-color: var(--color-background-soft); border-top: 1px solid var(--color-border); width:100%; box-sizing:border-box; padding:0; }
.footer-content { text-align:center; color: var(--color-text-mute); padding:1rem 2rem }
</style>
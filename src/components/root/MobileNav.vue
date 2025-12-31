<template>
  <nav class="mobile-menu" role="menu" @click.stop>
    <RouterLink to="/" class="mobile-link" @click="$emit('close')" role="menuitem">
      Home
    </RouterLink>
    <RouterLink
      v-if="showNavigation"
      to="/works"
      class="mobile-link"
      @click="$emit('close')"
      role="menuitem"
    >
      Works
    </RouterLink>
    <RouterLink to="/articles" class="mobile-link" @click="$emit('close')" role="menuitem">
      Articles
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
interface Props {
  showNavigation: boolean
}

defineProps<Props>()
defineEmits<{
  close: []
}>()
</script>

<style scoped>
.mobile-menu {
  position: absolute;
  right: 8px;
  top: 56px;
  background: white;
  border: 1px solid #e6e6e6;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 160px;
  z-index: 1000;
}

.mobile-link {
  display: block;
  width: 100%;
  padding: 0.5rem;
  text-decoration: none;
  color: #111827;
  border-radius: 4px;
}

.mobile-link:focus,
.mobile-link:hover {
  background: rgba(0, 0, 0, 0.04);
}
</style>

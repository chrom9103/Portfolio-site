<template>
  <button
    :class="['burger', { open: isOpen }]"
    @click="$emit('toggle')"
    aria-label="Open navigation"
    :aria-expanded="isOpen"
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
}

defineProps<Props>()
defineEmits<{
  toggle: []
}>()
</script>

<style scoped>
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

.burger:focus {
  outline: 2px solid rgba(59, 130, 246, 0.3);
}

.burger span {
  display: block;
  height: 2px;
  background: var(--color-heading);
  margin: 3px 0;
  border-radius: 2px;
  width: 18px;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.burger.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.burger.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
</style>

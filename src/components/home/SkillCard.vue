<template>
  <div class="skill-card">
    <h3 class="skill-title">{{ title }}</h3>
    <p class="skill-list">{{ skills }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  skills: string
}

defineProps<Props>()
</script>

<style scoped>
.skill-card {
  background-color: var(--color-background-soft);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #6a0dad;
  margin-bottom: 1rem;
}

.skill-list {
  font-size: 1rem;
  color: var(--color-text-mute);
  line-height: 1.6;
}
</style>

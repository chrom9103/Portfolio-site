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
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

@media (min-width: 540px) {
  .skill-card {
    padding: 1.5rem;
  }
}

@media (min-width: 768px) {
  .skill-card {
    padding: 2rem;
  }
}

.skill-card:hover {
  transform: translateY(-5px);
}

.skill-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.75rem;
  word-wrap: break-word;
}

@media (min-width: 540px) {
  .skill-title {
    font-size: 1.25rem;
  }
}

@media (min-width: 768px) {
  .skill-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

.skill-list {
  font-size: 0.9rem;
  color: var(--color-text-mute);
  line-height: 1.6;
  word-wrap: break-word;
}

@media (min-width: 540px) {
  .skill-list {
    font-size: 0.95rem;
  }
}

@media (min-width: 768px) {
  .skill-list {
    font-size: 1rem;
  }
}
</style>

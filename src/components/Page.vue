<template>
  <div class="page-container">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from './home/HeroSection.vue'
import AboutSection from './home/AboutSection.vue'
import SkillsSection from './home/SkillsSection.vue'
import ContactSection from './home/ContactSection.vue'
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 767px) {
  .page-container {
    padding: 0 1rem;
  }
}
</style>
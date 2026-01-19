<template>
  <div class="page-container">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <TimelineSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from './home/HeroSection.vue'
import AboutSection from './home/AboutSection.vue'
import SkillsSection from './home/SkillsSection.vue'
import TimelineSection from './home/TimelineSection.vue'
import ContactSection from './home/ContactSection.vue'
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (min-width: 768px) {
  .page-container {
    padding: 2rem 2rem;
  }
}

@media (min-width: 1024px) {
  .page-container {
    padding: 2rem;
  }
}
</style>
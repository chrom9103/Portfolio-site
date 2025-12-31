<template>
  <section class="skills-section">
    <h2 class="section-heading">Skills</h2>
    <div class="skills-grid">
      <SkillCard
        v-for="skill in skills"
        :key="skill.title"
        :title="skill.title"
        :skills="skill.skills"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import SkillCard from './SkillCard.vue'

const skills = [
  {
    title: 'Frontend',
    skills: 'Vue.js, TypeScript, HTML, CSS'
  },
  {
    title: 'Backend',
    skills: 'Node.js, Python'
  },
  {
    title: 'DevOps / Infra',
    skills: 'Kubernetes, Docker, MicroK8s, Linux'
  }
]
</script>

<style scoped>
.skills-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--color-border-soft);
}

.section-heading {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 2rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
</style>

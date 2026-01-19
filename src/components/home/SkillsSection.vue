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
    skills: 'Kubernetes(MicroK8s), Docker, Linux(Ubuntu)'
  }
]
</script>

<style scoped>
.skills-section {
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-border-soft);
  width: 100%;
  overflow-x: hidden;
}

@media (min-width: 768px) {
  .skills-section {
    padding: 4rem 0;
  }
}

.section-heading {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
}

@media (min-width: 540px) {
  .section-heading {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  .section-heading {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    padding: 0;
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 540px) {
  .skills-grid {
    gap: 1.5rem;
  }
}

@media (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

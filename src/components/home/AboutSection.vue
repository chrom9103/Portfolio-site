<template>
  <section class="about-section">
    <div class="about-content">
      <h2 class="section-heading">About Me</h2>
      <p class="about-text">
        青山学院大学 学士2年(在学中)。
      </p>
      <p class="about-text">
        主にフロントエンドやインフラに興味を持ち、幅広い技術スタックを学んでいます。
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-section {
  text-align: center;
  padding: 4rem 0;
  border-bottom: 1px solid var(--color-border-soft);
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.section-heading {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 2rem;
}

.about-text {
  font-size: 1.1rem;
  color: var(--color-text);
  line-height: 1.8;
}
</style>

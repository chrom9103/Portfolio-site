<template>
  <section class="contact-section">
    <div class="contact-content">
      <h2 class="section-heading">Contact</h2>
      <p class="contact-text">
        下記のメールアドレスにお気軽にご連絡ください
      </p>
      <a href="mailto:chrom@chrom.jp" class="cta-button primary">chrom@chrom.jp</a>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.contact-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--color-border-soft);
}

.contact-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.section-heading {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 2rem;
}

.contact-text {
  font-size: 1.1rem;
  color: var(--color-text);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-align: center;
}

.primary {
  background-color: var(--color-background-mute);
  color: var(--color-heading);
  border: 2px solid transparent;
}

.primary:hover {
  background-color: var(--color-background-soft);
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 767px) {
  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 0.95rem;
    white-space: normal;
  }
}

@media (max-width: 768px) {
  .cta-button {
    padding: 0.8rem 4rem;
  }
}

@media (max-width: 512px) {
  .cta-button {
    padding: 0.8rem 8rem;
  }
}
</style>

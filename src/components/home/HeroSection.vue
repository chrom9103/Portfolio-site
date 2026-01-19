<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">
        <span>Hello, I'm</span><br>
        <span class="name-highlight">chrom</span>
      </h1>
      <p class="hero-subtitle">
        A software developer specializing in web development and DevOps.
      </p>
      <SocialLinks />
      <div class="cta-buttons">
        <RouterLink to="/works" class="cta-button primary">View Works</RouterLink>
      </div>
    </div>
    <div class="hero-image">
      <img src="../../assets/IMG_0051.jpg" alt="chrom profile" class="profile-image">
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SocialLinks from './SocialLinks.vue'
</script>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 4rem 0;
  border-bottom: 1px solid var(--color-border-soft);
}

@media (min-width: 768px) {
  .hero-section {
    flex-direction: row;
    justify-content: space-between;
    padding: 6rem 0;
  }
}

.hero-content {
  text-align: center;
  flex-basis: 60%;
}

@media (min-width: 768px) {
  .hero-content {
    text-align: left;
  }
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-heading);
  line-height: 1.2;
  margin-bottom: 1rem;
  animation: slide-in-top 1s ease-out;
}

.name-highlight {
  color: var(--color-accent);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-mute);
  margin-bottom: 2rem;
  animation: fade-in 2s ease-out;
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fade-in 2.5s ease-out;
}

@media (min-width: 768px) {
  .cta-buttons {
    flex-direction: row;
  }
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

.hero-image {
  flex-basis: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  animation: scale-up 1.5s ease-out;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2.5rem 0;
    gap: 4.5rem;
  }

  .hero-image {
    display: none;
  }

  .hero-title {
    font-size: 2rem;
    line-height: 1.15;
  }

  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 0.95rem;
    white-space: normal;
  }

  .profile-image {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 768px) {
  .cta-button {
    padding: 0.8rem 4rem;
  }

  .profile-image {
    width: 128px;
    height: 128px;
  }
}

@media (max-width: 512px) {
  .cta-button {
    padding: 0.8rem 8rem;
  }

  .profile-image {
    width: 128px;
    height: 128px;
  }
}

@keyframes slide-in-top {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

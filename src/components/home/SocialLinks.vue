<template>
  <div class="social-links">
    <a href="https://github.com/chrom9103" target="_blank" class="social-icon" aria-label="GitHub">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-github"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  animation: slide-in-bottom 1.5s ease-out;
}

@media (min-width: 768px) {
  .social-links {
    justify-content: flex-start;
  }
}

.social-icon {
  font-size: 1.5rem;
  color: var(--color-text);
  transition: transform 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-5px);
  color: var(--color-accent);
}

@keyframes slide-in-bottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

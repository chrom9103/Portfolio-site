<template>
  <BaseLayout title="chrom Portfolio">
    <div class="not-found">
      <h1>404</h1>
      <p>ページが見つかりません</p>
      <router-link to="/">トップページへ戻る</router-link>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
h1 {
  font-size: 5rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
</style>
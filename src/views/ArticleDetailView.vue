<template>
  <BaseLayout :title="article?.title ?? 'Article Not Found'">
    <div v-if="article" class="article-detail">
      <header class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <span class="meta-item">
            <span class="meta-label">公開日:</span>
            {{ formatDate(article.date) }}
          </span>
          <span class="meta-item">
            <span class="meta-label">更新日:</span>
            {{ formatDate(article.updated) }}
          </span>
        </div>
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <div class="article-content">
        <MarkedRenderer :markdown="article.content" />
      </div>
    </div>

    <div v-else class="not-found">
      <p>記事が見つかりませんでした。</p>
      <router-link to="/articles" class="back-link">記事一覧に戻る</router-link>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkedRenderer from '../components/MarkedRenderer.vue'
import BaseLayout from '../components/BaseLayout.vue'
import { getArticleByUid } from '../components/articles/articleLoader'

const route = useRoute()
const uid = computed(() => route.params.uid as string)

const article = computed(() => getArticleByUid(uid.value))


function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.article-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.article-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.meta-label {
  font-weight: 500;
  margin-right: 0.25rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: var(--color-background-mute);
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
}

.article-content {
  line-height: 1.8;
  color: var(--color-text);
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.article-content :deep(h1) {
  font-size: 1.75rem;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 0.5rem;
}

.article-content :deep(h2) {
  font-size: 1.5rem;
}

.article-content :deep(h3) {
  font-size: 1.25rem;
}

.article-content :deep(p) {
  margin-bottom: 1rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-content :deep(code) {
  background-color: var(--color-background-mute);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}

.article-content :deep(pre) {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.article-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.article-content :deep(strong),
.article-content :deep(b) {
  font-weight: 700 !important;
}
.article-content :deep(strong) {
  font-weight: 700 !important;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #1976d2;
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--color-text);
  opacity: 0.8;
  font-style: italic;
}

.article-content :deep(a) {
  color: #1976d2;
  text-decoration: none;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.not-found {
  text-align: center;
  padding: 3rem;
}

.not-found p {
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.back-link {
  color: #1976d2;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>

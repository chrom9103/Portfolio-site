<template>
  <BaseLayout title="Articles">
    <div class="articles-container">
      <h1 class="page-title">記事一覧</h1>

      <div v-if="articles.length === 0" class="no-articles">
        <p>記事がありません。</p>
      </div>

      <ul v-else class="article-list">
        <li v-for="article in articles" :key="article.uid" class="article-item">
          <router-link :to="`/articles/${article.uid}`" class="article-link">
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-summary">{{ article.summary }}</p>
            <div class="article-meta">
              <span class="meta-date">
                <span class="meta-label">公開:</span> {{ formatDate(article.date) }}
              </span>
              <span class="meta-date">
                <span class="meta-label">更新:</span> {{ formatDate(article.updated) }}
              </span>
            </div>
            <div class="article-tags">
              <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '../components/BaseLayout.vue'
import { getArticleList } from '../components/articles/articleLoader'

const articles = getArticleList()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<style scoped>
.articles-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 0.5rem;
}

.no-articles {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.article-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.article-item {
  margin-bottom: 1.5rem;
}

.article-link {
  display: block;
  padding: 1.5rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
}

.article-link:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #1976d2;
}

.article-title {
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #1976d2;
}

.article-summary {
  color: #666;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.meta-label {
  font-weight: 500;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #e8f4fd;
  color: #1976d2;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}
</style>
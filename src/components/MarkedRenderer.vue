<template>
  <div ref="container" class="marked-content"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps<{ markdown: string }>()
const container = ref<HTMLElement | null>(null)

function renderMarkdown(md: string) {
  // Convert markdown to HTML
  marked.use({ gfm: true, breaks: true })
  const raw = marked.parse(md ?? '')
  // Sanitize
  const clean = DOMPurify.sanitize(raw)
  if (container.value) {
    container.value.innerHTML = clean
  }
}

onMounted(() => {
  renderMarkdown(props.markdown)
})

watch(
  () => props.markdown,
  (val) => {
    renderMarkdown(val)
  }
)
</script>

<style scoped>
.marked-content :deep(h1),
.marked-content :deep(h2),
.marked-content :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #222;
}

.marked-content :deep(h1) {
  font-size: 1.75rem;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 0.5rem;
}

.marked-content :deep(h2) {
  font-size: 1.5rem;
}

.marked-content :deep(h3) {
  font-size: 1.25rem;
}

.marked-content :deep(p) {
  margin-bottom: 1rem;
}

.marked-content :deep(ul),
.marked-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.marked-content :deep(li) {
  margin-bottom: 0.5rem;
}

.marked-content :deep(code) {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
}

.marked-content :deep(pre) {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.marked-content :deep(blockquote) {
  border-left: 4px solid #1976d2;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #666;
  font-style: italic;
}

.marked-content :deep(a) {
  color: #1976d2;
  text-decoration: none;
}

.marked-content :deep(a:hover) {
  text-decoration: underline;
}

.marked-content :deep(strong),
.marked-content :deep(b) {
  font-weight: 700 !important;
}
.marked-content :deep(strong) {
  font-weight: 700 !important;
}
</style>

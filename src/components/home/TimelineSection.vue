<template>
  <section class="timeline-section">
    <h2 class="section-heading">Experience</h2>
    <div class="timeline-container">
      <div class="timeline-line"></div>
      <div class="timeline-content">
        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="timeline-item"
          :class="{ 'multi-year': item.end !== undefined }"
        >
          <div class="timeline-marker">
            <div class="marker-dot"></div>
            <div v-if="item.end" class="marker-line"></div>
          </div>
          <div class="timeline-card">
            <div class="timeline-year">
              <span class="year-badge">
                {{ item.start }}
                <template v-if="item.end">
                  <span class="year-separator">―</span>
                  {{ formatDate(item.end) }}
                </template>
              </span>
            </div>
            <h3 class="timeline-title">{{ item.title }}</h3>
            <p class="timeline-description">{{ item.description }}</p>
            <div class="timeline-tags">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TimelineItem {
  start: string
  end?: string | 'present'
  title: string
  description: string
  tags: string[]
}

const formatDate = (date: string | 'present'): string => {
  if (date === 'present') return '現在'
  return date
}

const timelineItems: TimelineItem[] = [
  {
    start: '2024/04',
    title: 'プログラミング学習開始',
    description: 'HTML/CSS/JavaScriptの基礎を学び、Web開発の世界に足を踏み入れました。',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    start: '2024/08',
    end: 'present',
    title: 'Discord Bot開発',
    description: 'Pythonを用いたDiscord Botの開発を開始。ボットの機能拡張や運用に取り組みました。',
    tags: ['Python', 'discord.py', '']
  },
  {
    start: '2024/11',
    end: '2025/01',
    title: 'チーム開発プロジェクト',
    description: 'サークル内ハッカソンにて、ReactとFirebaseを使用したチーム開発プロジェクトに参加しました。',
    tags: ['React', 'Firebase', 'Git']
  },
  {
    start: '2025/01',
    end: '2025/05',
    title: '講習会設計・運営',
    description: 'javaScript, HTML/CSS, Gitの基礎を教える講習会の設計と運営を担当しました。',
    tags: ['markdown']
  },
  {
    start: '2025/03',
    end: 'present',
    title: 'DevOps & インフラ構築',
    description: 'Kubernetes、Dockerを活用したコンテナオーケストレーションとCI/CDパイプラインの構築に取り組んでいます。',
    tags: ['Kubernetes', 'Docker', 'Linux(ubuntu)']
  },
  {
    start: '2025/09',
    end: 'present',
    title: 'ポートフォリオサイト開発',
    description: '本サイトの開発。Vue 3 + TypeScript + Viteスタックで構築。',
    tags: ['Vue 3', 'TypeScript', 'Vite']
  },
  {
    start: '2025/10',
    end: '2025/12',
    title: 'サークル内会計サイト開発',
    description: 'サークルの会計管理を効率化するためのWebアプリケーションを開発。Vue 3とSupabaseを使用。',
    tags: ['Vue 3', 'Supabase', 'FastAPI']
  }
]
</script>

<style scoped>
.timeline-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--color-border);
}

.section-heading {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 3rem;
}

.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.timeline-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--vt-c-indigo) 5%,
    var(--vt-c-indigo) 95%,
    transparent
  );
  border-radius: 2px;
}

@media (prefers-color-scheme: dark) {
  .timeline-line {
    background: linear-gradient(
      to bottom,
      transparent,
      #42b883 5%,
      #42b883 95%,
      transparent
    );
  }
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.timeline-item:nth-child(odd) {
  flex-direction: row;
  padding-right: calc(50% + 2rem);
}

.timeline-item:nth-child(even) {
  flex-direction: row-reverse;
  padding-left: calc(50% + 2rem);
}

.timeline-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.marker-dot {
  width: 16px;
  height: 16px;
  background: var(--vt-c-indigo);
  border: 3px solid var(--color-background);
  border-radius: 50%;
  box-shadow: 0 0 0 3px var(--vt-c-indigo);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  .marker-dot {
    background: #42b883;
    box-shadow: 0 0 0 3px #42b883;
  }
}

.timeline-item:hover .marker-dot {
  transform: scale(1.2);
  box-shadow: 0 0 0 4px var(--vt-c-indigo), 0 0 20px rgba(44, 62, 80, 0.4);
}

@media (prefers-color-scheme: dark) {
  .timeline-item:hover .marker-dot {
    box-shadow: 0 0 0 4px #42b883, 0 0 20px rgba(66, 184, 131, 0.4);
  }
}

.multi-year .marker-line {
  width: 4px;
  height: 40px;
  background: linear-gradient(to bottom, var(--vt-c-indigo), rgba(44, 62, 80, 0.3));
  border-radius: 2px;
  margin-top: 4px;
}

@media (prefers-color-scheme: dark) {
  .multi-year .marker-line {
    background: linear-gradient(to bottom, #42b883, rgba(66, 184, 131, 0.3));
  }
}

.timeline-card {
  background: var(--color-background-soft);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
}

.timeline-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

@media (prefers-color-scheme: dark) {
  .timeline-card:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
}

.timeline-year {
  margin-bottom: 0.75rem;
}

.year-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--vt-c-indigo), #34495e);
  color: white;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

@media (prefers-color-scheme: dark) {
  .year-badge {
    background: linear-gradient(135deg, #42b883, #2c8a5e);
  }
}

.year-separator {
  opacity: 0.7;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.timeline-description {
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--color-background-mute);
  color: var(--color-text);
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--color-border);
  transition: background-color 0.2s ease;
}

.tag:hover {
  background: var(--color-border);
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-marker {
    left: 20px;
  }

  .timeline-item:nth-child(odd),
  .timeline-item:nth-child(even) {
    flex-direction: row;
    padding-left: 50px;
    padding-right: 0;
  }

  .timeline-card {
    padding: 1.25rem;
  }

  .section-heading {
    font-size: 2rem;
  }

  .timeline-title {
    font-size: 1.1rem;
  }

  .timeline-description {
    font-size: 0.9rem;
  }
}

/* Animation on scroll */
.timeline-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }
.timeline-item:nth-child(6) { animation-delay: 0.6s; }
.timeline-item:nth-child(7) { animation-delay: 0.7s; }
.timeline-item:nth-child(8) { animation-delay: 0.8s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

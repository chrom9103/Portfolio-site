<template>
  <section class="timeline-section">
    <h2 class="section-heading">Experience</h2>
    <div class="timeline-container">
      <!-- タイムライン行 -->
      <div
        v-for="row in timelineRows"
        :key="row.date"
        class="timeline-row"
      >
        <!-- 左側：備考欄（Milestones） -->
        <div class="timeline-left">
          <div class="note-items">
            <div
              v-for="(note, idx) in row.notes"
              :key="idx"
              class="note-chip"
            >
              <span class="note-text">{{ note.text }}</span>
            </div>
          </div>
        </div>
        <!-- 中央線と日付 -->
        <div class="timeline-center">
          <div class="center-line"></div>
          <div class="center-date">
            <span class="date-label">{{ row.date }}</span>
          </div>
          <div class="center-line"></div>
        </div>
        <!-- 右側：メインアイテム（Projects） -->
        <div class="timeline-right">
          <div class="main-items">
            <div
              v-for="(item, idx) in row.mainItems"
              :key="idx"
              class="timeline-card"
              :class="{ 'multi-year': item.end !== undefined }"
            >
              <div class="card-period">
                <span class="period-badge">
                  {{ item.start }}
                  <template v-if="item.end">
                    <span class="period-sep">―</span>
                    {{ formatDate(item.end) }}
                  </template>
                </span>
              </div>
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-description">{{ item.description }}</p>
              <div class="card-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TimelineItem {
  start: string
  end?: string | 'present'
  title: string
  description: string
  tags: string[]
}

interface TimelineNote {
  date: string
  text: string
}

interface TimelineRow {
  date: string
  mainItems: TimelineItem[]
  notes: TimelineNote[]
}

const formatDate = (date: string | 'present'): string => {
  if (date === 'present') return '現在'
  return date
}

const dateToSortKey = (dateStr: string): number => {
  if (dateStr === 'present') return 999999
  const parts = dateStr.split('/')
  const year = parseInt(parts[0]) || 0
  const month = parseInt(parts[1]) || 1
  return year * 100 + month
}

const timelineNotes: TimelineNote[] = [
  { date: '2024/04', text: '青山学院大学入学' },
  { date: '2024/04', text: 'PiedPiper 青山テック愛好会 入会' },
  { date: '2024/11', text: 'PiedPiper 青山テック愛好会 副代表就任' },
  { date: '2025/03', text: 'VPSサーバ契約' },
  { date: '2025/04', text: 'PiedPiper 青山テック愛好会 代表就任' },
  { date: '2025/09', text: 'ドメイン(chrom.jp)取得' }
]

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
    tags: ['Python', 'discord.py']
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
    start: '2025/04',
    end: 'present',
    title: 'DevOps & インフラ構築',
    description: 'Kubernetes、Dockerを活用したコンテナオーケストレーションの構築に取り組んでいます。',
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

// 日付ごとにグループ化して行を生成
const timelineRows = computed<TimelineRow[]>(() => {
  const dateSet = new Set<string>()
  
  timelineItems.forEach(item => dateSet.add(item.start))
  timelineNotes.forEach(note => dateSet.add(note.date))
  
  const sortedDates = Array.from(dateSet).sort((a, b) => dateToSortKey(a) - dateToSortKey(b))
  
  return sortedDates.map(date => ({
    date,
    mainItems: timelineItems.filter(item => item.start === date),
    notes: timelineNotes.filter(note => note.date === date)
  }))
})
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
  margin-bottom: 2rem;
}

.timeline-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Timeline Row */
.timeline-row {
  display: grid;
  grid-template-columns: calc(30% - 40px) 80px 1fr;
  gap: 0;
  min-height: 60px;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.timeline-row:nth-child(2) { animation-delay: 0.05s; }
.timeline-row:nth-child(3) { animation-delay: 0.1s; }
.timeline-row:nth-child(4) { animation-delay: 0.15s; }
.timeline-row:nth-child(5) { animation-delay: 0.2s; }
.timeline-row:nth-child(6) { animation-delay: 0.25s; }
.timeline-row:nth-child(7) { animation-delay: 0.3s; }
.timeline-row:nth-child(8) { animation-delay: 0.35s; }
.timeline-row:nth-child(9) { animation-delay: 0.4s; }
.timeline-row:nth-child(10) { animation-delay: 0.45s; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Left Side - Notes (Milestones) */
.timeline-left {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 0.5rem;
}

.main-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.timeline-card {
  background: var(--color-background-soft);
  border-radius: 10px;
  padding: 1rem 1.25rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
}

.timeline-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
  .timeline-card:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
}

.card-period {
  margin-bottom: 0.5rem;
}

.period-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: linear-gradient(135deg, var(--vt-c-indigo), #34495e);
  color: white;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .period-badge {
    background: linear-gradient(135deg, #42b883, #2c8a5e);
  }
}

.period-sep {
  opacity: 0.7;
}

.card-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.35rem;
  line-height: 1.3;
}

.card-description {
  font-size: 0.8rem;
  color: var(--color-text);
  line-height: 1.5;
  margin-bottom: 0.5rem;
  opacity: 0.85;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tag {
  background: var(--color-background-mute);
  color: var(--color-text);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid var(--color-border);
}

/* Center Line */
.timeline-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.center-line {
  flex: 1;
  width: 3px;
  background: var(--vt-c-indigo);
  min-height: 20px;
}

@media (prefers-color-scheme: dark) {
  .center-line {
    background: #42b883;
  }
}

.center-date {
  padding: 0.25rem 0;
}

.date-label {
  display: inline-block;
  background: var(--vt-c-indigo);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}

@media (prefers-color-scheme: dark) {
  .date-label {
    background: #42b883;
  }
}

/* Right Side - Projects */
.timeline-right {
  display: flex;
  align-items: flex-start;
  padding-left: 0.5rem;
  width: 100%;
}

.note-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.note-chip {
  display: inline-flex;
  align-items: center;
  background: var(--color-background-soft);
  border-right: 3px solid var(--vt-c-indigo);
  padding: 0.4rem 0.75rem;
  border-radius: 6px 0 0 6px;
  transition: background-color 0.2s ease;
}

@media (prefers-color-scheme: dark) {
  .note-chip {
    border-right-color: #42b883;
  }
}

.note-chip:hover {
  background: var(--color-background-mute);
}

.note-text {
  font-size: 0.8rem;
  color: var(--color-heading);
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline-row {
    grid-template-columns: calc(25% - 30px) 60px 1fr;
    gap: 0;
  }

  .section-heading {
    font-size: 2rem;
  }

  .header-left,
  .header-right {
    font-size: 0.7rem;
    padding: 0 0.5rem;
  }

  .timeline-card {
    padding: 0.75rem;
  }

  .card-title {
    font-size: 0.9rem;
  }

  .card-description {
    font-size: 0.75rem;
  }

  .date-label {
    font-size: 0.6rem;
    padding: 0.15rem 0.35rem;
  }

  .note-chip {
    padding: 0.3rem 0.5rem;
  }

  .note-text {
    font-size: 0.7rem;
  }
}

@media (max-width: 540px) {
  .timeline-row {
    grid-template-columns: 0 50px 1fr;
  }

  .timeline-left {
    display: none;
  }

  .header-left {
    display: none;
  }

  .card-description {
    display: none;
  }

  .card-tags {
    display: none;
  }
}
</style>

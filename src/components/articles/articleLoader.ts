import { parse as parseYaml } from 'yaml'
import type { Article, ArticleMeta } from './types'

const markdownFiles = import.meta.glob('./docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// ファイル名から6桁の16進数UIDを生成
function generateUidFromFilename(filename: string): string {
  let hash = 5381
  for (let i = 0; i < filename.length; i++) {
    hash = (hash * 33) ^ filename.charCodeAt(i)
  }
  return (hash >>> 0).toString(16).slice(-6).padStart(6, '0')
}

// ファイルパスからファイル名を抽出
function extractFilename(path: string): string {
  const match = path.match(/\/([^/]+)\.md$/)
  return match ? match[1] : path
}

// フロントマターを解析するカスタムパーサー（ブラウザ互換）
function parseFrontmatter(rawContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
  const match = rawContent.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: rawContent }
  }

  const [, yamlContent, markdownContent] = match
  const data = parseYaml(yamlContent) as Record<string, unknown>

  return { data, content: markdownContent }
}

// フロントマターを解析して記事データを取得
function parseArticle(filePath: string, rawContent: string): Article | null {
  try {
    const { data, content } = parseFrontmatter(rawContent)

    if (!data.title || !data.date) {
      console.warn('Article missing required fields:', data)
      return null
    }

    // ファイル名からUIDを自動生成
    const filename = extractFilename(filePath)
    const uid = data.uid ? String(data.uid) : generateUidFromFilename(filename)

    return {
      uid,
      title: String(data.title),
      date: String(data.date),
      updated: String(data.updated || data.date),
      summary: String(data.summary || ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      content: content.trim(),
    }
  } catch (error) {
    console.error('Failed to parse article:', error)
    return null
  }
}

// 全ての記事を取得（日付降順でソート）
export function getAllArticles(): Article[] {
  const articles: Article[] = []

  for (const [filePath, rawContent] of Object.entries(markdownFiles)) {
    const article = parseArticle(filePath, rawContent)
    if (article) {
      articles.push(article)
    }
  }
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleList(): ArticleMeta[] {
  return getAllArticles().map(({ content, ...meta }) => meta)
}

export function getArticleByUid(uid: string): Article | undefined {
  return getAllArticles().find((article) => article.uid === uid)
}

export interface ArticleMeta {
  uid: string
  title: string
  date: string
  updated: string
  summary: string
  tags: string[]
}

export interface Article extends ArticleMeta {
  content: string
}

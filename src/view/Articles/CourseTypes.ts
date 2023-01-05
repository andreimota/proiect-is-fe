import { Author } from "../../types/User/User.types";


export interface Course {
  id: number
  title: string
  description?: string
  technology: string
  image: string
  difficulty: string
  publishedAt: string

  author: Author
  articles: Article[]
}

export interface Article {
  id: number
  title: string
  order: number

  paragraphs: Paragraph[]
}

export interface Paragraph {
  id: number
  textSection: string
  codeSection?: string
  order: number
}

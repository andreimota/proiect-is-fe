import { Author } from "../../types/User/User.types";


export interface Course {
  id: number
  title: string
  authorName: string
  description?: string
  technology: string
  image: any
  difficulty: string
  publishedAt: string
  
  quizId: number

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

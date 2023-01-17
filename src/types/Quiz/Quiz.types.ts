export interface Quiz {
  id: number
  courseId: number
  title: string
  
  questions: Question[]
}


export interface Question {
  id: number
  text: string
  answered: boolean

  answers: Answer[]
}

export interface Answer {
  id: number
  text: string
  isCorrect: boolean
}

export type TodoAttributes = {
  title: string
  isDone: boolean
  description?: string
  dueDate?: string
}

export type Todo = TodoAttributes & {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  documentId: string
}

export type TodoResponse = {
  data: Todo[]
  meta: {
    total: number
  }
}

export type TodoUpdate = Partial<TodoAttributes> & {
  documentId: string
}


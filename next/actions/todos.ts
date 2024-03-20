'use server'

import { revalidateTag } from "next/cache"

export async function getTodos() {
  const res = await fetch('http://strapi:1337/api/todos')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function createTodo(title: string) {
  try {

    const res = await fetch('http://strapi:1337/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          title: title,
          dueDate: "2024-03-18T23:37:11.180Z",
          isDone: false
        }
      })
    })

    if (!res.ok) {
      console.log(res)
      throw new Error('Failed to create todo')
    }
    revalidateTag('todos')

    return res.json()

  } catch (error) {
    console.error(error)
  }
}

export async function updateTodo(todo: any) {
  const res = await fetch(`http://strapi:1337/api/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: todo.attributes })
  })

  if (!res.ok) {
    throw new Error('Failed to update todo')
  }
  revalidateTag('todos')
  return res.json()
}

export async function deleteTodo(id: number) {
  const res = await fetch(`http://strapi:1337/api/todos/${id}`, {
    method: 'DELETE'
  })

  if (!res.ok) {
    throw new Error('Failed to delete todo')
  }
  revalidateTag('todos')
  return res.json()
}


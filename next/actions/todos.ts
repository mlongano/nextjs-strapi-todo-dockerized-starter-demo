'use server'

import { Todo, TodoUpdate } from "@/types/todo"
import { revalidateTag } from "next/cache"
import { flattenAttributes, getStrapiURL } from "@/lib/utils"
import qs from 'qs';

const baseUrl = getStrapiURL();

export async function getTodos() {
  const url = new URL("/api/todos", baseUrl);
  url.search = qs.stringify({ sort: ['createdAt:desc'] });
  const res = await fetch(url.href, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json();
}

export async function createTodo(title: string) {
  const url = new URL("/api/todos", baseUrl);
  // get today's date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  try {

    const res = await fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          title: title,
          dueDate: formattedDate,
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

export async function setTodoIsDone(documentId: string, isDone: boolean) {
  console.log('PUT (update)', isDone);
  const url = new URL(`/api/todos/${documentId}`, baseUrl);
  try {
    const res = await fetch(url.href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: { isDone } })
    });

    if (!res.ok) {
      throw new Error('Failed to update todo');
    }
    revalidateTag('todos');
    return res.json();
  } catch (error) {
    console.log(error);
    return { status: "error", error };

  } finally {
    revalidateTag('todos');
  }
}

export async function updateTodo(todo: TodoUpdate) {
  console.log('PUT (update)', todo);
  const url = new URL(`/api/todos/${todo.documentId}`, baseUrl);
  try {
    const res = await fetch(url.href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: todo })
    });

    if (!res.ok) {
      throw new Error('Failed to update todo');
    }
    revalidateTag('todos');
    return res.json();
  } catch (error) {
    console.log(error);
    return { status: "error", error };

  } finally {
    revalidateTag('todos');
  }
}

export async function deleteTodo(documentId: string) {
  const url = new URL(`/api/todos/${documentId}`, baseUrl);
  const res = await fetch(url.href, {
    method: 'DELETE'
  })

  if (!res.ok) {
    throw new Error('Failed to delete todo')
  }
  revalidateTag('todos')
}


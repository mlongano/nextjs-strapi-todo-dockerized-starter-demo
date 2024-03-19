'use client'
import { updateTodo } from '@/actions/todos';
import React from 'react';

export default function TodoEntry({ todo }: { todo: any }) {
  const [isDone, setIsDone] = React.useState(todo.attributes.isDone)
  return (
    <>
      <input type="checkbox" checked={isDone}
        onChange={async () => {
          console.log("changed")
          setIsDone(!isDone)
          todo.attributes.isDone = !isDone
          await updateTodo(todo)
        }
        } />
      <p>{todo.attributes.title}</p>
    </>
  )
}
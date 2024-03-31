'use client'
import { deleteTodo, setTodoIsDone, updateTodo } from '@/actions/todos';
import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'
import { Todo } from '@/types/todo';

export default function TodoEntry({ todo }: { todo: Todo }) {
  const [isDone, setIsDone] = React.useState(todo.isDone)
  const [updateError, setUpdateError] = React.useState(false)
  return (
    <div className='flex items-center bg-white rounded-lg p-4 shadow-md my-2'>
      <input
        type="checkbox"
        checked={isDone}
        className='h-5 w-5 mr-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
        onChange={async () => {
          console.log("changed");
          todo.isDone = !isDone;
          setTodoIsDone(todo.documentId, todo.isDone)
            .then(() => {
              setIsDone(!isDone);
              setUpdateError(false);
            })
            .catch(() => {
              setIsDone(isDone);
              setUpdateError(true);
            }
            )

        }}
      />
      {updateError && <p className='text-red-500'>Failed to update todo</p>}
      <p className={`flex-grow text-gray-800 ${isDone && 'line-through'}`}>{todo.title}</p>
      <button
        className='ml-4 text-red-500 hover:text-red-700'
        onClick={async () => {
          console.log("deleted")
          await deleteTodo(todo.documentId)
        }}
      >
        <TrashIcon className='h-5 w-5' />
      </button>

    </div>

  )
}
'use client'
import { deleteTodo, updateTodo } from '@/actions/todos';
import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'
export default function TodoEntry({ todo }: { todo: any }) {
  const [isDone, setIsDone] = React.useState(todo.attributes.isDone)
  return (
    <div className='flex items-center bg-white rounded-lg p-4 shadow-md my-2'>
      <input
        type="checkbox"
        checked={isDone}
        className='h-5 w-5 mr-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500'
        onChange={async () => {
          console.log("changed")
          setIsDone(!isDone)
          todo.attributes.isDone = !isDone
          await updateTodo(todo)
        }}
      />
      <p className={`flex-grow text-gray-800 ${isDone && 'line-through'}`}>{todo.attributes.title}</p>
      <button
        className='ml-4 text-red-500 hover:text-red-700'
        onClick={async () => {
          console.log("deleted")
          await deleteTodo(todo.id)
        }}
      >
        <TrashIcon className='h-5 w-5' />
      </button>

    </div>

  )
}
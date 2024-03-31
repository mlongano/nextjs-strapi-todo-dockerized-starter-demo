'use client'

import { createTodo } from "@/actions/todos"
import { create } from "domain"
import { useState } from "react"



export default function TodoInput() {
  const [title, setTitle] = useState('')

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed')
    }
  }

  return (
    <div className="flex flex-row gap-4">
      <input className='text-gray-950 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none' type="text" placeholder="Insert title" value={title} onChange={(e) => setTitle(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            await createTodo(title);
            setTitle('');
          }
        }} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async (e) => {
        e.preventDefault()
        console.log("clicked")
        await createTodo(title)
        setTitle('')
      }}>Add todo</button>
    </div>
  )
}
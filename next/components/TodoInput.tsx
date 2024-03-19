'use client'

import { createTodo } from "@/actions/todos"
import { create } from "domain"
import { useState } from "react"

export default function TodoInput() {
  const [title, setTitle] = useState('')

  return (
    <div>
      <input className='text-gray-950' type="text" placeholder="Insert title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={async (e) => {
        e.preventDefault()
        console.log("clicked")
        await createTodo(title)
        setTitle('')
      }}>Add todo</button>
    </div>
  )
}
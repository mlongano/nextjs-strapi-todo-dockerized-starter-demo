import { unstable_noStore } from "next/cache";
import Image from "next/image";
import TodoEntry from '@/components/TodoEntry';
import TodoInput from "@/components/TodoInput";

async function getData() {
  const res = await fetch('http://strapi:1337/api/todos', { next: { tags: ['todos'] } })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
type TodoAttributes = {
  title: string
  isDone: boolean
}

type Todo = {
  id: number
  attributes: TodoAttributes
}

export default async function Home() {
  unstable_noStore()

  const { data, meta } = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Todos</h1>
      <TodoInput />
      {data.map((todo: Todo) => {
        console.log(todo.attributes.isDone)
        return (
          <div key={todo.id} className="flex items-center space-x-4">
            <TodoEntry todo={todo} />
          </div>
        )
      })}
    </main>
  );
}

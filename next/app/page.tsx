import { unstable_noStore } from "next/cache";
import Image from "next/image";
import TodoEntry from '@/components/TodoEntry';
import TodoInput from "@/components/TodoInput";
import { getTodos } from "@/actions/todos";
import { Todo } from "@/types/todo";

export default async function Home() {
  unstable_noStore()

  const { data } = await getTodos();

  console.log('Home page todos: ', data)
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-24">
      <h1 className="text-4xl font-bold">Todos</h1>
      <TodoInput />
      {data.map((todo: Todo) => {
        console.log(todo.isDone)
        return (
          <div key={todo.id} className="flex items-center space-x-4">
            <TodoEntry todo={todo} />
          </div>
        )
      })}
    </main>
  );
}

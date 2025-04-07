'use client'

import type { RouterOutputs } from '@/utils/trpc'
import { trpc } from '@/utils/trpc'

type Task = RouterOutputs['task']['list'][number]

export default function TaskListPage() {
  const { data: tasks, isLoading } = trpc.task.list.useQuery()

  if (isLoading) return <p aria-busy>Carregando tarefas...</p>

  return (
    <main>
      <h1>Lista de Tarefas</h1>
      <section>
        {tasks?.length === 0 ? (
          <p>Nenhuma tarefa encontrada.</p>
        ) : (
          <ul>
            {tasks?.map((task: Task) => (
              <li key={task.id}>
                <strong>{task.titulo}</strong>
                {task.descricao && <p>{task.descricao}</p>}
                <small>{new Date(task.dataCriacao).toLocaleDateString('pt-BR')}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
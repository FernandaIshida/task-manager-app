'use client'

import { trpc } from '@/utils/trpc'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { RouterOutputs } from '@/utils/trpc'

type Task = RouterOutputs['task']['list'][number]

type TaskListProps = {
    onEdit?: (task: Task) => void
}

export default function TaskList({ onEdit }: TaskListProps) {
    const queryClient = useQueryClient()

    const { data: tasks, isLoading, isError } = trpc.task.list.useQuery()

    const deleteTask = trpc.task.delete.useMutation({
        onMutate: () => toast.loading('Deletando tarefa...'),
        onSuccess: (_, __, context) => {
            toast.success('Tarefa deletada com sucesso!', { id: context })
            queryClient.invalidateQueries({ queryKey: [['task', 'list']] })
        },
        onError: (error, _, context) => {
            toast.error(error.message || 'Erro ao deletar tarefa.', { id: context })
        },
    })

    if (isLoading) return <p className="text-textPrimary">Carregando tarefas...</p>
    if (isError) return <p className="text-red-500">Erro ao carregar tarefas.</p>
    if (!tasks || tasks.length === 0) return <p className="text-textPrimary">Nenhuma tarefa encontrada.</p>

    return (
        <div className="bg-surface p-6 rounded shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-primary">Lista de Tarefas</h2>
            <ul className="space-y-3">
                {tasks.map((task) => {
                    console.log("Data de Criação:", task.dataCriacao, typeof task.dataCriacao);
                    return (
                        <li
                            key={task.id}
                            className="p-4 rounded bg-white text-textPrimary shadow-sm"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-row">
                                    <h3 className="task-title">{task.titulo}</h3>
                                    {task.descricao && (
                                        <p className="text-sm text-gray-600 mt-1">{task.descricao}</p>
                                    )}
                                    <p className="task-title">
                                        Criado em: {new Date(task.dataCriacao).toDateString()}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-2 ml-4">
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(task)}
                                            className="text-sm text-white bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 transition"
                                        >
                                            Editar
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
                                                deleteTask.mutate({ id: task.id })
                                            }
                                        }}
                                        className="text-sm text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                }
                )}
            </ul>
        </div>
    )
}
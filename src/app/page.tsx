'use client'

import { useRouter } from 'next/navigation'
import { trpc } from '@/utils/trpc'
import { TrashIcon, PencilIcon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function TaskListPage() {
    const router = useRouter()
    const { data: tasks, isLoading } = trpc.task.list.useQuery()
    const utils = trpc.useUtils()

    const deleteTask = trpc.task.delete.useMutation({
        onSuccess: () => utils.task.list.invalidate(),
    })

    return (
        <div className="container">
            <div className="card">
                <div className="header">
                    <h1 className="title">Tarefas</h1>
                    <button
                        onClick={() => router.push('/tasks/new')}
                        className="new-task-button"
                    >

                        <PlusIcon size={18} />
                        Nova Tarefa
                    </button>
                </div>

                <div className="box">
                    {isLoading ? (
                        <p className="text">Carregando...</p>
                    ) : tasks && tasks.length > 0 ? (
                        <ul className="task-list">
                            {tasks.map((task) => (
                                <li
                                    key={task.id}
                                    className="task-item"
                                >
                                    <div>
                                        <p className="task-title">{task.titulo}</p>
                                        {task.descricao && (
                                            <p className="task-desk">{task.descricao}</p>
                                        )}
                                    </div>
                                    <div className="task-actions">
                                        <button
                                            onClick={() => router.push(`/tasks/edit/${task.id}`)}
                                            className="edit-button"
                                        >
                                            <PencilIcon size={18} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                toast('Tem certeza que deseja deletar?', {
                                                    action: {
                                                        label: 'Confirmar',
                                                        onClick: () => deleteTask.mutate({ id: task.id }),
                                                    },
                                                    cancel: {
                                                        label: 'Cancelar',
                                                        onClick: () => { },
                                                    },
                                                    duration: 6000,
                                                })
                                            }}
                                            className="delete-button"
                                        >
                                            <TrashIcon size={18} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (

                        <div className="alert">
                            <p className="alert-text">Teste: Nenhuma tarefa cadastrada.</p>
                        </div>


                    )}
                </div>
            </div>
        </div>
    )
}
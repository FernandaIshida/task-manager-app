'use client'

import { useParams, useRouter } from 'next/navigation'
import { trpc } from '@/utils/trpc'
import TaskForm from '@/components/TaskForm'

export default function EditTaskPage() {
    const { id } = useParams<{ id: string }>()
    console.log('ID da tarefa:', id)
    const router = useRouter()
    const utils = trpc.useUtils()

    const { data: task, isLoading } = trpc.task.getById.useQuery({ id: String(id) })
    const updateTask = trpc.task.update.useMutation({
        onSuccess: () => {
            utils.task.list.invalidate()
            router.push('/tasks')
        },
    })

    if (isLoading || !task) {
        return (
            <div className="container">
                <div className="alert">
                    <p className="alert-text">Carregando tarefa...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="card">
                <TaskForm taskToEdit={task} onSuccess={() => router.push('/')} />
            </div>
        </div>
    )

}
'use client'

import { useRouter } from 'next/navigation'
import { trpc } from '@/utils/trpc'
import TaskForm from '@/components/TaskForm'
import { toast } from 'sonner'

export default function CreateTaskPage() {
    const router = useRouter()
    const utils = trpc.useUtils()

    const createTask = trpc.task.create.useMutation({
        onSuccess: () => {
            utils.task.list.invalidate()
            toast.success('Tarefa criada com sucesso!')
            router.push('/tasks')
        },
        onError: () => {
            toast.error('Erro ao criar tarefa. Tente novamente.')
        },
    })

    return (
        <div className="container">
            <div className="card">
                <TaskForm
                    onSuccess={() => router.push('/')} />
            </div>
        </div>

    )
}
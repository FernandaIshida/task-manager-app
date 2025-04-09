'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { trpc } from '@/utils/trpc'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type FormData = {
    id?: string
    titulo: string
    descricao?: string
}

type TaskFormProps = {
    taskToEdit?: FormData
    onSuccess?: () => void
}

export default function TaskForm({ taskToEdit, onSuccess }: TaskFormProps) {
    const [formData, setFormData] = useState<FormData>({
        titulo: '',
        descricao: '',
    })

    const queryClient = useQueryClient()

    const createTask = trpc.task.create.useMutation({
        onMutate: () => {
            // retorna o ID do toast de loading
            return toast.loading('Salvando tarefa...')
        },
        onSuccess: (_data, _variables, context) => {
            toast.success('Tarefa criada com sucesso!', {
                id: context,
                duration: 2000,
            })
            queryClient.invalidateQueries({ queryKey: [['task', 'list']] })
            setFormData({ titulo: '', descricao: '' })
            onSuccess?.()
        },
        onError: (error, _variables, context) => {
            toast.error(error.message || 'Erro ao criar tarefa.', {
                id: context,
                duration: 3000,
            })
        },
    })

    const updateTask = trpc.task.update.useMutation({
        onMutate: () => {
            return toast.loading('Atualizando tarefa...')
        },
        onSuccess: (_data, _variables, context) => {
            toast.success('Tarefa atualizada com sucesso!', {
                id: context,
                duration: 2000,
            })
            queryClient.invalidateQueries({ queryKey: [['task', 'list']] })
            setFormData({ titulo: '', descricao: '' })
            onSuccess?.()
        },
        onError: (error, _variables, context) => {
            toast.error(error.message || 'Erro ao atualizar tarefa.', {
                id: context,
                duration: 3000,
            })
        },
    })
    useEffect(() => {
        if (taskToEdit) {
            setFormData(taskToEdit)
        }
    }, [taskToEdit])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!formData.titulo.trim()) {
            toast.error('O título é obrigatório.', {
                duration: 2000,
            })
            return
        }

        if (formData.id) {
            updateTask.mutate({
                id: formData.id,
                titulo: formData.titulo,
                descricao: formData.descricao,
            })
        } else {
            createTask.mutate({
                titulo: formData.titulo,
                descricao: formData.descricao,
            })
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-surface p-6 rounded shadow-md border border-borderColor space-y-6"
        >
            <h2 className="title">
                {formData.id ? 'Editar Tarefa' : 'Nova Tarefa'}
            </h2>


            <div className="task-item">
                <label htmlFor="titulo" className="block text-sm font-medium text-textPrimary">
                    Título
                </label>
                <input
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    autoComplete="off"
                    className="input-field"
                />
            </div>
            <div className="task-item">
                <label htmlFor="descricao" className="block text-sm font-medium text-textPrimary">
                    Descrição
                </label>
                <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    className="input-field"
                />
            </div>


            <button
                type="submit"
                className="btn-primary w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                {formData.id ? 'Atualizar' : 'Criar'}
            </button>
        </form>
    )
}
'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { trpc } from '@/utils/trpc'
import { useQueryClient } from '@tanstack/react-query'

type FormData = {
    titulo: string
    descricao?: string
}

export default function TaskForm() {
    const [formData, setFormData] = useState<FormData>({
        titulo: '',
        descricao: '',
    })

    const queryClient = useQueryClient()
    const createTask = trpc.task.create.useMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [['task', 'list']] })
            setFormData({ titulo: '', descricao: '' })
        },
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        createTask.mutate({
            titulo: formData.titulo,
            descricao: formData.descricao,
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-surface p-6 rounded shadow-md border border-borderColor space-y-4"
        >
            <h2 className="text-xl font-semibold text-primary">Nova Tarefa</h2>

            <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-textPrimary mb-1">
                    Título
                </label>
                <input
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-borderColor rounded bg-white text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-textPrimary mb-1">
                    Descrição
                </label>
                <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    className="w-full p-2 border border-borderColor rounded bg-white text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <button
                type="submit"
                className="bg-primary text-white font-medium px-4 py-2 rounded hover:bg-primaryHover transition-colors"
            >
                Criar
            </button>
        </form>
    )
}
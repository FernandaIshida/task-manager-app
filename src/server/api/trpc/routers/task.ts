import { z } from 'zod'
import { publicProcedure, router } from '@trpc/server'

// Esquema de validação para task
const taskSchema = z.object({
    titulo: z.string().min(1, 'O título é obrigatório.'),
    descricao: z.string().optional(),
})

// Simulação de armazenamento em memória
let tasks: {
    id: string
    titulo: string
    descricao?: string
    dataCriacao: Date
}[] = []

export const taskRouter = router({
    list: publicProcedure.query(() => {
        return tasks
    }),

    create: publicProcedure.input(taskSchema).mutation(({ input }) => {
        const newTask = {
            id: crypto.randomUUID(),
            titulo: input.titulo,
            descricao: input.descricao,
            dataCriacao: new Date(),
        }
        tasks.push(newTask)
        return newTask
    }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                titulo: z.string().min(1, 'O título é obrigatório.'),
                descricao: z.string().optional(),
            })
        )
        .mutation(({ input }) => {
            const taskIndex = tasks.findIndex((t) => t.id === input.id)
            if (taskIndex === -1) {
                throw new Error('Task não encontrada.')
            }

            tasks[taskIndex] = {
                ...tasks[taskIndex],
                titulo: input.titulo,
                descricao: input.descricao,
            }

            return tasks[taskIndex]
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input }) => {
            const taskIndex = tasks.findIndex((t) => t.id === input.id)
            if (taskIndex === -1) {
                throw new Error('Task não encontrada.')
            }

            const [removed] = tasks.splice(taskIndex, 1)
            return removed
        }),
})
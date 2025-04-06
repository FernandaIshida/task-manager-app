import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { taskRouter } from './routers/task'

// Inicialização básica do tRPC
const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure

// Define rota logica do back
export const appRouter = router({
    task: taskRouter,
})

// Tipo usado no lado cliente(front) para verificar que rotas existem
export type AppRouter = typeof appRouter
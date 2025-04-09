import { router } from './trpc'
import { taskRouter } from './routers/task'

// Aqui registra todos routers
export const appRouter = router({
    task: taskRouter,
})

// Tipo usado no lado cliente(front) para verificar que rotas existem
export type AppRouter = typeof appRouter
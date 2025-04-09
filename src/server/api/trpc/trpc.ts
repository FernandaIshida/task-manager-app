import { initTRPC } from '@trpc/server'

//inicializa o tRPC
const t = initTRPC.create()

//exporta o router e publicProcedure
export const router = t.router
export const publicProcedure = t.procedure
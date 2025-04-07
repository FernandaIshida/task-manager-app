'use client'

import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@/server/api/trpc'

export const trpc = createTRPCReact<AppRouter>()

//pega o retorno das rotas do backend e transforma em tipos que podem ser usados no front
import type { inferRouterOutputs } from '@trpc/server'
export type RouterOutputs = inferRouterOutputs<AppRouter>


import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/api/trpc'
import { NextRequest } from 'next/server'

const handler = (req: NextRequest) => {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => ({}), // haverá um contexto mais adiante
    })
}

export { handler as GET, handler as POST }
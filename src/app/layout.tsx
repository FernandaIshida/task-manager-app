import type { Metadata } from "next";
import './styles/globals.css';
import { ReactNode } from 'react'
import { TRPCProvider } from '@/components/Providers/TRPCProvider'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Um gerenciador simples de tarefas",
  icons: {
    icon: '/flavicon.ico'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className="bg-red-100">
        <TRPCProvider>{children}</TRPCProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
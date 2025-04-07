import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from 'react'
import { TRPCProvider } from '@/components/Providers/TRPCProvider'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Um gerenciador simples de tarefas",
  icons: {
    icon: '/flavicon.ico'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
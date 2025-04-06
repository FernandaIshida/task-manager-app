import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from 'react'
import { TRPCProvider } from '@/components/Providers/TRPCProvider'

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Um gerenciador simples de tarefas",
  icons: {
    icon: '/flavicon.ico'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          {children}
        </TRPCProvider>
      </body>
    </html>
  )
}
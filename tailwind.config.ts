import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: '#f1f5f9',
                surface: '#ffffff',
                primary: '#3b82f6',
                primaryHover: '#2563eb',
                textPrimary: '#1e293b',
                borderColor: '#cbd5e1',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}

export default config
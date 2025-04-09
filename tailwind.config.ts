/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            colors: {
                background: '#f1f5f9',
                surface: '#ffffff',
                primary: '#3b82f6',
                primaryHover: '#2563eb',
                textPrimary: '#1e293b',
                borderColor: '#cbd5e1',
                debugPink: '#ff69b4',
                green500: '#22c55e'

            },
        },
    },
    plugins: [],
};
# 📝 Task Manager App

![Next.js](https://img.shields.io/badge/Next.js-15-blue)
![tRPC](https://img.shields.io/badge/tRPC-TypeSafe-informational)
![React Query](https://img.shields.io/badge/React_Query-Caching-red)
![Zod](https://img.shields.io/badge/Zod-Validation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)

Sistema simples de gerenciamento de tarefas desenvolvido com **Next.js 15**, **tRPC** e **React Query**.

Este projeto foi criado como parte de um desafio prático com o objetivo de demonstrar habilidades em desenvolvimento fullstack utilizando tecnologias modernas e tipagem de ponta a ponta.

---

## 🚀 Tecnologias Utilizadas

- **Next.js 15**
- **tRPC**
- **Zod**
- **React Query**
- **TypeScript**

---

## ✅ Funcionalidades Implementadas

- 📁 Estrutura modular com `tRPC` organizada em:

```plaintext
src/
├── app/
│   └── api/
│       └── trpc/
│           └── [trpc]/route.ts
└── server/
    └── api/
        └── trpc/
            ├── routers/
            │   └── task.ts
            └── index.ts
```

- 🧠 CRUD completo de tarefas:
  - `list` – lista todas as tarefas
  - `create` – cria uma nova tarefa
  - `update` – atualiza título e descrição
  - `delete` – remove a tarefa
- ✅ Validações feitas com `Zod`
- 💾 Armazenamento em memória (para fins de prototipagem)
- 🎨 Favicon customizado representando o conceito de “gerenciador de tarefas”

---

## 📦 Instalação de Dependências

Para instalar todas as bibliotecas necessárias, rode o comando abaixo:

```bash
npm install react react-dom next zod @tanstack/react-query @trpc/server @trpc/client @trpc/react-query @trpc/next lucide-react sonner
```
---
## ▶️ Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPO>
   cd nome-do-projeto
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor:
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:3000
   ```

---

## 📁 Outras Informações

- A pasta `public/` contém o favicon personalizado (`favicon.ico`)
- O arquivo de estilos globais está em `src/app/styles/globals.css`


---

## 📌 Próximos Passos

- [ ] Adicionar persistência com banco de dados
- [ ] Implementar autenticação
- [ ] Melhorar responsividade e acessibilidade

---

## 📄 Commits

📄 Veja também o [guia de commits convencionais](./commits.md) para manter um histórico limpo e organizado.
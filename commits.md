# 🧾 Conventional Commits – Guia para este projeto

Este projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).  
Use este guia para manter as mensagens de commit consistentes e organizadas. 🚀

---

## ✅ Tipos de Commits

| Tipo      | Uso                                                                 |
|-----------|----------------------------------------------------------------------|
| `feat`    | Quando adicionar uma nova funcionalidade                            |
| `fix`     | Para correções de bugs                                              |
| `docs`    | Alterações apenas na documentação (ex: README)                      |
| `style`   | Formatação, espaços, ponto e vírgula, etc. (sem mudança de lógica)  |
| `refactor`| Refatorações de código (sem bug ou nova funcionalidade)             |
| `test`    | Adição ou modificação de testes                                     |
| `chore`   | Configurações, instalação de libs, ajustes de build, etc.           |

---

## 💬 Exemplos práticos

```bash
feat: add create task form with validation
fix: correct logic for deleting tasks by ID
docs: update README with project description
style: adjust spacing in TaskCard component
refactor: extract task item to separate component
chore: install and configure tRPC and zod

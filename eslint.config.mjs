import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import nextEslint from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    "plugin:@next/next/recommended": {}
  }
});

const eslintConfig = [
  // Configurações do Next.js
  {
    plugins: {
      "@next/next": nextEslint,
      "import": importPlugin
    },
    rules: {
      ...nextEslint.configs.recommended.rules,
      "@next/next/no-html-link-for-pages": "off" // Opcional: desativa regra específica
    }
  },

  // Configurações globais
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        React: true,
        JSX: true
      }
    }
  },

  // Regras personalizadas
  {
    files: [
      "**/postcss.config.*",
      "**/tailwind.config.*",
      "**/eslint.config.*"
    ],
    languageOptions: {
      parser: "@typescript-eslint/parser"
    },
    rules: {
      "import/no-anonymous-default-export": [
        "error",
        {
          allowObject: true,
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowLiteral: false
        }
      ]
    },
  }
];

export default eslintConfig;
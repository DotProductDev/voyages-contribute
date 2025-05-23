import { fixupConfigRules,} from "@eslint/compat"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default [{
    ignores: ["**/dist", "**/.eslintrc.cjs", "public/"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
)), {
    plugins: {},

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            varsIgnorePattern: "^_.*",
            argsIgnorePattern: "^_.*",
        }],

        semi: ["error", "never"],
        quotes: ["error", "double"],
    },
}]
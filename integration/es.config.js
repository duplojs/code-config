import { duplojsEslintOpen } from "@duplojs/eslint";
import { fileURLToPath } from "node:url";

const tsconfigRootDir = fileURLToPath(new URL(".", import.meta.url));

export default [
	{
		...duplojsEslintOpen,
		languageOptions: {
			...duplojsEslintOpen.languageOptions,
			parserOptions: {
				...duplojsEslintOpen.languageOptions.parserOptions,
				tsconfigRootDir,
				project: "./tsconfig.test.json",
			},
		},
		files: ["**/*.ts"],
		ignores: ["**/*.d.ts"],
	},
];

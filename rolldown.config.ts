import { defineConfig } from "rolldown";
import dts from "unplugin-dts/rolldown";
import nodeExternals from "rollup-plugin-node-externals";

export default defineConfig({
	input: [
		"scripts/index.ts",
		"scripts/oxlint/index.ts",
		"scripts/oxlint/plugin/index.ts",
		"scripts/commitlint/index.ts",
	],
	platform: "neutral",
	tsconfig: "tsconfig.build.json",
	output: [
		{
			dir: "dist",
			format: "esm",
			preserveModules: true,
			preserveModulesRoot: "scripts",
			entryFileNames: "[name].mjs",
			cleanDir: true,
		},
		{
			dir: "dist",
			format: "cjs",
			exports: "named",
			preserveModules: true,
			preserveModulesRoot: "scripts",
			entryFileNames: "[name].cjs",
		},
	],
	treeshake: {
		moduleSideEffects: false,
	},
	plugins: [
		dts({
			tsconfigPath: "tsconfig.build.json",
			outDirs: "dist",
			bundleTypes: false,
		}),
		nodeExternals({
			packagePath: "package.json",
			deps: true,
			peerDeps: true,
			optDeps: true,
			devDeps: false,
		}),
	],
});

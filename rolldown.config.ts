import { defineConfig } from "rolldown";
import copy from "rollup-plugin-copy";
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
		copy({
			targets: [
				{
					src: "scripts/tsconfig/tsconfig.json",
					dest: "dist/tsconfig",
				},
			],
		}),
		dts({
			tsconfigPath: "tsconfig.build.json",
			outDirs: "dist",
			bundleTypes: false,
			copyDtsFiles: false,
		}),
		nodeExternals({
			packagePath: "./package.json",
			deps: true,
			peerDeps: true,
			optDeps: true,
			devDeps: false,
		}),
	],
});

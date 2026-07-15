import { defineConfig } from "oxlint";
import { openConfig } from "@duplojs/code-config/oxlint";

const jsPluginRulePrefixes = [
	"@stylistic/",
	"duplojs-plugin/",
];

const rulesWithoutJsPlugins = Object.fromEntries(
	Object.entries(openConfig.rules ?? {})
		.filter(([ruleName]) => !jsPluginRulePrefixes.some((prefix) => ruleName.startsWith(prefix))),
);

export default defineConfig({
	...openConfig,
	jsPlugins: [],
	rules: rulesWithoutJsPlugins,
	ignorePatterns: ["**/*.d.ts"],
});

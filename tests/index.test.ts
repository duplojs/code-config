import { readFileSync } from "node:fs";
import stylisticPlugin from "@stylistic/eslint-plugin";
import { DuplojsOxlint } from "@scripts";

interface JsonSchema {
	definitions: {
		DummyRuleMap: {
			properties: Record<string, unknown>;
		};
	};
}

describe("index", () => {
	const oxlintSchema = JSON.parse(
		readFileSync("node_modules/oxlint/configuration_schema.json", "utf8"),
	) as JsonSchema;
	const oxlintRuleNames = new Set(Object.keys(oxlintSchema.definitions.DummyRuleMap.properties));
	const stylisticRuleNames = new Set(Object.keys(stylisticPlugin.rules));

	it("uses known rules", () => {
		const presetRules = [
			["basePreset", DuplojsOxlint.basePreset],
			["openPreset", DuplojsOxlint.openPreset],
			["testPreset", DuplojsOxlint.testPreset],
		] as const;
		const unknownRules: string[] = [];

		for (const [presetName, preset] of presetRules) {
			const jsPluginNames = new Set(preset.jsPlugins.map(({ name }) => name));

			for (const ruleName of Object.keys(preset.rules)) {
				if (ruleName.startsWith("@stylistic/")) {
					const stylisticRuleName = ruleName.slice("@stylistic/".length);

					if (!jsPluginNames.has("@stylistic") || !stylisticRuleNames.has(stylisticRuleName)) {
						unknownRules.push(`${presetName}: ${ruleName}`);
					}

					continue;
				}

				if (ruleName.startsWith("duplojs-plugin/")) {
					const pluginRuleName = ruleName.slice("duplojs-plugin/".length);

					if (!jsPluginNames.has("duplojs-plugin") || !Object.hasOwn(DuplojsOxlint.plugin.rules, pluginRuleName)) {
						unknownRules.push(`${presetName}: ${ruleName}`);
					}

					continue;
				}

				if (ruleName.startsWith("typescript/") && !preset.plugins.includes("typescript")) {
					unknownRules.push(`${presetName}: ${ruleName}`);
					continue;
				}

				if (!oxlintRuleNames.has(ruleName)) {
					unknownRules.push(`${presetName}: ${ruleName}`);
				}
			}
		}

		expect(
			unknownRules,
			`Unknown configured rules:\n${unknownRules.map((ruleName) => `- ${ruleName}`).join("\n")}`,
		).toEqual([]);
	});
});

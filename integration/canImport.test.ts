import * as codeConfig from "@duplojs/code-config";
import commitlintConfig from "@duplojs/code-config/commitlint";
import * as oxlintConfig from "@duplojs/code-config/oxlint";
import plugin, * as oxlintPlugin from "@duplojs/code-config/oxlint/plugin";

const expectedRootExports = [
	"DuplojsCommitlint",
	"DuplojsOxlint",
] as const;

const expectedOxlintExports = [
	"baseConfig",
	"basePreset",
	"basePresetConfig",
	"camelcase",
	"defineRules",
	"dotNotation",
	"noUnreachableLoop",
	"openConfig",
	"openPreset",
	"plugin",
	"pluginRules",
	"pluginSpecifier",
	"preferDestructuring",
	"testConfig",
	"testPreset",
] as const;

const expectedOxlintPluginExports = [
	"camelcase",
	"default",
	"dotNotation",
	"noUnreachableLoop",
	"plugin",
	"pluginRules",
	"pluginSpecifier",
	"preferDestructuring",
] as const;

describe("package imports", () => {
	it("can import the root export", () => {
		expect(Object.keys(codeConfig)).toEqual(expect.arrayContaining([...expectedRootExports]));
		expect(codeConfig.DuplojsOxlint.openConfig).toBe(oxlintConfig.openConfig);
		expect(codeConfig.DuplojsCommitlint.default).toBe(commitlintConfig);
	});

	it("can import oxlint exports", () => {
		expect(Object.keys(oxlintConfig)).toEqual(expect.arrayContaining([...expectedOxlintExports]));
		expect(oxlintConfig.pluginSpecifier).toBe("@duplojs/code-config/oxlint/plugin");
		expect(oxlintConfig.plugin.rules).toBe(oxlintConfig.pluginRules);
		expect(oxlintConfig.openConfig.rules).toBeDefined();
		expect(oxlintConfig.baseConfig.rules).toBeDefined();
		expect(oxlintConfig.testConfig.rules).toBeDefined();
	});

	it("can import the oxlint plugin export", () => {
		expect(Object.keys(oxlintPlugin)).toEqual(expect.arrayContaining([...expectedOxlintPluginExports]));
		expect(plugin).toBe(oxlintPlugin.plugin);
		expect(oxlintPlugin.default).toBe(plugin);
		expect(oxlintPlugin.plugin.rules).toEqual(oxlintPlugin.pluginRules);
	});

	it("can import the commitlint export", () => {
		expect(commitlintConfig.extends).toContain("@commitlint/config-conventional");
		expect(commitlintConfig.rules["type-enum"]).toBeDefined();
	});

	it("can resolve the tsconfig export", () => {
		expect(import.meta.resolve("@duplojs/code-config/tsconfig.json")).toMatch(
			/\/dist\/tsconfig\/tsconfig\.json$/,
		);
	});
});

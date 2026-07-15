import { bench, describe } from "vitest";
import { execFileSync } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const ROOT = __dirname;
const REPO_ROOT = path.resolve(ROOT, "..");
const EXAMPLES_DIR = path.join(ROOT, "fixtures");
const ESLINT_CONFIG = path.join(ROOT, "es.config.js");
const OXLINT_CONFIG = path.join(ROOT, "ox.config.ts");
const OXLINT_NO_JS_PLUGINS_CONFIG = path.join(ROOT, "ox.no-js-plugins.config.ts");
const ESLINT_BIN = path.join(REPO_ROOT, "node_modules", ".bin", "eslint");
const OXLINT_BIN = path.join(REPO_ROOT, "node_modules", ".bin", "oxlint");

const files = fs
	.readdirSync(EXAMPLES_DIR)
	.filter((files) => files.endsWith(".ts"))
	.map((files) => path.join(EXAMPLES_DIR, files));

function run(bin: string, args: string[]) {
	try {
		return execFileSync(process.execPath, [bin, ...args], { stdio: ["ignore", "pipe", "pipe"] });
	} catch (error) {
		const stdout = error instanceof Error && "stdout" in error && Buffer.isBuffer(error.stdout)
			? error.stdout.toString()
			: "";
		const stderr = error instanceof Error && "stderr" in error && Buffer.isBuffer(error.stderr)
			? error.stderr.toString()
			: "";

		throw new Error(
			[
				`Command failed: ${process.execPath} ${bin} ${args.join(" ")}`,
				stdout.trim(),
				stderr.trim(),
			].filter(Boolean).join("\n"),
			{ cause: error },
		);
	}
}

const eslintArgs = ["--config", ESLINT_CONFIG, ...files];
const oxlintArgs = ["--config", OXLINT_CONFIG, ...files];
const oxlintNoJsPluginsArgs = ["--config", OXLINT_NO_JS_PLUGINS_CONFIG, ...files];

run(ESLINT_BIN, eslintArgs);
run(OXLINT_BIN, oxlintArgs);
run(OXLINT_BIN, oxlintNoJsPluginsArgs);

describe("ESLint vs Oxlint (CLI)", () => {
	bench("ESLint", () => {
		run(ESLINT_BIN, eslintArgs);
	});

	bench("Oxlint", () => {
		run(OXLINT_BIN, oxlintArgs);
	});

	bench("Oxlint (no JS plugins)", () => {
		run(OXLINT_BIN, oxlintNoJsPluginsArgs);
	});
});

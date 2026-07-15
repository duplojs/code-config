import { SC } from "@duplojs/server-utils";
import { DP } from "@duplojs/utils";

await SC.exec(
	{
		options: [
			SC.createBooleanOption("recursive", {
				aliases: ["r"],
				description: "copy directories recursively",
			}),
			SC.createBooleanOption("force", {
				aliases: ["f"],
				description: "overwrite without prompt",
			}),
		],
		subjects: [
			SC.createArgument("src", DP.string(), { description: "source file or directory" }),
			SC.createArgument("dest", DP.string(), { description: "destination path" }),
		],
	},
	({ args, options }) => {
		void args;
		//   ^?
		void options;
		//   ^?
	},
);

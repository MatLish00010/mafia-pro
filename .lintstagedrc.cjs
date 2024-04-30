module.exports = {
	// Run Biome on staged files that have the following extensions: js, ts, jsx, tsx, json and jsonc
	"*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": [
		"biome check  --files-ignore-unknown=true ./src", // Check formatting and lint
		"biome check  --apply --no-errors-on-unmatched ./src", // Format, sort imports, lint, and apply safe fixes
		"biome check  --apply --organize-imports-enabled=false --no-errors-on-unmatched ./src", // format and apply safe fixes
		"biome check  --apply-unsafe --no-errors-on-unmatched ./src", // Format, sort imports, lints, apply safe/unsafe fixes
		"biome format --write --no-errors-on-unmatched ./src", // Format
		"biome lint  --apply --no-errors-on-unmatched ./src", // Lint and apply safe fixes
	],
	// Alternatively you can pass every files and ignore unknown extensions
	"*": [
		"biome check --no-errors-on-unmatched --files-ignore-unknown=true ./src", // Check formatting and lint
	],
};

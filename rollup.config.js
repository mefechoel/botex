import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import rimraf from "rimraf";

rimraf.sync("dist");

function createConfig({ input, file, format, minify = false }) {
	const isUmd = format === "umd";
	return {
		input,
		output: {
			file,
			format,
			...(isUmd ? { name: "Botex", exports: "named" } : {}),
		},
		plugins: [
			resolve(),
			commonjs(),
			json({ preferConst: true, compact: true }),
			typescript({ module: "ESNext" }),
			minify && terser({ compress: { passes: 3, ecma: "2021" } }),
		],
	};
}

export default [
	// ES-Modules
	// index
	createConfig({
		input: "src/index.ts",
		file: "dist/index.mjs",
		format: "es",
	}),
	createConfig({
		input: "src/index.ts",
		file: "dist/index.min.mjs",
		format: "es",
		minify: true,
	}),

	// scramble
	createConfig({
		input: "src/scramble.ts",
		file: "dist/scramble.mjs",
		format: "es",
	}),
	createConfig({
		input: "src/scramble.ts",
		file: "dist/scramble.min.mjs",
		format: "es",
		minify: true,
	}),

	// unscramble
	createConfig({
		input: "src/unscramble.ts",
		file: "dist/unscramble.mjs",
		format: "es",
	}),
	createConfig({
		input: "src/unscramble.ts",
		file: "dist/unscramble.min.mjs",
		format: "es",
		minify: true,
	}),

	// ES-Modules
	// index
	createConfig({
		input: "src/index.ts",
		file: "dist/index.umd.js",
		format: "umd",
	}),
	createConfig({
		input: "src/index.ts",
		file: "dist/index.min.umd.js",
		format: "umd",
		minify: true,
	}),

	// scramble
	createConfig({
		input: "src/scramble.ts",
		file: "dist/scramble.umd.js",
		format: "umd",
	}),
	createConfig({
		input: "src/scramble.ts",
		file: "dist/scramble.min.umd.js",
		format: "umd",
		minify: true,
	}),

	// unscramble
	createConfig({
		input: "src/unscramble.ts",
		file: "dist/unscramble.umd.js",
		format: "umd",
	}),
	createConfig({
		input: "src/unscramble.ts",
		file: "dist/unscramble.min.umd.js",
		format: "umd",
		minify: true,
	}),

	// CLI
	createConfig({
		input: "cli/index.ts",
		file: "dist/cli.mjs",
		format: "es",
		minify: true,
	}),
];

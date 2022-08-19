import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import rimraf from "rimraf";

rimraf.sync("dist");

const cliBanner = `/*! @license
This program uses the amazing Commander library (https://github.com/tj/commander.js)

Find its license here:

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
`;

function createConfig({ input, file, format, minify = false, plugins = [] }) {
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
			...plugins,
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
		file: "dist/botex.mjs",
		format: "es",
		minify: true,
		plugins: [banner(cliBanner)],
	}),
];

/** @type {(banner: string) => import('rollup').Plugin} */
function banner(bannerStr) {
	return {
		name: "banner",
		generateBundle(options, bundle) {
			/** @type {[string, import('rollup').OutputAsset | import('rollup').OutputChunk][]} */
			const entries = Object.entries(bundle);
			entries.forEach(([, entry]) => {
				if (entry.type === "asset" && entry.fileName.endsWith(".css")) {
					entry.source = bannerStr + entry.source;
				}
				if (entry.type === "chunk") {
					entry.code = bannerStr + entry.code;
				}
			});
		},
	};
}

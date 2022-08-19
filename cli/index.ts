/* eslint-disable no-console */
import { randomBytes } from "crypto";
import { Command } from "commander";
import { scramble, unscramble } from "../src/botex";
import { version } from "../package.json";

const keySrc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const defaultKeyLength = 16;

const createKey = (keyLength: number, alphabet = keySrc) =>
	[...randomBytes(keyLength)]
		.map((byte) => {
			const index = Math.floor((byte / 256) * alphabet.length);
			return alphabet[index];
		})
		.join("");

const program = new Command();

program.version(version, "-v, --version");

program
	.command("scramble <input>", { isDefault: true })
	.description(
		"Obfuscate the input string, so that bots (hopefully) can't read it (default command)",
	)
	.option(
		"-k, --key <key>",
		"The key used to obfuscate the input. This can be any string",
	)
	.option(
		"-a, --auto-key",
		"If present, botex will auto generate a key for you",
		false,
	)
	.option(
		"-b, --alphabet <alphabet>",
		"The set of characters botex should use to generate a key",
		keySrc,
	)
	.option(
		"-l, --key-length <length>",
		"The length of the generated key",
		defaultKeyLength + "",
	)
	.option(
		"-s, --code-snippet",
		"Print a JS code snippet using the created values",
		false,
	)
	.action(
		(
			input: string,
			options: {
				key?: string;
				autoKey: boolean;
				alphabet: string;
				keyLength: string;
				codeSnippet: boolean;
			},
		) => {
			const key = options.autoKey
				? createKey(Number(options.keyLength), options.alphabet)
				: options.key;

			if (!key) {
				throw new TypeError(
					"Invalid option for command 'scramble': The 'key' flag is required " +
						"when the 'auto-key' flag is not set.",
				);
			}

			const obfuscatedData = scramble(input, key);

			if (!options.codeSnippet) {
				if (options.autoKey) {
					console.log("Key: ", key);
				}
				console.log("Data:", obfuscatedData);
			} else {
				const snippet =
					"\n" +
					'import { unscramble } from "botex";\n' +
					"\n" +
					`const key = "${key}";\n` +
					`const obfuscatedData = "${obfuscatedData}";\n` +
					`const openMail = () => {\n` +
					`  window.location.href = \`mailto:\${unscramble(obfuscatedData, key)}\`;\n` +
					"};\n" +
					`const copyMail = () => {\n` +
					`  navigator.clipboard.writeText(unscramble(obfuscatedData, key));\n` +
					"};\n";
				console.log(snippet);
			}
		},
	);

program
	.command("unscramble <input>")
	.description("Deobfuscate a scrambled string to retrieve the original data")
	.requiredOption("-k, --key <key>", "The key used to obfuscate the input")
	.action((input: string, options: { key: string }) => {
		console.log("Data:", unscramble(input, options.key));
	});

program.parse();

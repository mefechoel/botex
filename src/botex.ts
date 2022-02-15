/*
 * Only use `let` variables to produce the smallest possible bundle.
 * Use `const` only for the exported functions, to avoid mutable
 * exports.
 * Also, instead of using the `Number` function to parse ints from
 * strings, use the shorter unary `+` operator.
 * This isn't pretty, but this utility should not be noticable in your
 * app's bundle.
 */

/**
 * Obfuscate any input string to protect it from being scraped by bots.
 * Use this to obscure email addresses phone numbers etc.
 *
 * @param {String} inputStr The input to scramble. For example an email or
 * a phone number.
 * @param {String} key The key used to scramble the input. This can be any
 * string, that is at least one character long.
 * @returns {String} The obfuscated input. Use `unscramble` to get back the
 * original input.
 *
 * @example
 * ```js
 * import { scramble } from "botex";
 *
 * const key = "abc123xyz";
 * const mail = "my@mail.com";
 * const obfuscatedMail = scramble(mail, key);
 * // -> some gibberish bots hopefully can't read...
 * ```
 */
const scramble = (inputStr: string, key: string): string => {
	// The codes in the scrabled strings are base36 encoded, so they'll
	// never contain uppercase letters. We use the first 10 uppercase
	// letters to encode the length of each code in base10, simply by
	// replacing each digit from 0-9 with the corresponding letter
	// from A-J
	let base10Codes = "ABCDEFGHIJ";

	// Calculate the length of a code and encode the result as a string
	// using only uppercase letters.
	let stringifyLength = (char: string): string =>
		(char.length + "")
			.split("")
			.map(
				(num) =>
					// Using the unary `+` here is equivalent to `Number(num)`. It's
					// just a bit shorter
					base10Codes[+num],
			)
			.join("");

	let currentLength = "";
	let obfuscated = "";

	// Use map instead of forEach, as it's a bit shorter
	inputStr.split("").map((char, i) => {
		// XOR each letters char code with the char code of the key at
		// the same index.

		// If the input is longer than the key, wrap back to the start
		// of the key, when its length is exceeded
		let keyCode = key.charCodeAt(i % key.length);
		let charCode = char.charCodeAt(0);
		let cypherCode = charCode ^ keyCode;
		// Convert the code to a base 36 string. This way we can shave a few
		// bytes off the length of the encoded string
		let code = cypherCode.toString(36);

		// Only prefix a code with its encoded length, when it is different
		// to the previous length. This way, we don't need to put a separator
		// after every code, to distinguish it from the next; we just store
		// its length, use the length as a separator and, when decoding
		// advance by the length for each code until we hit the next length
		// indicator
		let codeLength = stringifyLength(code);
		if (codeLength !== currentLength) {
			currentLength = codeLength;
			obfuscated += codeLength;
		}
		obfuscated += code;
	});

	return obfuscated;
};

/**
 * Get back the original data, that was obfuscated with the `scramble`
 * function. Use this upon a user interaction to, for example, copy a
 * private phone number to the clipboard or to open an email address in
 * a mail program using a `mailto:` url.
 *
 * @param {String} scrambledStr The input to unscramble. Pass the scrambled
 * email, phone number or other personal data to the `unscramble` function
 * upon a user interaction, to retrieve the original data.
 * @param {String} key The key that was used to scramble the input. This can be
 * any string, that is at least one character long.
 * @returns {String} The original string.
 *
 * @example
 * ```js
 * import { unscramble } from "botex";
 *
 * const key = "abc123xyz";
 * const scrambledMail = "Aasd123Bsdf..."; // Some gibberish...
 * const mailtoLink = document.querySelector("#mail-link");
 *
 * mailtoLink.onclick = () => {
 *   // Get back the original data
 *   const originalMail = unscramble(scrambledMail, key);
 *   location.href = `mailto:${originalMail}`;
 * };
 * ```
 */
const unscramble = (scrambledStr: string, key: string): string => {
	// Turn an uppercase encoded length back to a number
	let parseLength = (encodedLength: string): number => {
		let base10Str = encodedLength
			.split("")
			// The charcode of "A" is 65, so subtracting 65 gives us the index
			// in the string "ABCDEFGHIJ", so the encoded base10 number
			.map((letter) => letter.charCodeAt(0) - 65)
			.join("");
		// Using the unary `+` here is equivalent to `Number(base10Str)`. It's
		// just a bit shorter
		return +base10Str;
	};

	// An encoded string, conceptually, is a list of XOR ciphered char codes.
	// To identify which part of a string is one code, we separate the codes
	// with length markers. When we encounter the marker `C`, for example,
	// we know, that until we reach the next length marker, each code will be
	// 2 characters long. If we then hit a `E`, we know the next codes will be
	// 4 characters long. So the parser can be in two states: parsing a length
	// marker or parsing a code.
	// Don't use a TS Enum here, as it will generate quite a lot of code...
	let ParserStateLength = 0 as const;
	let ParserStateCode = 1 as const;
	type ParserState = typeof ParserStateLength | typeof ParserStateCode;

	// Each encoded string starts with a length marker
	let state: ParserState = ParserStateLength;
	// Keep track of where we're at in the code list
	let i = 0;
	// If we're parsing a lenght marker, store the current value
	let currentLength = "";
	// If we're parsing a code, store the current value
	let currentCode = "";
	// When we're done parsing a code, append its decrypted value to the
	// result string
	let result = "";

	// Use map instead of forEach, as it's a bit shorter
	scrambledStr.split("").map((char) => {
		// Length markers are uppercase letters between A-J. We don't need regex
		// start or end markers (^, $) here, because we know, that we only ever
		// check one letter at a time
		let base10CodesRegex = /[A-J]/;
		// We've hit a length marker
		if (base10CodesRegex.test(char)) {
			// If already in length parsing mode, append the char to the current
			// length. We've hit a multi digit length marker
			currentLength = state /* true if state == 1 == ParserStateCode */
				? char
				: currentLength + char;
			state = ParserStateLength;
		} else {
			state = ParserStateCode;
			currentCode += char;
			// Clear the code and append its decrypted value to the result, when
			// we've hit its target length
			if (currentCode.length == parseLength(currentLength)) {
				// Decrypt the encoded codes using the same XOR cipher we used to
				// encrypt the input.
				// Each code is base36 encoded to save space
				let cypherCodes = parseInt(currentCode, 36);
				// Get the charcode at the current index in the codelist.
				// Increment the position on the codelist afterwards
				let keyCode = key.charCodeAt(i++ % key.length);
				let charCode = cypherCodes ^ keyCode;
				result += String.fromCharCode(charCode);
				currentCode = "";
			}
		}
	});

	return result;
};

export { scramble, unscramble };

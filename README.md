# botex

[![npm package](https://img.shields.io/npm/v/botex.svg?style=flat-square)](https://npmjs.com/package/botex)
[![npm bundle size](https://img.shields.io/bundlephobia/min/botex?style=flat-square)](https://bundlephobia.com/result?p=botex)
[![NPM](https://img.shields.io/npm/l/botex?style=flat-square)](https://github.com/mefechoel/botex/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/mefechoel/botex?style=flat-square)](https://github.com/mefechoel/botex/commits/main)
[![Code Style Prettier](https://img.shields.io/badge/code%20style-prettier-ff7fe1.svg?style=flat-square)](https://github.com/prettier/prettier#readme)
[![Test Status](https://img.shields.io/github/workflow/status/mefechoel/botex/Test?style=flat-square)](https://github.com/mefechoel/botex/actions?query=workflow%3ATest)

> Obfuscate email addresses and other personal data, so bots can't scrape them.

Some personal information like email addresses or phone numbers, should never
appear in plain text in your website's source code, so bots can't scrape them.
Otherwise your contact information is in danger of being the target of spam
mails or sms. This is where `botex` comes in. Using its CLI, the
[botex webapp](https://botex.pages.dev/), or using the library server side, you
can hide your personal contact info from bots. Usually, this is done by base64
encoding the email or tel strings and only decoding them when a user clicks on a
mailto link for example. But scraping bots have improved and can nowadays
automatically decipeher base64 or other simple ciphers, such as cesar ciphers.
`botex` obfuscates personal information by using a key - that can be any
string - to scramble the input. Doing that, it makes it much harder for bots to
deobfuscate the data, as they'd first need to find out that you're using `botex`
and then not only find the encoded information, but also the key for it.
Specialized bots would first have to be developed to do this, which is hopefully
to much of a hassle for hackers to be done.

`botex` tries to be a compromise between being secure (it's not securely
encrypting anything, but hopefully annoying bots enough to give up) and being
simple (the functions are straight forward and the lib much smaller than 1kb).
Just be aware, that you're not perfectly protected just because your using
`botex`, but you're certainly better off than using base64.

Now you might ask, how to put your email address on your webpage for everyone to
see, without actually having it in your source code... For that I recommend
creating an SVG image from your email address with a tool, such as
[Google Font to Svg Path](https://danmarshall.github.io/google-font-to-svg-path/).
When that SVG is clicked you can open a mailto link, that you decrypt using
`botex`. Some people encode email addresses as HTML entities or put them on the
page in reverse character order and flip them again using CSS, but I suspect
that bots have by now gotten the hang of that, too.

One note on the opening of mailto links on click though... I don't know about
you, but I hate when a page is doing that... I much prefer having two icons
either next to the email, or appearing as a popup on hover or on click, that let
you select to either open the mailto link or to copy the mail to the clipboard.
Checkout this
[example for selectively copying the mail or opening it](/examples/copy-or-open).

## Usage

```js
import { scramble, unscramble } from "botex";

const key = "abc123xyz";
const mail = "my@mail.com";
const obfuscatedMail = scramble(mail, key);
// -> some gibberish bots hopefully can't read...

// ...

const key = "abc123xyz";
const scrambledMail = "Aasd123Bsdf..."; // Some gibberish...
const mailtoLink = document.querySelector("#mail-link");

mailtoLink.onclick = () => {
	// Get back the original data
	const originalMail = unscramble(scrambledMail, key);
	location.href = `mailto:${originalMail}`;
};
```

## CLI

`botex` comes with a cli that helps you to obfuscate information and to create
keys, so you can just copy them into your project.

```
$ botex --help

Usage: cli [options] [command]

Options:
  -v, --version                 output the version number
  -h, --help                    display help for command

Commands:
  scramble [options] <input>    Obfuscate the input string, so that bots (hopefully) can't read it (default command)
  unscramble [options] <input>  Deobfuscate a scrambled string to retrieve the original data
```

```
$ botex scramble --help

Usage: cli scramble [options] <input>

Obfuscate the input string, so that bots (hopefully) can't read it (default command)

Options:
  -k, --key <key>            The key used to obfuscate the input. This can be any string
  -a, --auto-key             If present, botex will auto generate a key for you (default: false)
  -l, --key-length <length>  The length of the generated key (default: "16")
  -s, --code-snippet         Print a JS code snippet using the created values (default: false)
```

```
$ botex unscramble --help

Usage: cli unscramble [options] <input>

Deobfuscate a scrambled string to retrieve the original data

Options:
  -k, --key <key>  The key used to obfuscate the input
```

## License

MIT

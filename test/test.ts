import test from "ava";
import type { ExecutionContext } from "ava";
import { scramble, unscramble } from "../src/botex";

const macro = (t: ExecutionContext<unknown>, input: string, key: string) => {
	const scrambled = scramble(input, key);
	const unscrambled = unscramble(scrambled, key);

	t.is(unscrambled, input);
	t.not(scrambled, unscrambled);
};

macro.title = (providedTitle = "", input: string) =>
	`${providedTitle} ${input}`.trim();

const destroyed1 = `


H̨̛̖̩̤̼̟̝̗̞̖̻͇̞̜̖̱͂̾͆︣̄᷅︣᷾͑̆͐͌ͪͣͥ̕͜ą̛̝̘̦̘͚̰᷿̳᷂͎͉̹̪̋̇᷈̂̐͛͂͜l̛͖̖̤̰͈̫̞̟̣͛̑ͫ͂︢̕͟͜͢ļ̢̱͔̗̘̳͖̪̰̩̌᷄̎̓͛᷆̈́̆͠o͓̜̞̗̱̻̝̞᷿͆ͯ̔͘͢͟͡w̢̡̧̟͖̭̠̟̗͖̳̫̺͔̤͈̐ͥ᷈͗̈̐︡̋ͦ̄᷉̾᷉͌͘͟e̢̫̰̯͈̓̂́͒̉᷀ͤ᷇̏̏ͩ͟͞e᷂̬̣͖͚̼ͭ̀ͭ̈ͣͥn̛̯̞̺̪̞͕̗̠̞̪͚͎̜̓͆᷾̓̈́ͫ͢͜


`;
const destroyed2 = `


H̵̜̙̤̬̼͚̍̂᷇ͣͧ͋̇̃ę̸̧̹̹̞̰̺̞͔͕̺̬̼̺̖͚̩̬̮͈̋͒ͬͧ͑̕͟͞ w̴̢͇̝̩̮᷆̿ͨ́ͣ̿᷄͋̇͞͞h̴̢̡̧̟͎̯̖̱̭̠͖̖̺᷊̱͋︡ͭ͂᷁͑̐ͥͤ̈́ͩ͗ͮ͆᷀᷆᷈͞͞o̷̧͖͈̰̜̞̖͈͇̠᷿̱ͧ᷀̑͂ͥ̌̚͟͜͝͡ w̴͓͉̠̜᷿᷂̐͐ͫ︢᷇ͥ̏̏ͫ̓᷁̾̃͠ǎ̶̧̧̢̛̖᷂̫᷂̫͕͉̳̺᷿̺̪̺̖̠͔᷿̰͚̦̹᷃̾᷄͑͂ͯͧ̃̽̋ͥ̍̽͊᷈̇ͧ︢͘͢i̶̢᷿̝̞᷿͈᷂̱̮͎̹̤͇ͫ᷅̈͂᷆᷾᷁͌̄̈̇ͥ͢͡t̷̠͖̙͓͕̳̼̻̩͇̱̜̩̺̐̉̽ͤ︡︣᷈ͣͧ̄͢s̸̨̢̜̬̣͔̙̞̭̪̠̬̪̦̲̬̱̼͉̱͎̹᷁ͭ̓̽͘͜ b̴̖̳̝̺͕̼̖̹̙̝͕̐̈́᷉̓ͪͭ̿̇̚ȩ̶̨̼͓̻̬̻᷊̪̠̣͓̣͔̺̰͓ͮ͑͊ͯ̀̏̆͒̌h̶̡̧̡̠̦͎̮̜̪̗͕̯͖᷂̙͇᷊̿ͣ̈́̔ͮͪ̿̃ͪͥ̉̍͌͆᷀᷀ͥ͡͡į̸̗͓̬͔͕̩͔̦͉͓͈͈͔̭̺̣̲᷂̝̮͌᷾̽︣̓︢̽᷆︢ͯ̐̇͒̑ͫ͢n̷̜̬͎̹̟̲̤̦̝̹᷂̖̭͔̓̓̐̀͐̓ͧͥͯ̉̀̄︢ͥ᷄͢͟ḑ̷̧̢̧̣͇͎͖̫͎͚̺͚̤̟̮͇̮̳̲᷊︠̓͗͒́ͣ͂͊︡ͪͫ̆ͣ̑̚͢ t̴̪̣̣͚̳̓͋ͦ᷆̏̋᷆̈͌͋̔͂ͨ͜h̸͖̹̫̜͔̫̭̣̪̙ͩ᷉ͩ᷈ͧͣ̈́̈́͊︢̃ͨͣͦͥ︠͂̕̚͢͡ȩ̴̧̨͇̱̳᷂̝̮̭͚̖̟̝̻̑᷃᷅̿᷀̔᷉̓̋̎͞ ẇ̸̡͓̰̲͖̝͓͔͓̲͚̰̝̘̝︢̍̃᷃᷈͒᷉᷁᷃͌̅͜͟͝ą̴̢̢͉̠̫̺̠̫̖͈̩̺̗̪̹̪͆ͬ̋᷆͑ͣ̀᷇̾͜͞l̷̨̢̯̜͕̝᷂͔̺̟̼᷆̾ͥͣͮ̔︣ͭ̓ͪ̎̚̕̕͟͠l̴̢̻͓̙̝͇̦̦͕̠̙͕᷂̩̼̘̤̘̦᷂᷿᷉ͫ̈́͒̇̚̕͟͢͟͡͞


`;

const asciiKey = "abc123@}|&";
test("ASCII:     Email        ", macro, "abc@mail.xyz", asciiKey);
test("ASCII:     Email unicode", macro, "你好@電子郵件.com", asciiKey);
test("ASCII:     Email unicode", macro, "안녕하세요@이메일.org", asciiKey);
test("ASCII:     Emoji        ", macro, "abc 👾 123 👨‍👨‍👧‍👧 👨🏾‍🍼", asciiKey);
test("ASCII:     Tel          ", macro, "+99 123 0123 9876", asciiKey);
test("ASCII:     Tel          ", macro, "0123-0123-9876", asciiKey);
test("ASCII:     Destroyed 1  ", macro, destroyed1, asciiKey);
test("ASCII:     Destroyed 2  ", macro, destroyed2, asciiKey);

const emojiKey = "password 👬🏼 🚴🏻‍♀️ 123";
test("Emoji:     Email        ", macro, "abc@mail.xyz", emojiKey);
test("Emoji:     Email unicode", macro, "你好@電子郵件.com", emojiKey);
test("Emoji:     Email unicode", macro, "안녕하세요@이메일.org", emojiKey);
test("Emoji:     Emoji        ", macro, "abc 👾 123 👨‍👨‍👧‍👧 👨🏾‍🍼", emojiKey);
test("Emoji:     Tel          ", macro, "+99 123 0123 9876", emojiKey);
test("Emoji:     Tel          ", macro, "0123-0123-9876", emojiKey);
test("Emoji:     Destroyed 1  ", macro, destroyed1, emojiKey);
test("Emoji:     Destroyed 2  ", macro, destroyed2, emojiKey);

const unicodeKey = "超級安全的密碼 매우 안전한 비밀번호";
test("Unicode:   Email        ", macro, "abc@mail.xyz", unicodeKey);
test("Unicode:   Email unicode", macro, "你好@電子郵件.com", unicodeKey);
test("Unicode:   Email unicode", macro, "안녕하세요@이메일.org", unicodeKey);
test("Unicode:   Emoji        ", macro, "abc 👾 123 👨‍👨‍👧‍👧 👨🏾‍🍼", unicodeKey);
test("Unicode:   Tel          ", macro, "+99 123 0123 9876", unicodeKey);
test("Unicode:   Tel          ", macro, "0123-0123-9876", unicodeKey);
test("Unicode:   Destroyed 1  ", macro, destroyed1, unicodeKey);
test("Unicode:   Destroyed 2  ", macro, destroyed2, unicodeKey);

const destroyedKey = `L̪̪̪̪̪i᷂᷂᷂᷂᷂f̟̟̟̟̟e̳̳̳̳̳ i͈͈͈͈͈s̹̹̹̹̹ l͈͈͈͈͈i͢͢͢͢͢k͜͜͜͜͜e͢͢͢͢͢ t̟̟̟̟̟h̖̖̖̖̖e͕͕͕͕͕ o̤̤̤̤̤c̬̬̬̬̬e̺̺̺̺̺a̜̜̜̜̜n͎͎͎͎͎,̻̻̻̻̻

i͢͢͢͢͢ṯ̱̱̱̱ g̡̡̡̡̡o̘̘̘̘̘e̻̻̻̻̻s̞̞̞̞̞ u̠̠̠̠̠p̦̦̦̦̦ a͈͈͈͈͈n̲̲̲̲̲d̼̼̼̼̼ ḓ̭̭̭̭o̙̙̙̙̙w̗̗̗̗̗n͚͚͚͚͚.͚͚͚͚͚

V͕͕͕͕͕a͓͓͓͓͓n̜̜̜̜̜e̹̹̹̹̹s̻̻̻̻̻s͖͖͖͖͖a͇͇͇͇͇ P͜͜͜͜͜a͔͔͔͔͔r̭̭̭̭̭ą̨̨̨̨d̨̨̨̨̨i̧̧̧̧̧s̜̜̜̜̜

`;
test("Destroyed: Email        ", macro, "abc@mail.xyz", destroyedKey);
test("Destroyed: Email unicode", macro, "你好@電子郵件.com", destroyedKey);
test("Destroyed: Email unicode", macro, "안녕하세요@이메일.org", destroyedKey);
test("Destroyed: Emoji        ", macro, "abc 👾 123 👨‍👨‍👧‍👧 👨🏾‍🍼", destroyedKey);
test("Destroyed: Tel          ", macro, "+99 123 0123 9876", destroyedKey);
test("Destroyed: Tel          ", macro, "0123-0123-9876", destroyedKey);
test("Destroyed: Destroyed 1  ", macro, destroyed1, destroyedKey);
test("Destroyed: Destroyed 2  ", macro, destroyed2, destroyedKey);

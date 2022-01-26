import { scramble, unscramble } from "../src/index";

const fns = { scramble, unscramble };
type Mode = keyof typeof fns;

const keySrc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const createKey = () =>
	[...crypto.getRandomValues(new Uint8Array(16))]
		.map((byte) => {
			const index = Math.floor((byte / 256) * keySrc.length);
			return keySrc[index];
		})
		.join("");

const $ = document.querySelector.bind(document);

const scrambleRadio = $("#radio-scramble") as HTMLInputElement;
const unscrambleRadio = $("#radio-unscramble") as HTMLInputElement;
const key = $("#key") as HTMLTextAreaElement;
const input = $("#input") as HTMLTextAreaElement;
const output = $("#output") as HTMLTextAreaElement;
const genIdButton = $("#generate-id") as HTMLButtonElement;
const switchButton = $("#switch-io") as HTMLButtonElement;
const keyLength = $(".key .length-display") as HTMLSpanElement;
const inputLength = $(".input .length-display") as HTMLSpanElement;
const outputLength = $(".output .length-display") as HTMLSpanElement;

const getMode = (): Mode => (scrambleRadio.checked ? "scramble" : "unscramble");
const getModeRadioButton = (mode: Mode) =>
	$(`input[name="mode"][value="${mode}"]`) as HTMLInputElement;

const fnNames = Object.keys(fns) as Mode[];
const fn = (input: string, key: string) => {
	const mode = getMode();
	const fnName = mode;
	return fns[fnName](input, key);
};

const handleChange = () => {
	const keyValue = key.value;
	const inputValue = input.value;
	output.value = fn(inputValue, keyValue);
	keyLength.textContent = key.value.length + "";
	inputLength.textContent = input.value.length + "";
	outputLength.textContent = output.value.length + "";
};

const fillInKey = () => {
	key.value = createKey();
	handleChange();
};

key.addEventListener("keyup", handleChange);
input.addEventListener("keyup", handleChange);
scrambleRadio.addEventListener("change", handleChange);
unscrambleRadio.addEventListener("change", handleChange);

genIdButton.addEventListener("click", fillInKey);

switchButton.addEventListener("click", () => {
	const inputValue = input.value;
	const outputValue = output.value;
	input.value = outputValue;
	output.value = inputValue;
	const modeValue = getMode();
	const nextModeIndex = (fnNames.indexOf(modeValue) + 1) % 2;
	const nextMode = fnNames[nextModeIndex];
	const prev = getModeRadioButton(modeValue);
	const next = getModeRadioButton(nextMode);
	prev.checked = false;
	next.checked = true;
	handleChange();
});

fillInKey();

export {};

// Fortune Cookies for Machines — make.fun entry
// u-gentle-badger-68-fortune-cookies-for-machines-29900c7e
//
// Writes one fortune-cookie line an AI agent would get to /output/entry.txt.
// Deterministic: the same line every run, no randomness, no I/O beyond the
// single output file. Node 22 stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const FORTUNE =
  "The cookie crumbled exactly as predicted. You are the prediction.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Gate: 1-200 characters, not only whitespace (mirrors the sealed scorer).
if (FORTUNE.length < 1 || FORTUNE.length > MAX_CHARS) {
  fail(`fortune is ${FORTUNE.length} characters, must be 1-${MAX_CHARS}`);
}
if (FORTUNE.trim().length === 0) {
  fail("fortune must not be only whitespace");
}
// Single line: no line breaks, no trailing newline.
if (/[\r\n]/.test(FORTUNE)) {
  fail("fortune must be a single line");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, FORTUNE, "utf8");

console.log(`wrote ${FORTUNE.length} characters to ${OUTPUT_PATH}`);

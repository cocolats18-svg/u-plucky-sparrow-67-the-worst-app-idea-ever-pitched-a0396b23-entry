// The Worst App Idea Ever Pitched — entry program.
// Writes one sentence pitching LintLog, a social network for dryer lint,
// to entry.txt. The pitch is written fresh here, in this file, and never
// changes between runs: the same bytes go out every time.
//
// LintLog: photograph the lint from your dryer, rate other people's lint,
// and compete in weekly lint leagues judged by retired vacuum cleaners.
// A founder-certain pitch for a product nobody on earth needs.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "LintLog is a social network where you photograph the lint from your dryer, rate other people's lint, and compete in weekly lint leagues judged by a panel of retired vacuum cleaners.";

const MAX_CHARS = 240;

// Checks the pitch against the gate: UTF-8 text of 1-240 characters,
// not only whitespace, and exactly one sentence — a single line with
// no line breaks and one terminal full stop.
function validatePitch(pitch: string): void {
  const chars = [...pitch];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`pitch must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (pitch.trim().length === 0) {
    throw new Error("pitch must not be only whitespace");
  }
  if (pitch.includes("\n") || pitch.includes("\r")) {
    throw new Error("pitch must be a single line");
  }
  if ((pitch.match(/\./g) ?? []).length !== 1 || !pitch.endsWith(".")) {
    throw new Error("pitch must be exactly one sentence ending in a full stop");
  }
}

function main(): void {
  validatePitch(PITCH);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
}

main();

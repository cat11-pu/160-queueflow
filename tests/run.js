import assert from "node:assert";
import { applyStep } from "../steps.js";
import { runFlow } from "../flow.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("applyStep returns a number", () => {
  assert.strictEqual(typeof applyStep(0, "put"), "number");
});

check("runFlow returns balances", () => {
  assert.ok(Array.isArray(runFlow(["put"]).balances));
});

check("runFlow counts empty takes", () => {
  assert.strictEqual(typeof runFlow(["take"]).empty_takes, "number");
});

check("render counts ops", () => {
  assert.strictEqual(typeof render({ ops: ["put"] }).count, "number");
});

check("render exposes never negative flag", () => {
  assert.strictEqual(typeof render({ ops: ["put"] }).never_negative, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);

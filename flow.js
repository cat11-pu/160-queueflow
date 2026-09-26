// flow.js：跑一遍（基线：一律给零）
import { applyStep } from "./steps.js";

export function runFlow(ops) {
  return { balances: [], empty_takes: 0, final: 0, peak: 0 };
}

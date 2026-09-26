// flow.js：跑一遍操作串，一次扫描，每步只算一次。
import { applyStep, normalizeOp } from "./steps.js";

export function runFlow(ops) {
  const balances = [];
  let balance = 0;
  let empty_takes = 0;
  let peak = 0;

  for (const raw of ops) {
    const name = normalizeOp(raw);
    if (name === "take" && balance === 0) empty_takes += 1;
    balance = applyStep(balance, name);
    balances.push(balance);
    if (balance > peak) peak = balance;
  }

  return { balances, empty_takes, final: balance, peak };
}

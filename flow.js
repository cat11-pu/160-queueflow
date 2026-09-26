// flow.js：一次扫描跑完整串，收每步余额、空取次数、最终余额与峰值
import { applyStep } from "./steps.js";

export function runFlow(ops) {
  const list = Array.isArray(ops) ? ops : [];
  const balances = [];
  let balance = 0;
  let empty_takes = 0;
  let peak = 0;
  for (const raw of list) {
    const before = balance;
    balance = applyStep(balance, raw);
    if (before === 0 && balance === 0 && String(raw).trim() === "take") empty_takes += 1;
    if (balance > peak) peak = balance;
    balances.push(balance);
  }
  return { balances: balances, empty_takes: empty_takes, final: balance, peak: peak };
}

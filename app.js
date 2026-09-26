// app.js：渲染结果
import { applyStep } from "./steps.js";
import { runFlow } from "./flow.js";

export function render(spec) {
  const ops = spec.ops || [];
  const view = runFlow(ops);
  const balances = view.balances || [];
  let never = true;
  balances.forEach((value) => { if (value < 0) never = false; });
  return { balances: balances, empty_takes: view.empty_takes || 0, final: view.final || 0,
           peak: view.peak || 0, count: ops.length, never_negative: never };
}

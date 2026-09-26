// steps.js：单步入账（put 加一；take 减一，零余额出队为空取保持零）
export function applyStep(balance, op) {
  const name = String(op).trim();
  if (name === "put") return balance + 1;
  if (name === "take") return balance === 0 ? 0 : balance - 1;
  const error = new Error('不认识的操作 "' + name + '"');
  error.code = "E_BAD_OP";
  throw error;
}

// steps.js：单步入账。入队 put 余额加一，出队 take 余额减一；
// 余额为零时出队保持零（空取）。不认识的操作名抛 E_BAD_OP。
export function normalizeOp(op) {
  const name = typeof op === "string" ? op.trim() : "";
  if (name !== "put" && name !== "take") {
    const error = new Error("不认识的操作名：" + String(op));
    error.code = "E_BAD_OP";
    throw error;
  }
  return name;
}

export function applyStep(balance, op) {
  const name = normalizeOp(op);
  if (name === "put") return balance + 1;
  return balance > 0 ? balance - 1 : 0;
}

// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let ops = (spec.ops || []).slice();
  parts.log.textContent = "操作 " + ops.length + " 步，点按钮看余额曲线。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { ops: ops }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.balances.forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 步后";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, Math.max(0, value)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = String(value);
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "最终余额 " + view.final + "，空取 " + view.empty_takes + " 次，峰值 " + view.peak;
    parts.log.textContent = "是否从不为负 " + view.never_negative;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "跑一遍操作";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一次出队";
  addButton.addEventListener("click", function () {
    ops = ops.concat(["take"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一步";
  dropButton.addEventListener("click", function () {
    ops = ops.slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个操作名";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "put";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { ops: ops.concat([box.value]) }));
      parts.out.textContent = box.value + " 之后余额 " + view.final;
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看空取次数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { ops: ops }));
    parts.out.textContent = "空取 " + view.empty_takes + " 次，最终余额 " + view.final;
  });
  parts.controls.appendChild(readButton);

  draw();
}

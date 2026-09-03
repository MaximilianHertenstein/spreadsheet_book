(async () => {
  if (document.readyState === "loading")
    await new Promise(r => document.addEventListener("DOMContentLoaded", r, { once: true }));

  if (!document.querySelector('link[data-hot]')) {
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.dataset.hot = "1";
    l.href = "https://cdn.jsdelivr.net/npm/handsontable@18.1.0/styles/ht-theme-main.min.css";
    document.head.append(l);
  }

  const load = src => new Promise((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.onload = res; s.onerror = () => rej(new Error("Script: " + src));
    s.src = src; document.head.append(s);
  });

  window.__ods ??= Promise.all([
    "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js",
    "https://cdn.jsdelivr.net/npm/hyperformula@3.4.0/dist/hyperformula.full.min.js",
    "https://cdn.jsdelivr.net/npm/handsontable@18.1.0/dist/handsontable.full.min.js"
  ].map(load))
    .then(() => load("https://cdn.jsdelivr.net/npm/hyperformula@3.4.0/dist/languages/deDE.js"))
    .then(() => HyperFormula.registerLanguage("deDE", HyperFormula.languages.deDE));

  const els = [...document.querySelectorAll(".ods-table[data-file]:not([data-initialized])")];
  if (!els.length) return;
  try { await window.__ods; }
  catch (e) { return els.forEach(el => el.textContent = "Ladefehler: " + e.message); }

  const map = HyperFormula.languages.deDE.functions;

  // EN -> DE + ODS-Klammern -> A1 + "," -> ";" (ausser in "...")
  const norm = f => {
    const s = "=" + f.replace(/[\[\]]/g, "").replace(/:\./g, ":")
      .replace(/(^|[^\w$])\.(\$?[A-Z]{1,3}\$?\d+)/gi, "$1$2")
      .replace(/'([^']+)'\.(\$?[A-Z]{1,3}\$?\d+)/g, "'$1'!$2")
      .replace(/([\w$\u00C0-\u00FF]+)\.(\$?[A-Z]{1,3}\$?\d+)/g, "$1!$2")
      .replace(/[A-Z][\w.]*?(?=\()/gi, n => map[n.toUpperCase()] || n);
    return s.split('"').map((p, i) => i % 2 ? p : p.replace(/,/g, ";")).join('"');
  };

  const fmt = v => v == null ? "" : typeof v == "boolean" ? (v ? "WAHR" : "FALSCH")
    : typeof v == "number" ? v.toLocaleString("de-DE", { maximumFractionDigits: 10 })
    : v instanceof Date ? v.toLocaleDateString("de-DE") : v;

  const toVal = s => {
    const t = s.trim();
    const m = t.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/);
    if (m) return new Date(m[3].length === 2 ? +m[3] + 2000 : +m[3], m[2] - 1, m[1]);
    const n = t.includes(",") ? t.replace(/\./g, "").replace(",", ".") : t;
    return n !== "" && !isNaN(n) ? +n : s;
  };

  for (const el of els) {
    el.dataset.initialized = "true";
    const fb = document.createElement("div"); fb.className = "ods-formula-bar";
    const box = document.createElement("div");
    el.replaceChildren(fb, box);
    try {
      const res = await fetch(el.dataset.file);
      if (!res.ok) throw new Error("HTTP " + res.status + " " + el.dataset.file);
      const wb = XLSX.read(await res.arrayBuffer(), { cellFormula: true, cellDates: true });
      const name = el.dataset.sheet || wb.SheetNames[0];
      const ws = wb.Sheets[name], R = XLSX.utils.decode_range(ws["!ref"] || "A1");
      const data = Array.from({ length: R.e.r - R.s.r + 1 }, (_, i) =>
        Array.from({ length: R.e.c - R.s.c + 1 }, (_, j) => {
          const c = ws[XLSX.utils.encode_cell({ r: R.s.r + i, c: R.s.c + j })];
          return c?.f ? norm(c.f) : c?.v ?? null;
        }));

      const hot = new Handsontable(box, {
        data, rowHeaders: true, colHeaders: true, stretchH: "all", height: "auto",
        theme: "ht-theme-main",
        licenseKey: "non-commercial-and-evaluation",
        formulas: { engine: HyperFormula.buildEmpty({ licenseKey: "internal-use-in-handsontable", language: "deDE", functionArgSeparator: ";" }), sheetName: name },
        beforeChange: cs => cs?.forEach(c => { if (typeof c[3] == "string") c[3] = toVal(c[3]); }),
        renderer(...a) { Handsontable.renderers.TextRenderer.apply(this, a); const f = fmt(a[5]); if (f !== a[5]) a[1].textContent = f; },
        afterSelectionEnd: (r, c) => fb.textContent = fmt(hot.getSourceDataAtCell(r, c) ?? "")
      });
      if (el.dataset.select) {
        const { r, c } = XLSX.utils.decode_cell(el.dataset.select);
        hot.selectCell(r - R.s.r, c - R.s.c);
      }
    } catch (e) { el.textContent = "Fehler beim Laden: " + e.message; }
  }
})();
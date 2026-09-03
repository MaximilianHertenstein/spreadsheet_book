(async () => {
  const loadScript = src => new Promise((resolve, reject) =>
    document.head.append(Object.assign(document.createElement("script"), { src, onload: resolve, onerror: reject }))
  );

  // 1. Kern-Bibliotheken parallel laden, danach das deutsche Sprachpaket
  window.__odsLibs ??= Promise.all([
    "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js",
    "https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/dist/hyperformula.full.min.js",
    "https://cdn.jsdelivr.net/npm/handsontable@17.1.0/dist/handsontable.full.min.js"
  ].map(loadScript))
  .then(() => loadScript("https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/dist/languages/deDE.js"))
  .then(() => HyperFormula.registerLanguage("deDE", HyperFormula.languages.deDE));

  const tables = document.querySelectorAll(".ods-table[data-file]:not([data-initialized])");
  if (!tables.length) return;

  try { 
    await window.__odsLibs; 
  } catch (err) { 
    return tables.forEach(el => el.innerHTML = `<div class="ods-error">Ladefehler: ${err.message}</div>`); 
  }

  const deFuncs = HyperFormula.languages.deDE.functions;

  // Formel-Syntax aus ODS bereinigen und englische Funktionsnamen zu DE mappen
  const normalizeFormula = f => "=" + f
    .replace(/\[\./g, "").replace(/\]/g, "").replace(/\:\./g, ":").replace(/\./g, "!")
    .replace(/[A-Z_]+(?=\()/gi, name => deFuncs[name.toUpperCase()] || name);

  // Ausgabe-Formatierer für deutsche Darstellung
  const fmtDE = val => {
    if (typeof val === "boolean") return val ? "WAHR" : "FALSCH";
    if (typeof val === "number") return val.toLocaleString("de-DE", { maximumFractionDigits: 10 });
    if (val instanceof Date && !isNaN(val)) return val.toLocaleDateString("de-DE");
    return val;
  };

  for (const el of tables) {
    el.dataset.initialized = "true";
    
    const fb = document.createElement("div"); fb.className = "ods-formula-bar";
    const container = document.createElement("div");
    el.replaceChildren(fb, container);

    try {
      const res = await fetch(el.dataset.file);
      const wb = XLSX.read(await res.arrayBuffer(), { cellFormula: true, cellDates: true });
      const sheetName = el.dataset.sheet || wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const range = XLSX.utils.decode_range(ws["!ref"] || "A1");

      // Grid-Daten als Matrix aufbauen
      const data = Array.from({ length: range.e.r + 1 }, (_, r) =>
        Array.from({ length: range.e.c + 1 }, (_, c) => {
          const cell = ws[XLSX.utils.encode_cell({ r, c })];
          if (!cell) return null;
          return cell.f ? normalizeFormula(cell.f) : (cell.v ?? null);
        })
      );

      const hot = new Handsontable(container, {
        data,
        rowHeaders: true,
        colHeaders: true,
        stretchH: "all",
        height: "auto",
        licenseKey: "non-commercial-and-evaluation",
        formulas: {
          engine: HyperFormula.buildEmpty({
            licenseKey: "internal-use-in-handsontable",
            language: "deDE",
            functionArgSeparator: ";"
          }),
          sheetName
        },
        
        // Eingaben automatisch in Date-Objekte oder Zahlen umwandeln
        beforeChange(changes) {
          changes?.forEach(ch => {
            if (typeof ch[3] !== "string") return;
            const str = ch[3].trim().replace(",", ".");
            const dateParts = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/);
            
            if (dateParts) {
              const [_, d, m, y] = dateParts;
              ch[3] = new Date(Date.UTC(y.length === 2 ? +y + 2000 : +y, m - 1, d));
            } else if (!isNaN(str) && str !== "") {
              ch[3] = Number(str);
            }
          });
        },
        
        renderer(...args) {
          Handsontable.renderers.TextRenderer.apply(this, args);
          const formatted = fmtDE(args[5]);
          if (formatted !== null && formatted !== args[5]) args[1].textContent = formatted;
        },
        
        afterSelectionEnd(r, c) {
          const raw = hot.getSourceDataAtCell(r, c) ?? "";
          fb.textContent = fmtDE(raw) ?? raw;
        }
      });

      if (el.dataset.select) {
        const { r, c } = XLSX.utils.decode_cell(el.dataset.select);
        hot.selectCell(r, c);
      }
    } catch (err) {
      el.innerHTML = `<div class="ods-error">Fehler beim Laden: ${err.message}</div>`;
    }
  }
})()
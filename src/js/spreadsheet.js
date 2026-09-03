(async () => {
  const load = src => new Promise((resolve, reject) =>
    document.head.appendChild(Object.assign(document.createElement("script"), {
      src, onload: resolve, onerror: () => reject(new Error(`Fehler: ${src}`)),
    }))
  );

  // Nur beim ersten Aufruf laden – weitere Einbindungen auf derselben Seite
  // warten einfach auf dasselbe Promise, statt erneut nachzuladen.
  window.__odsLibsPromise ??= (async () => {
    await Promise.all([
      load("https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"),
      load("https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/dist/hyperformula.full.min.js"),
      load("https://cdn.jsdelivr.net/npm/handsontable@17.1.0/dist/handsontable.full.min.js"),
    ]);
    await load("https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/dist/languages/deDE.js");
    HyperFormula.registerLanguage("deDE", HyperFormula.languages.deDE);
  })();
  await window.__odsLibsPromise;

  const deFuncs = HyperFormula.languages.deDE.functions;
  
  // Bereinigt ODS-Klammern und übersetzt danach Funktionen ins Deutsche
  const formatFormula = f => {
    let s = f;
    // 1. ODS Bereichs-Referenzen (lokal): [.A1:.B2] -> A1:B2
    s = s.replace(/\[\.([A-Za-z0-9_$]+):\.([A-Za-z0-9_$]+)\]/g, "$1:$2");
    
    // 2. ODS Einzel-Referenzen (lokal): [.E$1] -> E$1 oder [.A2] -> A2
    s = s.replace(/\[\.([A-Za-z0-9_$]+)\]/g, "$1");
    
    // 3. ODS Blatt-Referenzen (extern): [Tabelle1.A1] -> Tabelle1!A1
    s = s.replace(/\[([^\]]+)\.([A-Za-z0-9_$]+)\]/g, "$1!$2");
    
    // 4. Englische Funktionen in deutsche übersetzen
    return s.replace(/[A-Za-z_][A-Za-z0-9_.]*(?=\()/g, name => deFuncs[name.toUpperCase()] ?? name);
  };

  for (const el of document.querySelectorAll(".ods-table[data-file]:not([data-initialized])")) {
    el.dataset.initialized = "true";

    const formulaBar = document.createElement("div");
    formulaBar.className = "ods-formula-bar";
    const tableDiv = document.createElement("div");
    el.replaceChildren(formulaBar, tableDiv);

    try {
      const res = await fetch(el.dataset.file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const wb = XLSX.read(await res.arrayBuffer(), { cellFormula: true });
      const sheetName = el.dataset.sheet || wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      if (!ws) throw new Error(`Blatt "${sheetName}" nicht gefunden.`);

      const { e } = ws["!ref"] ? XLSX.utils.decode_range(ws["!ref"]) : { e: { r: 0, c: 0 } };
      
      const data = Array.from({ length: e.r + 1 }, (_, r) =>
        Array.from({ length: e.c + 1 }, (_, c) => {
          const cell = ws[XLSX.utils.encode_cell({ r, c })];
          // Nutze die formatFormula-Funktion für die Formel-Strings
          return cell?.f ? `=${formatFormula(cell.f)}` : cell?.v ?? null;
        })
      );

      const hot = new Handsontable(tableDiv, {
        data,
        rowHeaders: true,
        colHeaders: true,
        stretchH: "all",
        height: "auto",
        manualColumnResize: true,
        manualRowResize: true,
        outsideClickDeselects: false, 
        licenseKey: "non-commercial-and-evaluation",
        
        // HIER NEU: Custom Renderer, der die Ansicht auf "WAHR" und "FALSCH" umschreibt
        renderer: function(instance, td, row, col, prop, value, cellProperties) {
          Handsontable.renderers.TextRenderer.apply(this, arguments);
          if (value === true || (typeof value === 'string' && value.toUpperCase() === 'TRUE')) {
            td.textContent = 'WAHR';
          } else if (value === false || (typeof value === 'string' && value.toUpperCase() === 'FALSE')) {
            td.textContent = 'FALSCH';
          }
        },

        formulas: {
          engine: HyperFormula.buildEmpty({ licenseKey: "internal-use-in-handsontable", language: "deDE" }),
          sheetName,
        },
        
        afterSelectionEnd(row, col) {
          let val = this.getSourceDataAtCell(row, col) ?? "";
          // Formelleiste übersetzt echte Bool-Werte ebenfalls, damit nicht dort "true" steht
          if (val === true) val = "WAHR";
          if (val === false) val = "FALSCH";
          formulaBar.textContent = val;
        },
      });

      if (el.dataset.select) {
        try {
          const { r, c } = XLSX.utils.decode_cell(el.dataset.select);
          hot.selectCell(r, c);
        } catch {
          console.warn("Ungültige Zelle für data-select:", el.dataset.select);
        }
      }
    } catch (error) {
      el.innerHTML = `<div class="ods-error">Die Tabelle konnte nicht geladen werden: ${error.message}</div>`;
    }
  }
})();
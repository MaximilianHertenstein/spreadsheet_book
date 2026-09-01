(async () => {
    const load = src => new Promise((resolve, reject) =>
        document.head.appendChild(Object.assign(document.createElement("script"), { src, onload: resolve, onerror: () => reject(new Error(`Fehler: ${src}`)) }))
    );

    // Bibliotheken parallel laden
    await Promise.all([
        load("https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"),
        load("https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/dist/hyperformula.full.min.js"),
        load("https://cdn.jsdelivr.net/npm/handsontable@17.1.0/dist/handsontable.full.min.js")
    ]);

    await load("https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/dist/languages/deDE.js");
    const HF = window.HyperFormula;
    HF.registerLanguage("deDE", HF.languages.deDE);

    const deFuncs = HF.languages.deDE.functions;
    const toGerman = f => f.replace(/[A-Za-z_][A-Za-z0-9_.]*(?=\()/g, name => deFuncs[name.toUpperCase()] ?? name);

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
            const sheet = el.dataset.sheet || wb.SheetNames[0];
            const ws = wb.Sheets[sheet];
            if (!ws) throw new Error(`Blatt "${sheet}" nicht gefunden.`);

            const { e } = ws["!ref"] ? XLSX.utils.decode_range(ws["!ref"]) : { e: { r: 0, c: 0 } };

            const data = Array.from({ length: e.r + 1 }, (_, r) =>
                Array.from({ length: e.c + 1 }, (_, c) => {
                    const cell = ws[XLSX.utils.encode_cell({ r, c })];
                    return cell?.f ? `=${toGerman(cell.f)}` : cell?.v ?? null;
                })
            );

            // Instanz in Variable speichern
            const hot = new Handsontable(tableDiv, {
                data,
                rowHeaders: true,
                colHeaders: true,
                stretchH: "all",
                height: "auto",
                manualColumnResize: true,
                manualRowResize: true,
                contextMenu: true,
                filters: true,
                dropdownMenu: true,
                licenseKey: "non-commercial-and-evaluation",
                formulas: {
                    engine: HF.buildEmpty({ licenseKey: "internal-use-in-handsontable", language: "deDE" }),
                    sheetName: sheet
                },
                afterSelectionEnd(row, col) {
                    formulaBar.textContent = this.getSourceDataAtCell(row, col) ?? "";
                }
            });

            // NEU: Optionale Zelle vorauswählen, falls data-select vorhanden ist
            if (el.dataset.select) {
                try {
                    const { r, c } = XLSX.utils.decode_cell(el.dataset.select);
                    hot.selectCell(r, c); // Wählt die Zelle aus (triggert automatisch die Formelleiste)
                } catch (err) {
                    console.warn("Ungültige Zelle für data-select:", el.dataset.select);
                }
            }

        } catch (error) {
            el.innerHTML = `<div class="ods-error">Die Tabelle konnte nicht geladen werden: ${error.message}</div>`;
        }
    }
})();
(async () => {

    const load = src => new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = res;
        s.onerror = () => rej(new Error(`Fehler: ${src}`));
        document.head.appendChild(s);
    });

    await load(
        "https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js"
    );

    await load(
        "https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/dist/hyperformula.full.min.js"
    );

    const HF = window.HyperFormula;

    await load(
        "https://cdn.jsdelivr.net/npm/hyperformula@3.1.0/dist/languages/deDE.js"
    );

    HF.registerLanguage("deDE", HF.languages.deDE);

    const engine = HF.buildEmpty({
        licenseKey: "internal-use-in-handsontable",
        language: "deDE"
    });

    await load(
        "https://cdn.jsdelivr.net/npm/handsontable@17.1.0/dist/handsontable.full.min.js"
    );

    for (const el of document.querySelectorAll(
        ".ods-table[data-file]:not([data-initialized])"
    )) {

        el.dataset.initialized = "true";

        try {
            const res = await fetch(el.dataset.file);

            if (!res.ok)
                throw new Error(`HTTP ${res.status}`);

            const wb = XLSX.read(
                await res.arrayBuffer(),
                { cellFormula: true }
            );

            const sheet =
                el.dataset.sheet || wb.SheetNames[0];

            const ws = wb.Sheets[sheet];

            if (!ws)
                throw new Error(`Blatt "${sheet}" nicht gefunden.`);

            const range = ws["!ref"]
                ? XLSX.utils.decode_range(ws["!ref"])
                : { e: { r: 0, c: 0 } };

            const data = Array.from(
                { length: range.e.r + 1 },
                (_, r) => Array.from(
                    { length: range.e.c + 1 },
                    (_, c) => {
                        const cell =
                            ws[XLSX.utils.encode_cell({ r, c })];

                        return cell?.f
                            ? `=${cell.f}`
                            : cell?.v ?? null;
                    }
                )
            );

            el.innerHTML = "";

            const formulaBar =
                document.createElement("div");

            formulaBar.className =
                "ods-formula-bar";

            const tableDiv =
                document.createElement("div");

            el.append(formulaBar, tableDiv);

            new Handsontable(tableDiv, {
                data,
                rowHeaders: true,
                colHeaders: true,

                formulas: {
                    engine,
                    sheetName: sheet
                },

                licenseKey:
                    "non-commercial-and-evaluation",

                stretchH: "all",
                width: "100%",
                height: "auto",

                manualColumnResize: true,
                manualRowResize: true,

                contextMenu: true,
                filters: true,
                dropdownMenu: true,

                afterSelectionEnd(row, column) {
                    formulaBar.textContent =
                        this.getSourceDataAtCell(row, column) ?? "";
                }
            });

        } catch (error) {
            el.innerHTML =
                `<div class="ods-error">
                    Die Tabelle konnte nicht geladen werden:
                    ${error.message}
                </div>`;
        }
    }

})();

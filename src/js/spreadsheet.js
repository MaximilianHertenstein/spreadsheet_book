(function () {
    "use strict";

    const HT_VERSION = "17.1.0";
    const HF_VERSION = "3.1.0";
    const XLSX_VERSION = "0.20.3";
    const LANGUAGE = "deDE";

    let libraries;
    let HyperFormulaClass;

    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.onload = resolve;
            script.onerror = () =>
                reject(new Error(`Fehler beim Laden: ${url}`));
            document.head.appendChild(script);
        });
    }

    async function loadLibraries() {
        if (libraries) return libraries;

        libraries = (async () => {
            await loadScript(
                `https://cdn.sheetjs.com/xlsx-${XLSX_VERSION}/package/dist/xlsx.full.min.js`
            );

            await loadScript(
                `https://cdn.jsdelivr.net/npm/hyperformula@${HF_VERSION}/dist/hyperformula.full.min.js`
            );

            HyperFormulaClass = window.HyperFormula;

            await loadScript(
                `https://cdn.jsdelivr.net/npm/hyperformula@${HF_VERSION}/dist/languages/${LANGUAGE}.js`
            );

            HyperFormulaClass.registerLanguage(
                LANGUAGE,
                HyperFormulaClass.languages[LANGUAGE]
            );

            await loadScript(
                `https://cdn.jsdelivr.net/npm/handsontable@${HT_VERSION}/dist/handsontable.full.min.js`
            );
        })();

        return libraries;
    }

    function worksheetToArray(ws) {
        if (!ws["!ref"]) return [];

        const range = XLSX.utils.decode_range(ws["!ref"]);
        const data = [];

        for (let r = 0; r <= range.e.r; r++) {
            const row = [];

            for (let c = 0; c <= range.e.c; c++) {
                const cell = ws[XLSX.utils.encode_cell({ r, c })];

                row.push(
                    cell?.f ? `=${cell.f}` : cell?.v ?? null
                );
            }

            data.push(row);
        }

        return data;
    }

    async function createTable(container) {
        container.dataset.initialized = "true";

        try {
            await loadLibraries();

            const response = await fetch(container.dataset.file);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const workbook = XLSX.read(
                await response.arrayBuffer(),
                { cellFormula: true }
            );

            const sheet =
                container.dataset.sheet || workbook.SheetNames[0];

            const data =
                worksheetToArray(workbook.Sheets[sheet]);

            const engine =
                HyperFormulaClass.buildEmpty({
                    licenseKey: "internal-use-in-handsontable",
                    language: LANGUAGE
                });

            container.innerHTML = "";

            const formulaBar = document.createElement("div");
            formulaBar.className = "ods-formula-bar";
            formulaBar.textContent = "";

            const table = document.createElement("div");
            container.append(formulaBar, table);

            container.handsontable = new Handsontable(table, {
                data,
                rowHeaders: true,
                colHeaders: true,
                formulas: {
                    engine,
                    sheetName: sheet
                },
                licenseKey: "non-commercial-and-evaluation",
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
            console.error(error);
            container.innerHTML =
                `<div class="ods-error">
                    Die Tabelle konnte nicht geladen werden: ${error.message}
                </div>`;
        }
    }

    function init() {
        document
            .querySelectorAll(".ods-table[data-file]:not([data-initialized])")
            .forEach(createTable);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

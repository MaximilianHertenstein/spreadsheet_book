(function () {
    "use strict";

    const HANDSONTABLE_VERSION = "17.1.0";
    const HYPERFORMULA_VERSION = "3.1.0";
    const SHEETJS_VERSION = "0.20.3";
    const FORMULA_LANGUAGE = "deDE";

    let librariesPromise = null;

    // Lädt ein Skript asynchron und verhindert doppeltes Laden
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${url}"]`)) {
                return resolve();
            }
            const script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Fehler beim Laden: ${url}`));
            document.head.appendChild(script);
        });
    }

    // Lädt alle Bibliotheken parallel (Sprachpaket erst nach HyperFormula)
async function loadLibraries() {
    if (!librariesPromise) {
        librariesPromise = (async () => {
            // 1. SheetJS laden
            await loadScript(`https://cdn.sheetjs.com/xlsx-${SHEETJS_VERSION}/package/dist/xlsx.full.min.js`);

            // 2. HyperFormula Basis laden
            await loadScript(`https://cdn.jsdelivr.net/npm/hyperformula@${HYPERFORMULA_VERSION}/dist/hyperformula.full.min.js`);

            // 3. Sprachpaket laden (setzt auf window.HyperFormula auf)
            await loadScript(`https://cdn.jsdelivr.net/npm/hyperformula@${HYPERFORMULA_VERSION}/dist/languages/${FORMULA_LANGUAGE}.js`);

            // 4. Handsontable laden
            await loadScript(`https://cdn.jsdelivr.net/npm/handsontable@${HANDSONTABLE_VERSION}/dist/handsontable.full.min.js`);

            // 5. Deutsche Sprache bei HyperFormula registrieren
            const langObj = HyperFormula.languages && HyperFormula.languages[FORMULA_LANGUAGE];
            if (langObj) {
                HyperFormula.registerLanguage(FORMULA_LANGUAGE, langObj);
            } else {
                console.warn(`Sprachpaket für ${FORMULA_LANGUAGE} konnte nicht gefunden werden.`);
            }
        })();
    }
    return librariesPromise;
}

function translateFormulaToGerman(formula) {
    const langObj = HyperFormula.languages && HyperFormula.languages[FORMULA_LANGUAGE];
    if (!langObj || !langObj.functions) {
        return formula;
    }

    return formula.replace(
        /[A-Za-z_][A-Za-z0-9_.]*(?=\()/g,
        (name) => langObj.functions[name.toUpperCase()] || name
    );
}

    function cellValue(cell) {
        if (!cell) return null;
        if (typeof cell.f === "string" && cell.f.trim() !== "") {
            return "=" + translateFormulaToGerman(cell.f);
        }
        return cell.v !== undefined ? cell.v : null;
    }

    function worksheetToArray(ws) {
        if (!ws["!ref"]) return [];
        const range = XLSX.utils.decode_range(ws["!ref"]);
        const data = [];
        
        for (let row = 0; row <= range.e.r; row++) {
            const currentRow = [];
            for (let col = 0; col <= range.e.c; col++) {
                const address = XLSX.utils.encode_cell({ r: row, c: col });
                currentRow.push(cellValue(ws[address]));
            }
            data.push(currentRow);
        }
        return data;
    }

    async function createTable(container) {
        container.dataset.initialized = "true";
        const file = container.dataset.file;
        const sheet = container.dataset.sheet;

        if (!file) {
            container.innerHTML = '<div class="ods-error">Fehler: data-file fehlt.</div>';
            return;
        }

        container.innerHTML = '<div class="ods-loading">Tabelle wird geladen …</div>';

        try {
            await loadLibraries();
            
            // fetch verarbeitet relative Pfade (z.B. "tabellen/noten.ods") automatisch korrekt
            const response = await fetch(file);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const arrayBuffer = await response.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { cellFormula: true, cellStyles: true, cellNF: true });
            const selectedSheet = sheet || workbook.SheetNames[0];

            if (!workbook.Sheets[selectedSheet]) {
                throw new Error(`Tabellenblatt "${selectedSheet}" nicht gefunden.`);
            }

            const data = worksheetToArray(workbook.Sheets[selectedSheet]);
            
            container.innerHTML = "";
            const formulaBar = document.createElement("div");
            formulaBar.className = "ods-formula-bar";
            formulaBar.textContent = "Zelle anklicken, um Wert bzw. Formel zu sehen.";
            
            const tableContainer = document.createElement("div");
            container.append(formulaBar, tableContainer);

            container.handsontable = new Handsontable(tableContainer, {
                data,
                rowHeaders: true,
                colHeaders: true,
                formulas: { engine: HyperFormula, sheetName: selectedSheet, language: FORMULA_LANGUAGE },
                licenseKey: "non-commercial-and-evaluation",
                stretchH: "all",
                width: "100%",
                height: "auto",
                autoWrapRow: true,
                autoWrapCol: true,
                manualColumnResize: true,
                manualRowResize: true,
                contextMenu: true,
                filters: true,
                dropdownMenu: true,
                afterSelectionEnd: function (row, column) {
                    if (row >= 0 && column >= 0) {
                        const address = `${XLSX.utils.encode_col(column)}${row + 1}`;
                        const raw = this.getSourceDataAtCell(row, column);
                        formulaBar.textContent = `${address}: ${raw ?? ""}`;
                    }
                }
            });
        } catch (error) {
            console.error(error);
            container.innerHTML = `<div class="ods-error">Die Tabelle konnte nicht geladen werden: ${error.message}</div>`;
        }
    }

    const initODS = () => {
        // Selektiert nur Tabellen, die noch nicht initialisiert wurden
        document.querySelectorAll(".ods-table[data-file]:not([data-initialized='true'])")
                .forEach(createTable);
    };

    // Da mdBook Skripte oft am Ende des <body> einbindet, triggern wir es sofort, wenn möglich
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initODS);
    } else {
        initODS();
    }

})();
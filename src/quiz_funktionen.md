# Quiz: Funktionen

Prüfe, ob du `SUMME` mit Einzelzellen und Bereichen, die weiteren Funktionen und `RUNDEN` beherrschst. Jedes Quiz enthält genau eine Frage.

## Quiz 1: Einzelzellen mit Semikolon

{{#quiz ../quizzes/funktionen_01.toml}}

## Quiz 2: Bereiche mit Doppelpunkt

{{#quiz ../quizzes/funktionen_02.toml}}

## Quiz 3: MIN und MAX

{{#quiz ../quizzes/funktionen_03.toml}}

## Quiz 4: MITTELWERT

{{#quiz ../quizzes/funktionen_04.toml}}

## Quiz 5: ANZAHL und ANZAHL2

{{#quiz ../quizzes/funktionen_05.toml}}

## Quiz 6: RUNDEN

{{#quiz ../quizzes/funktionen_06.toml}}

## Aufgabe 1: Summe und Durchschnitt

Berechne unter der Tabelle die Summe und den Durchschnitt der Einnahmen. Verwende Bereiche, keine einzelnen Zellen.

<div
	class="ods-table"
	data-select="B7"
	data-file="tabellen/uebung_funktionen.ods">
</div>

Gehe so vor:

1. Gib neben `Summe` die Formel `=SUMME(B2:B6)` ein.
2. Gib neben `Durchschnitt` die Formel `=MITTELWERT(B2:B6)` ein.
3. Ändere danach einen Tageswert (zum Beispiel `Mi` von `140` auf `200`) und beobachte beide Ergebnisse: Sie müssen sich automatisch ändern.
4. Zusatz: Runte den Durchschnitt mit `RUNDEN` auf eine Nachkommastelle.

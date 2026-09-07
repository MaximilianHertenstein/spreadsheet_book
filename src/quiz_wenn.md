# Quiz: WENN-Funktion

Prüfe, ob du die Argumente von `WENN`, Bedingungen als erstes Argument und verschachtelte `WENN`-Funktionen beherrschst. Jedes Quiz enthält genau eine Frage.

## Quiz 1: Die drei Argumente

{{#quiz ../quizzes/wenn_01.toml}}

## Quiz 2: Was wird zuerst berechnet?

{{#quiz ../quizzes/wenn_02.toml}}

## Quiz 3: WENN mit Alter

{{#quiz ../quizzes/wenn_03.toml}}

## Quiz 4: Mehrere Alternativen

{{#quiz ../quizzes/wenn_04.toml}}

## Quiz 5: gestaffelte Noten lesen

{{#quiz ../quizzes/wenn_05.toml}}

## Aufgabe 1: Notenbewertung mit gestaffeltem WENN

Bewerte die Punkte in Spalte C: über 75 `Sehr gut`, sonst über 50 `Bestanden`, sonst `Nicht bestanden`.

<div
	class="ods-table"
	data-select="C2"
	data-file="tabellen/uebung_wenn.ods">
</div>

Gehe so vor:

1. Gib in `C2` die Formel `=WENN(B2>75;"Sehr gut";WENN(B2>50;"Bestanden";"Nicht bestanden"))` ein und ziehe sie nach unten bis `C5`.
2. Ändere danach die Punkte von Clara von `45` auf `58` und beobachte `C4`: Aus `Nicht bestanden` muss automatisch `Bestanden` werden.
3. Ändere die Punkte von Ben von `64` auf `80` und prüfe, ob `Sehr gut` erscheint.

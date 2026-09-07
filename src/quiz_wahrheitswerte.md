# Quiz: Wahrheitswerte

Prüfe, ob du Vergleiche, `NICHT`, `UND` und `ODER` verstehst. Jedes Quiz enthält genau eine Frage.

## Quiz 1: Die zwei Werte

{{#quiz ../quizzes/wahrheitswerte_01.toml}}

## Quiz 2: Ungleich prüfen

{{#quiz ../quizzes/wahrheitswerte_02.toml}}

## Quiz 3: Vergleich als Formel

{{#quiz ../quizzes/wahrheitswerte_03.toml}}

## Quiz 4: Verknüpfung mit UND

{{#quiz ../quizzes/wahrheitswerte_04.toml}}

## Quiz 5: Verknüpfung mit ODER

{{#quiz ../quizzes/wahrheitswerte_05.toml}}

## Quiz 6: Verneinung mit NICHT

{{#quiz ../quizzes/wahrheitswerte_06.toml}}

## Quiz 7: Zahlen und Texte vergleichen

{{#quiz ../quizzes/wahrheitswerte_07.toml}}

## Aufgabe 1: Volljährig per Vergleich

Prüfe in der Spalte `Volljährig` mit einem Vergleich, ob die Person 18 oder älter ist.

<div
	class="ods-table"
	data-select="C2"
	data-file="tabellen/uebung_wahrheitswerte.ods">
</div>

Gehe so vor:

1. Gib in `C2` die Formel `=B2>=18` ein und ziehe sie nach unten bis `C5`.
2. Ändere danach das Alter von Clara von `15` auf `19` und beobachte `C4`: Aus `FALSCH` muss automatisch `WAHR` werden.
3. Zusatz: Kehre die Aussage mit `=NICHT(B2>=18)` um und erkläre, was die Spalte dann anzeigt.

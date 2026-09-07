# Quiz: Absolute Verweise

Prüfe, ob du das Problem mit dem mitwandernden Einzelpreis erkennst und mit `$` lösen kannst. Jedes Quiz enthält genau eine Frage.

## Quiz 1: Das Problem erkennen

{{#quiz ../quizzes/absolute_01.toml}}

## Quiz 2: Die Lösung mit `$`

{{#quiz ../quizzes/absolute_02.toml}}

## Quiz 3: Gezogene Formel lesen

{{#quiz ../quizzes/absolute_03.toml}}

## Quiz 4: Wann braucht man `$`?

{{#quiz ../quizzes/absolute_04.toml}}

## Aufgabe 1: Gesamtpreis mit festem Einzelpreis

Der Einzelpreis steht in `E1`. In `B2` steht bereits die richtige Formel `=A2*E$1`. Fülle die restlichen Gesamtpreise aus.

<div
	class="ods-table"
	data-select="B2"
	data-file="tabellen/uebung_absolute_verweise.ods">
</div>

Gehe so vor:

1. Ziehe die Formel aus `B2` nach unten bis `B5`.
2. Lies in der Formelzeile nach: In `B5` muss `=A5*E$1` stehen, nicht `=A5*E$5`.
3. Ändere danach den Einzelpreis in `E1` von `5` auf `7` und beobachte Spalte B: Alle Gesamtpreise müssen sich automatisch ändern.
4. Zum Ausprobieren: Entferne testweise das `$` in einer Zelle, ziehe erneut und erkläre, was schiefgeht.

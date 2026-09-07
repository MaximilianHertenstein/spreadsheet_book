# Quiz: S-Verweis

Prüfe, ob du den Aufbau von `SVERWEIS` verstehst: wo gesucht wird, was Spaltennummer und `0` bedeuten und was bei fehlenden Werten passiert. Jedes Quiz enthält genau eine Frage.

## Quiz 1: Wo wird gesucht?

{{#quiz ../quizzes/sverweis_01.toml}}

## Quiz 2: Die Spaltennummer

{{#quiz ../quizzes/sverweis_02.toml}}

## Quiz 3: Die genaue Suche mit 0

{{#quiz ../quizzes/sverweis_03.toml}}

## Quiz 4: Wert nicht gefunden

{{#quiz ../quizzes/sverweis_04.toml}}

## Quiz 5: Reihenfolge der Argumente

{{#quiz ../quizzes/sverweis_05.toml}}

## Aufgabe 1: Namen per Nummer suchen

Suche mit `SVERWEIS` den Namen zur Nummer im Feld `Gesucht`.

<div
	class="ods-table"
	data-select="B8"
	data-file="tabellen/uebung_sverweis.ods">
</div>

Gehe so vor:

1. Gib in `B8` (neben `Name:`) die Formel `=SVERWEIS(B7;A2:C5;2;0)` ein. Der gesuchte Wert steht in `B7`, die Tabelle geht von `A2` bis `C5`, der Name steht in Spalte `2`, gesucht wird genau (`0`).
2. Ändere danach `B7` von `103` auf `101` und beobachte `B8`: Der Name muss sich automatisch von `Clara` auf `Anna` ändern.
3. Gib in `B7` eine Nummer ein, die nicht vorkommt (zum Beispiel `999`), und beobachte, was passiert.

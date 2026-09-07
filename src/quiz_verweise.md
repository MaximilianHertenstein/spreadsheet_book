# Quiz: Verweise

Prüfe, ob du Zellen benennen, Verweise in Formeln verwenden und das automatische Aktualisieren erklären kannst. Jedes Quiz enthält genau eine Frage.

## Quiz 1: Zellen benennen

{{#quiz ../quizzes/verweise_01.toml}}

## Quiz 2: Verweis lesen

{{#quiz ../quizzes/verweise_02.toml}}

## Quiz 3: Automatisches Aktualisieren

{{#quiz ../quizzes/verweise_03.toml}}

## Quiz 4: Was ist eine Formel?

{{#quiz ../quizzes/verweise_04.toml}}

## Aufgabe 1: Summe mit Verweisen

Berechne in der Spalte `Summe` jeweils die Summe aus `Wert 1` und `Wert 2`. Verwende dabei Verweise, keine festen Zahlen.

<div
	class="ods-table"
	data-select="C2"
	data-file="tabellen/uebung_verweise.ods">
</div>

Gehe so vor:

1. Gib in `C2` die Formel `=A2+B2` ein und fülle sie nach unten aus.
2. Ändere danach `A2` von `10` auf `50` und beobachte `C2`: Der Wert muss sich automatisch ändern.
3. Erkläre in einem Satz, warum du `=A2+B2` und nicht `=10+4` schreiben solltest.

# Quiz: Relative Verweise

Prüfe, ob du verstehst, was beim Ziehen von Formeln nach unten und nach rechts passiert. Jedes Quiz enthält genau eine Frage.

## Quiz 1: Nach unten ziehen

{{#quiz ../quizzes/relative_01.toml}}

## Quiz 2: Zeilennummern allgemein

{{#quiz ../quizzes/relative_02.toml}}

## Quiz 3: Nach rechts ziehen

{{#quiz ../quizzes/relative_03.toml}}

## Quiz 4: Mehrere Schritte

{{#quiz ../quizzes/relative_04.toml}}

## Aufgabe 1: Formel nach unten ziehen

In `B1` steht bereits die Formel `=2*A1`. Ziehe sie nach unten bis `B4` und prüfe das Ergebnis.

<div
	class="ods-table"
	data-select="B1"
	data-file="tabellen/uebung_relative_verweise.ods">
</div>

Gehe so vor:

1. Ziehe den Inhalt von `B1` nach unten bis `B4` (kleines Quadrat an der Zell-Ecke anfassen und runterziehen).
2. Klicke `B2`, `B3` und `B4` an und lies in der Formelzeile, welche Formel dort steht.
3. Ändere danach `A3` und beobachte `B3`: Der Wert muss sich automatisch ändern, weil `B3` per Verweis mit `A3` verbunden ist.

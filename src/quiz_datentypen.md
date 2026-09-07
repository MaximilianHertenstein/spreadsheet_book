# Quiz: Datentypen

Prüfe, ob du Zahlen, Texte, Wahrheitswerte sowie Datum und Uhrzeit unterscheiden und richtig verwenden kannst. Jedes Quiz enthält genau eine Frage.

## Quiz 1: Rechnen mit Texten

{{#quiz ../quizzes/datentypen_01.toml}}

## Quiz 2: Aufbau eines Datums

{{#quiz ../quizzes/datentypen_02.toml}}

## Quiz 3: JAHR, MONAT und TAG

{{#quiz ../quizzes/datentypen_03.toml}}

## Quiz 4: Rechnen mit Datum und Uhrzeit

{{#quiz ../quizzes/datentypen_04.toml}}

## Quiz 5: Wahrheitswerte verwenden

{{#quiz ../quizzes/datentypen_05.toml}}

## Aufgabe 1: Geburtstage zerlegen

Hole mit `JAHR`, `MONAT` und `TAG` die Bestandteile aus den Geburtstagen heraus.

<div
	class="ods-table"
	data-select="C2"
	data-file="tabellen/uebung_datentypen.ods">
</div>

Gehe so vor:

1. Gib in `C2` die Formel `=JAHR(B2)` ein, in `D2` `=MONAT(B2)` und in `E2` `=TAG(B2)`. Ziehe alle drei nach unten bis Zeile `4`.
2. Ändere danach den Geburtstag von Anna und beobachte Jahr, Monat und Tag: Alle drei Werte müssen sich automatisch ändern.
3. Zusatz: Gib in eine leere Zelle `=B2<B3` ein und erkläre, was das Ergebnis über die beiden Geburtstage aussagt.

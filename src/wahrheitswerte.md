# Wahrheitswerte

In diesem Kapitel beschäftigen wir uns mit Wahrheitswerten.

Es gibt nur zwei Wahrheitswerte:

* `WAHR`
* `FALSCH`

## Vergleiche

Wir erhalten einen Wahrheitswert, wenn wir zwei Werte miteinander vergleichen.

Die wichtigsten Vergleichsoperatoren sind in der folgenden Tabelle aufgeführt.

| Operator | Bedeutung           | Beispiel |
| -------- | ------------------- | -------- |
| `=`      | gleich              | `5=5`    |
| `<`      | kleiner als         | `3<5`    |
| `>`      | größer als          | `5>3`    |
| `<=`     | kleiner oder gleich | `3<=3`   |
| `>=`     | größer oder gleich  | `5>=3`   |
| `<>`     | ungleich            | `5<>3`   |

Ein Vergleich kann auch direkt als Formel in einer Zelle stehen. Das erste Zeichen ist dann, wie bei jeder Formel, ein `=`.

<div
    class="ods-table" data-select="A1"
    data-file="tabellen/vergleiche.ods">
</div>

## Vergleiche von Zahlen und Texten

Zahlen können mit Zahlen und Texte können mit Texten verglichen werden.

Zum Beispiel kann geprüft werden, ob zwei Texte gleich sind.

<div
    class="ods-table" data-select="A1"
    data-file="tabellen/vergleich_werte.ods">
</div>

## Wahrheitswerte in Formeln

Wahrheitswerte können in Formeln verwendet werden. So kann zum Beispiel geprüft werden, ob eine Person volljährig ist.

<div
    class="ods-table" data-select="C2"
    data-file="tabellen/volljaehrigkeit.ods">
</div>

## Verneinungen

Die Funktion `NICHT` kehrt einen Wahrheitswert um. Aus `WAHR` wird `FALSCH` und aus `FALSCH` wird `WAHR`.

<div
    class="ods-table" data-select="B1"
    data-file="tabellen/nicht.ods">
</div>

## Verknüpfung mit UND

Mit der Funktion `UND` können zwei Bedingungen verknüpft werden.

Die Funktion liefert nur dann `WAHR`, wenn beide Bedingungen `WAHR` sind.

Die vier möglichen Fälle sind in der folgenden Tabelle dargestellt.

<div
    class="ods-table" data-select="C1"
    data-file="tabellen/und.ods">
</div>

## Verknüpfung mit ODER

Mit der Funktion `ODER` können ebenfalls zwei Bedingungen verknüpft werden.

Die Funktion liefert `WAHR`, wenn mindestens eine der beiden Bedingungen `WAHR` ist.

Auch hier gibt es vier mögliche Fälle.

<div
    class="ods-table" data-select="C1"
    data-file="tabellen/oder.ods">
</div>

## Vorrangregeln

Bei Rechnungen gilt die Punkt-vor-Strich-Regel. Bei logischen Verknüpfungen wird `UND` vor `ODER` ausgewertet.

Eine andere Auswertungsreihenfolge kann durch das Setzen von Klammern erreicht werden.

<div
    class="ods-table"
    data-file="tabellen/vorrang.ods">
</div>

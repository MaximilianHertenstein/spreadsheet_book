# Funktionen

## Funktion SUMME

Mit der Funktion `SUMME` kann die Summe von Werten aus mehreren Zellen berechnet werden. Die Namen einzelner Zellen werden in Klammern übergeben und durch Semikolons getrennt.

<div
    class="ods-table" data-select="D1"
    data-file="tabellen/summe_einzelzellen.ods">
</div>

Stehen die Werte in derselben Zeile, kann stattdessen ein Bereich angegeben werden. Dafür wird `ersteZelle:letzteZelle` geschrieben.

<div
    class="ods-table" data-select="D1"
    data-file="tabellen/summe_zeile.ods">
</div>

Das ist auch möglich, wenn die Werte in einer Spalte stehen.

<div
    class="ods-table" data-select="A4"
    data-file="tabellen/summe_spalte.ods">
</div>

Auch ein rechteckiger Bereich kann angegeben werden.
Dafür wird `zelleLinksOben:zelleRechtsUnten` geschrieben.
<div
    class="ods-table" data-select="D1"
    data-file="tabellen/summe_rechteck.ods">
</div>

## Weitere Funktionen

Die folgenden Funktionen sind besonders wichtig:

| Name | Berechneter Wert |
| --- | --- |
| `MIN` | kleinste Zahl |
| `MAX` | größte Zahl |
| `MITTELWERT` | Durschnitt aller Zahlen |
| `PRODUKT` | Produkt aller Zahlen |
| `ANZAHL` | Anzahl der Zahlen |
| `ANZAHL2` | Anzahl der nicht leeren Zellen |

## RUNDEN

Der Funktion `RUNDEN` werden eine zu rundende Zahl und die gewünschte Anzahl der Nachkommastellen übergeben.

<div
    class="ods-table" data-select="C1"
    data-file="tabellen/runden.ods">
</div>

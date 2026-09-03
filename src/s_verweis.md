# S-Verweis

## Grundlegendes

Mit der Funktion `SVERWEIS` kann in einer Tabelle nach einem Wert gesucht
werden. Anschließend wird ein Wert aus derselben Zeile zurückgegeben.

Der gesuchte Wert muss in der ersten Spalte des angegebenen Bereichs stehen.

## Aufbau der Funktion

Der Funktion `SVERWEIS` werden vier Argumente übergeben:

```text
=SVERWEIS(Suchkriterium;Tabelle;Spaltennummer;Bereichsverweis)
```

- Das `Suchkriterium` ist der Wert, nach dem gesucht wird.
- Die `Tabelle` ist der Bereich, in dem gesucht wird.
- Die `Spaltennummer` gibt an, aus welcher Spalte der Wert zurückgegeben wird.
- Mit dem `Bereichsverweis` wird festgelegt, ob genau oder ungefähr gesucht wird.

Für eine Suche nach einem bestimmten Wert wird als Bereichsverweis `0`
verwendet.

## Beispiel

In der folgenden Tabelle soll anhand der Schülernummer der Name ausgegeben
werden.

```text
=SVERWEIS(A7;$A$2:$C$5;2;0)
```

Die Funktion sucht den Wert aus `A7` in der ersten Spalte des Bereichs
`A2:C5`. Wird die Schülernummer gefunden, gibt sie den Wert aus der zweiten
Spalte dieses Bereichs zurück.

Soll stattdessen die Note ausgegeben werden, muss die Spaltennummer `3`
verwendet werden.

```text
=SVERWEIS(A7;$A$2:$C$5;3;0)
```

Die Dollarzeichen sorgen dafür, dass sich der Tabellenbereich beim Kopieren
der Formel nicht verändert.

<div
	class="ods-table"
	data-select="B7"
	data-file="tabellen/s_verweis.ods">
</div>

Wird die gesuchte Schülernummer nicht gefunden, gibt die Tabellenkalkulation
einen Fehler aus.

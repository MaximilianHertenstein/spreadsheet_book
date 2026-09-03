# S-Verweis

## Grundlegendes

Mit der Funktion `SVERWEIS` kann in einer Tabelle nach einem Wert gesucht

werden. Anschließend wird ein Wert aus derselben Zeile zurückgegeben.

## Beispiel

Zum Beispiel wird mit der Formel `=SVERWEIS(B8;A2:D6;2;0)`

der Wert aus der Zelle `B8` in der ersten Spalte der Tabelle von `A2` bis `D6` gesucht. Es wird der Wert zurückgegeben, der in derselben Zeile wie der gesuchte Wert und in Spalte `2` steht. Mit der `0` wird festgelegt, dass der Wert genau übereinstimmen muss.

<div
class="ods-table"
data-select="C8"
data-file="tabellen/s_verweis.ods">
</div>

Wird die gesuchte Schülernummer nicht gefunden, gibt die Tabellenkalkulation

einen Fehler aus.

## Aufbau der Funktion

Der Funktion `SVERWEIS` werden vier Argumente übergeben:

```text
=SVERWEIS(Suchkriterium;Tabelle;Spaltennummer;Bereichsverweis)
```

* Das `Suchkriterium` ist der Wert, nach dem gesucht wird.

* Die `Tabelle` ist der Bereich, in dem gesucht wird.

* Die `Spaltennummer` gibt an, aus welcher Spalte der Wert zurückgegeben wird.

* Mit dem `Bereichsverweis` wird festgelegt, ob genau oder ungefähr gesucht wird.

Für eine Suche nach einem bestimmten Wert wird als Bereichsverweis `0`

verwendet.







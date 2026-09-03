# Bedingte Berechnung

## Grundlegendes

Oft soll eine Tabellenkalkulation abhängig von einer Bedingung unterschiedliche Werte berechnen.

Dafür benötigt man die Funktion `WENN`.

Sie verwendet einen Wahrheitswert und gibt abhängig von diesem einen von zwei Werten zurück.

## WENN mit Wahrheitswerten

Im Kapitel über Wahrheitswerte haben wir geprüft, ob eine Person volljährig ist. In der Tabelle steht in der Spalte `Volljährig` bereits der Wahrheitswert `WAHR` oder `FALSCH`.

Jetzt kann mit `WENN` bestimmt werden, ob die Person alleine Auto fahren darf.

Der Funktion `WENN` werden drei Argumente übergeben:

```text
=WENN(Wahrheitswert; Wert wenn wahr; Wert wenn falsch)
```

Ist der Wahrheitswert `WAHR`, wird der zweite Wert zurückgegeben.

Ist der Wahrheitswert `FALSCH`, wird der dritte Wert zurückgegeben.

<div
    class="ods-table"
    data-select="D2"
    data-file="../tabellen/wenn_wahrheitswert.ods">
</div>

* Falls `C2` den Wert `WAHR` enthält, wird `Ja` in `D2` eingetragen.
* Falls `C2` den Wert `FALSCH` enthält, wird `Nein` in `D2` eingetragen.

## WENN mit einer Bedingung

Man kann auch eine Bedingung direkt als erstes Argument in die Funktion `WENN` schreiben.

Zum Beispiel kann dort der Vergleich `B2>=18` stehen.

```text
=WENN(B2>=18;"Ja";"Nein")
```

Die Tabellenkalkulation berechnet zuerst den Vergleich.

Anschließend verwendet `WENN` den dabei entstandenen Wahrheitswert.

<div
    class="ods-table"
    data-select="C2"
    data-file="../tabellen/wenn_bedingung.ods">
</div>

## Mehrere Alternativen

Oft will man zwischen mehr als zwei Möglichkeiten unterscheiden.

Dann kann man statt eines Wertes eine zweite `WENN`-Funktion verwenden.

Im folgenden Beispiel wird zuerst geprüft, ob mehr als 75 Punkte erreicht wurden. Falls das nicht zutrifft, wird geprüft, ob mehr als 50 Punkte erreicht wurden.

```text
=WENN(B2>75;"Sehr gut";WENN(B2>50;"Bestanden";"Nicht bestanden"))
```

<div
    class="ods-table"
    data-select="C2"
    data-file="../tabellen/wenn_mehrere_faelle.ods">
</div>

* Falls `B2>75` wahr ist, wird `Sehr gut` ausgegeben.
* Falls `B2>75` falsch ist, wird die zweite Funktion `WENN` geprüft.

  * Falls `B2>50` wahr ist, wird `Bestanden` ausgegeben.
  * Falls auch `B2>50` falsch ist, wird `Nicht bestanden` ausgegeben.

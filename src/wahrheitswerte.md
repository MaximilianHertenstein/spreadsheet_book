
# Booleans

In diesem Kapitel beschäftigen wir uns mit Wahrheitswerten (*Booleans*).
Diese sind im Gegensatz zu *Integern* und *Strings* zumindest in der
Hinsicht leichter zu verstehen, dass es nur zwei *Booleans* gibt:

- Wahr (`True`)

- Falsch (`False`)

## Vergleiche

Wir erhalten ein *Boolean*, wenn wir zwei *Werte* miteinander
vergleichen.

``` python, py-execute
2 < 3
```
``` python, py-execute
2 * 3 == 3 * 2
```
``` python, py-execute
'hello' == 'hello!'
```
``` python, py-execute
2 != 2
```

Die wichtigsten *Vergleichsoperatoren* sind in der folgenden Tabelle
aufgeführt.

![tabelle_vergleichsoperatoren](tabelle_vergleichsoperatoren/tabelle_vergleichsoperatoren.svg)

<span id="table:vgl_op" data-label="table:vgl_op"></span>

## Vergleiche von Werten mit unterschiedlichen Typen

Zwei *Werte* die verschiedene *Typen* haben, können nicht gleich sein.

``` python, py-execute
1 == '1'
```

## Variablen

Wie alle *Werte* können wir *Booleans* in *Variablen* speichern.

``` python, py-execute
seven_is_five_plus_three = 7 == 5 + 3
```
``` python, py-execute
seven_is_five_plus_three
```

## Funktionen

Wie alle Werte können *Booleans* auch *Argumente* oder *Rückgabewerte* von
Funktionen sein.

``` python, py-execute
def full_age(age: int) -> bool:
    return age > 17
```

``` python, py-execute
full_age(17)
```
``` python, py-execute
full_age(18)
```

## Boolesche Ausdrücke und Bedingungen

Ausdrücke, die zu einem *Boolean* ausgewertet werden, nennt man
*boolesche Ausdrücke* oder Bedingungen. Wie Rechenausdrücke können diese
mit *Operatoren* verknüpft werden.

## Verneinungen

Der Operator `not` macht `True` zu `False` und `False` zu `True`.

``` python, py-execute
not True
```
``` python, py-execute
not False
```
``` python, py-execute
not 1 == 2
```

## Verknüpfungen von Bedingungen

Mithilfe der *Operatoren* `and` und `or` können zwei *boolesche
Ausdrücke* miteinander verknüpft werden. Wenn zwei *boolesche Ausdrücke*
mit `and` verknüpft werden, dann wird der verknüpfte *boolesche
Ausdruck* genau dann zu `True` ausgewertet, wenn beide Teilausdrücke zu
`True` ausgewertet werden.

``` python, py-execute
True and 15 > 10
```
``` python, py-execute
1 < 2 and 2 > 0
```
``` python, py-execute
3 <= 3 and (2 < 0 and 4 >= 5)
```

Wenn zwei *boolesche Ausdrücke* mit `or` verknüpft werden, dann ist der
verknüpfte *boolesche Ausdruck* genau dann wahr, wenn mindestens einer
der beiden *Teilausdrücke* zu `True` ausgewertet wird.

``` python, py-execute
5 != 5 or (not 4 < 3)
```
``` python, py-execute
4 <= 3 or (1 < 2 and 2 > 0)
```

## Vorrangregeln

Bei Rechenausdrücken gilt die Punkt-vor-Strich-Regel.

``` python, py-execute
1 + 2 * 3
```

Der Ausdruck wird also folgendermaßen ausgewertet.

```python
1 + 2 * 3 = 1 + 6 = 7
```

Für *boolesche Ausdrücke* gibt es die `and`-vor-`or`-Regel.


``` python, py-execute
True or False and False
```

Der Ausdruck wird also folgendermaßen ausgewertet.

```python
True or False and False = True or False = True
```

Eine andere Auswertungsreihenfolge kann durch das Setzen von Klammern erreicht werden.

``` python, py-execute
(True or False) and False
```

## Aufgaben

[Zu den Aufgaben zu diesem Kapitel](./booleans_aufgaben.md)



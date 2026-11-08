## Probleme mit relativen Verweisen

Mit der folgenden Tabelle soll für jede Menge aus der ersten Spalte der Gesamtpreis berechnet werden.

Dafür wird die Menge mit dem Einzelpreis multipliziert. Die Formel dafür lautet `A2 * E1`.

<div
    class="ods-table"
    data-select="B2"
    data-file="tabellen/problem_relativer_verweis_1.ods">
</div>

Wenn man diese Formel nach unten zieht, wird, wie gewünscht, aus der Zelle `A2` die Zelle `A3`. Es wird aber auch `E1` zu `E2`.

Um zu verhindern, dass eine Zeilennummer in einer Formel verändert wird, kann man vor dieser ein Dollarzeichen (`$`) schreiben.

In diesem Beispiel müssen wir also `E1` durch `E$1` ersetzen.

<div
    class="ods-table"
    data-select="B2"
    data-file="tabellen/absoluter_verweis_1.ods">
</div>

## Spaltenbezeichnung festhalten

Man kann auch die Spaltenbezeichnung festhalten. Dazu schreibt man das
Dollarzeichen vor den Spaltenbuchstaben. In der folgenden Tabelle werden die
Mengen aus Spalte `A` jeweils mit verschiedenen Einzelpreisen multipliziert.

Die Formel in `B3` lautet `=$A3*B$2`. Wenn sie nach rechts gezogen wird,
bleibt der Verweis auf Spalte `A` erhalten. Der Verweis auf den Einzelpreis
passt sich dagegen an und wird zu `C$2`.

<div
    class="ods-table"
    data-select="B3"
    data-file="tabellen/absoluter_verweis_spalte.ods">
</div>

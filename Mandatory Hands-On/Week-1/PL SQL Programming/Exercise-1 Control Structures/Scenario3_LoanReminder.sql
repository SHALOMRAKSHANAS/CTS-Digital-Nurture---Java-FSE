SET SERVEROUTPUT ON;

DECLARE
CURSOR loan_cursor IS
SELECT CustomerID, LoanID, DueDate
FROM Loans
WHERE DueDate BETWEEN SYSDATE AND SYSDATE + 30;

BEGIN
FOR loan_rec IN loan_cursor LOOP
DBMS_OUTPUT.PUT_LINE(
'Reminder: Loan '
|| loan_rec.LoanID
|| ' for Customer '
|| loan_rec.CustomerID
|| ' is due on '
|| loan_rec.DueDate
);
END LOOP;
END;
/

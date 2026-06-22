DECLARE
CURSOR cust_cursor IS
SELECT CustomerID, Age
FROM Customers;

BEGIN
FOR cust_rec IN cust_cursor LOOP
IF cust_rec.Age > 60 THEN
UPDATE Loans
SET InterestRate = InterestRate - 1
WHERE CustomerID = cust_rec.CustomerID;
END IF;
END LOOP;

```
COMMIT;
```

END;
/

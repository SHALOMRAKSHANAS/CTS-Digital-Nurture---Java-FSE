DECLARE
CURSOR cust_cursor IS
SELECT CustomerID, Balance
FROM Customers;

BEGIN
FOR cust_rec IN cust_cursor LOOP
IF cust_rec.Balance > 10000 THEN
UPDATE Customers
SET IsVIP = 'TRUE'
WHERE CustomerID = cust_rec.CustomerID;
END IF;
END LOOP;

```
COMMIT;
```

END;
/

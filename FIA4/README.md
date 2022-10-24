# Psuedocode
## Dataclasses
```js
CLASS YEARDATA
    SET total
    SET monthly_data
    # Sex
    SET male
    SET female
    SET unknown
    # Age
    SET adult
    SET juvenile

CLASS MONTHDATA
    SET total
    # Sex
    SET male
    SET female
    SET unknown
    # Age
    SET adult
    SET juvenile

CLASS CRIMEDATA
    SET index

    SET yearly_data
    SET total
    # Sex
    SET male
    SET female
    SET unknown
    # Age
    SET adult
    SET juvenile

```


## CSV Handler
```js
CLASS CSVHANDLER (FILE)
    CONSTRUCTOR
        SET file
        file = FILE
    
    OPEN
        SET rows

        OPEN FILE

        headers = FILE ROW 1

        FOR row IN FILE
            rows APPEND row
        
        RETURN {HEADERS: headers, ROWS: rows}
    
    PROCESS
        SET crimes, data, valid, index

        data = SELF.OPEN()
        valid = data[HEADERS][3:]

        index = 3
        FOR crime in VALID
            SET monthly, month, month_index, total, year, cache, groups, yearly

            monthly = {}
            month = 0
            month_index = 0
            total = 0
            year = 2001

            cache = DATA DICT
            groups = DATA DICT

            yearly = {}

            FOR row in data[ROWS]
                IF month_index == 6:
                    month_index = 0
                    month = month + 1

                    monthly[CURRENT MONTH] = cache

                    cache = DATA DICT
                
                IF month == 12:
                    month = 0
                    yearly[CURRENT YEAR] = monthly
                    monthly = {}
                    year = year + 1
                
                SET num

                num = row[index]
                total = total + num
                cache.TOTAL = cache.TOTAL + num

                groups[SEX] = groups[SEX] + num
                groups[AGE] = groups[AGE] + num

                month_index = month_index + 1
                
                crimes[CRIME] = DATA

                index = index + 1
            
            RETURN crimes




```
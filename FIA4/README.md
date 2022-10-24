# Pseudocode
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
        
        RETURN {'headers': headers, 'rows': rows}
    
    PROCESS
        SET crimes
        SET data
        SET valid
        SET index
        
        data = SELF.OPEN()
        valid = data['headers'][3:]

        index = 0
```
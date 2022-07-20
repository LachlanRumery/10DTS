# Pseudocode

**When writing pseudocode:**
- Write only one statement per line
- Capitalise keywords: INPUT, OUTPUT, IF, ELSE, ELSEIF, WHILE, ENDWHILE, DECLARE, CALL
- Indents to show hierachy, scope and structures
- Keep statements language-independent

**Variables:**
-   Begin with lower case
-   Contain no spaces
-   Additional words begin with capitals (camel case)
-   Unique names within code
-   Consistent and meaningful use of names

**Special Cases:**
- DIV => integer
- / => float
- MOD => returns remainders


**Example:**
```js
MULTPLY-TWO-NUMBERS
    SET number1
    SET number2
    SET product
    number1 = INPUT number from user
    number2 = INPUT number from user
    product = number1 * number2
    OUTPUT product
END
```
# Questions
### Write a program that takes a number and print its square.
```js
SQUARE-NUMBER
    SET number
    SET square

    number = INPUT number from user
    square = number*number

    OUTPUT square
END
```

<br>

### Write a program that reads the length of the base and the height of a right-angled triangle and prints the area.
```js
AREA-RIGHT-ANGLED-TRIANGLE
    SET base
    SET height
    SET area

    base = INPUT number from user
    height = INPUT number from user
    area = 0.5*base*height

    OUTPUT area
END
```
<br>

### A car can cover a distance of N kilometers per day. How many days will it take to cover a route of length M kilometers? The program gets two numbers: N and M.
```js
DAYS-TO-COVER
    SET nKM
    SET mKMperDAY
    SET days
    
    nKM = INPUT number from user
    mKMperDAY = INPUT number from user
    days = nKM/mKMperDAY

    OUTPUT days
END
```

<br>

### N students take K apples and distribute them among each other evenly. The remaining (the undivisible) part remains in the basket. How many apples will each single student get? How many apples will remain in the basket?
```js
STUDENT-APPLE-BASKET
    SET students
    SET apples

    SET remainders
    SET apples_per_basket

    students = INPUT number from user
    apples = INPUT number from user

    remainders = apples MOD students
    apples_per_basket = apples DIV students

    OUTPUT remainders
    OUTPUT apples_per_basket
END
```
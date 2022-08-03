# Flowcharts
**Task 1**

```py
def SUM(array)
    sum = 0
    for x in array:
        sum+=x
    print(sum)
```

<br>

**Task 2**
```py
def AREA_CIRCUMFERENCE(radius)
    area = math.pi * radius ** 2
    circumference = 2 * math.pi * radius
    print(area)
    print(circumference)

AREA_CIRCUMFERENCE(float(input('Enter number: ')))
```

<br>

**Task 3**
```py
age = int(input())
daysOld = age * 365
print(daysOld)
```

# n-th Term Fibonacci number
An approximation of an n-th therm fibonacci number is given by:
$$ F_n = \frac{φ^n-ψ^n}{\sqrt{5}} $$
$$ \text{Where:}$$
$$ φ = \frac{1+\sqrt{5}}{2}$$
$$ ψ = 1-φ$$


```py
def N_TERM_FIBONACCI(n):
    phi = (1+(5**0.5))/2
    psi = 1 - phi

    Fn = (phi**n - psi**n)/(5**0.5)
    print(Fn)
```
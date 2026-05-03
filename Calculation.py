# 1. Swap two variables (a = 2, b = 4)
a = 2
b = 4

# Swap
a, b = b, a

print("a =", a)
print("b =", b)


# 2. Check if a number is even or odd
num = int(input("Enter a number: "))

if num % 2 == 0:
    print("Even")
else:
    print("Odd")



# 3. Calculate factorial of a number
num = int(input("Enter a number: "))
fact = 1

for i in range(1, num + 1):
    fact *= i

print("Factorial =", fact)

# 4. Fibonacci sequence
n = int(input("Enter number of terms: "))

a, b = 0, 1

for i in range(n):
    print(a, end=" ")
    a, b = b, a + b
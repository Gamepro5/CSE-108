def main():
    nums = input("Enter some numbers (seperated by spaces): ")
    numlist = nums.split()
    if len(numlist) == 1:
        print("Error: list needs to be >1")
        return
    for i in range(len(numlist)):
        try:
            numlist[i] = int(numlist[i])
        except ValueError:
            print("Error: Cannot add a string.")
            return        
    sum = 0
    for i in numlist:
        sum += i
    print(sum)
main()
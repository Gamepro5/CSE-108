def main():
    scentence = input("Enter a scentence: ")
    times = input("Enter how many times you want it to be repeated: ")
    f = open("CompletedPunishment.txt", "x")
    result = ""
    for i in range(int(times)):
        result += scentence + "\n"
    f.write(result)
    f.close()
main()
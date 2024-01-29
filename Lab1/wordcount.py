def main():
    word = input("Enter a word: ")
    f = open("PythonSummary.txt", "r")
    text = f.read()
    list = text.split()
    count = 0
    for i in list:
        i = i.upper()
        if i == word.upper():
            count = count+1
    print("The word " + word + " occurs " + str(count) + " times.")
main()
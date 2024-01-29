import json

grades = {}

def saveGrades():
    f = open('grades.txt', "w")
    f.write(json.dumps(grades))
    f.close()

def loadGrades():
    global grades
    f = open('grades.txt', "r")
    grades = json.load(f)
    f.close()

def main():
    loadGrades()
    while True:
        print("Grades:")
        print(grades)
        inpt = input("Available commands:\n 'c' to create an entry\n 'a' to get find the grade of a student\n 'e' to edit a grade\n 'd' to delete a grade.\n 'x' to close the program.\n")
        if inpt == 'c':
            inpt = input("Enter name of student (case sensitive): ")
            if inpt in grades.keys():
                print("Student already exists.")
            else:
                grd = input("Enter the grade of that sudent: ")
                grades[inpt] = float(grd)
        elif inpt == 'a':
            inpt = input("Enter name of student (case sensitive): ")
            if inpt in grades.keys():
                print(str(grades[inpt]))
            else:
                print("Cannot find that student.")
        elif inpt == 'e':
            inpt = input("Enter name of student (case sensitive): ")
            if inpt in grades.keys():
                grd = input("Enter the new grade for that student: ")
                grades[inpt] = float(grd)
                print("Updated!")
            else:
                print("Cannot find that student.")
        elif inpt == 'd':
            inpt = input("Enter name of student (case sensitive): ")
            if inpt in grades.keys():
                grades[inpt] = None
                print(inpt + "'s grade has been set to 'none' (deleted).")
            else:
                print("Cannot find that student.")
        elif inpt == 'x':
            print("Exiting...")
            break
        saveGrades()

main()
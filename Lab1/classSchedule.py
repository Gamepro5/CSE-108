def main():
    f = open("classesInput.txt", "r")
    text = f.read()
    list = text.splitlines()
    f2 = open("output.txt", "x")
    result = ""
    for i in range(int(list[0])):
        result += """COURSE """+ str(i+1) +""": """+ list[(i*8)+1] +""""""+ list[(i*8)+2] +""": """+ list[(i*8)+3] +"""
Number of Credits: """+ list[(i*8)+4] +"""
Days of Lectures: """+ list[(i*8)+5] +"""
Lecture Time: """+ list[(i*8)+6] +""" - """+ list[(i*8)+7] +"""
Stat: on average, students get """+ list[(i*8)+8] +"""% in this course\n\n"""
    f2.write(result)
main()
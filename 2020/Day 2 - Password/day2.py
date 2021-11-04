passwordFile=open("input.txt")
passwords=[]
for f in passwordFile:
    passwords.append(f.rstrip())
passwordFile.close()

def isValidPassword(s):
    line=s.split(" ")
    letter=line[1][0]
    letterCount=0
    password=line[2]
    places=line[0].split('-')
    try:
        if password[int(places[0])-1]==letter:
            letterCount+=1
    except:
        pass
    try:
        if password[int(places[1])-1]==letter:
            letterCount+=1
    except:
        pass
    if letterCount==1:
        return True
    return False

count=0
for a in passwords:
    if isValidPassword(a):
        count+=1

print(str(count)+" valid passwords")


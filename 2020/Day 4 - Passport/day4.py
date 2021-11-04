passportFile=open("input.txt")
passports=[{}] #array of dictionaries
currentIndex=0
for f in passportFile:
    if f!='\n':
        tempLineArray=f.rstrip().split(" ")
        for k in tempLineArray:
            tempFieldArray=k.split(":")
            passports[currentIndex][tempFieldArray[0]]=tempFieldArray[1]

    if f=='\n':
        passports.append({})
        currentIndex+=1
passportFile.close()





def passportFieldValidationCheck(k, v):
    if k=="cid":
        return True
    if k=="byr":
        if len(v)!=4:
            return False
        if int(v)>=1920 and int(v)<=2002:
            return True
    if k=="iyr":
        if len(v)!=4:
            return False
        if int(v)>=2010 and int(v)<=2020:
            return True
    if k=="eyr":
        if len(v)!=4:
            return False
        if int(v)>=2020 and int(v)<=2030:
            return True
    if k=="hgt":
        end=v[len(v)-2:]
        try:
            number=int(v[:len(v)-2])
        except:
            return False
        if end=="cm":
            if number>=150 and number <=193:
                return True
        if end=="in":
            if number>=59 and number <=76:
                return True
    if k=="hcl":
        if v[0]!="#":
            return False
        if len(v)!=7:
            return False
        allowLetters=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
        for l in v[1:]:
            if l not in allowLetters:
                return False
        return True
    if key=="ecl":
        allowedColors=["amb","blu","brn","gry","grn","hzl","oth"]
        if v in allowedColors:
            return True
    if k=="pid":
        if len(v)!=9:
            return False
        try:
            return True
        except:
            pass
    return False

validFields=["byr", "iyr","eyr","hgt","hcl","ecl","pid"]
validPassportCount=0
for passport in passports:
    validPassport=True
    for field in validFields:
        if field not in passport.keys():
            validPassport=False
            break
    for key in passport:
        if not passportFieldValidationCheck(key,passport[key]):
            validPassport=False
            break

    if validPassport:
        validPassportCount+=1


print("Number of valid passports is: "+str(validPassportCount))

expenseReportFile=open("input.txt")
expenseReport=[]
for f in expenseReportFile:
    expenseReport.append(int(f))
expenseReportFile.close()

for a in range(len(expenseReport)):
    for b in range(a,len(expenseReport)):
        for c in range(b,len(expenseReport)):
            if expenseReport[a]+expenseReport[b]+expenseReport[c] == 2020:
                print("1st "+str(expenseReport[a])+" 2nd "+str(expenseReport[b])+" 3rd "+str(expenseReport[c])+" Product "+str(expenseReport[a]*expenseReport[b]*expenseReport[c]))
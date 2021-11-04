ticketsFile = open("input.txt")
index = 0
fields = []  # 2d array- outer for each field - inner is min/max or min/max
myTicket = []  # 1d array of field values
nearbyTickets = []  # 2d array fo field values

for line in ticketsFile:
    if line == '\n':
        index += 1
        continue
    if index == 0:
        fieldArray = []
        tempArray = line.rstrip().split(": ")
        tempArray = tempArray[1:][0].split(" ")
        temp1 = tempArray[0].split("-") + tempArray[2].split("-")
        for a in temp1:
            fieldArray.append(int(a))
        fields.append(fieldArray)
    if index == 1 and line.rstrip() != "your ticket:":
        tempArray = line.rstrip().split(",")
        for a in tempArray:
            myTicket.append(int(a))
        continue
    if index == 2 and line.rstrip() != "nearby tickets:":
        tempArray = line.rstrip().split(",")
        ticket = []
        for a in tempArray:
            ticket.append(int(a))
        nearbyTickets.append(ticket)
        continue
ticketsFile.close()

def validateTicket(fieldArray, ticket): #returns sum of invalid fields
    result = True
    sumOfInvalidFields = 0
    for ticketField in ticket:
        validField = False
        for fieldIndex in range(len(fieldArray)):
            if fieldArray[fieldIndex][0] <= ticketField <= fieldArray[fieldIndex][1] or fieldArray[fieldIndex][2] <= ticketField <= fieldArray[fieldIndex][3]:
                    validField = True
        if validField:
            continue
        else:
            sumOfInvalidFields += ticketField
            result = False
    return result, sumOfInvalidFields

def validField(field_min_max_array, ticketValue):
    if field_min_max_array[0] <= ticketValue <= field_min_max_array[1] or field_min_max_array[2] <= ticketValue <= field_min_max_array[3]:
        return True
    return False

sumOfInvalidTicketFields = 0
validTickets = []

for t in nearbyTickets:
    validateTicketResults = validateTicket(fields, t)
    if validateTicketResults[0]:
        validTickets.append(t)
        continue
    else:
        sumOfInvalidTicketFields += validateTicketResults[1]

print("First result is", sumOfInvalidTicketFields)

possibleFieldMappings = [] #2d array - index is ticket field index, values are field index numbers
for i in range(len(fields)):
    possibleFieldMappings.append([])
    for j in range(len(fields)):
        possibleFieldMappings[i].append(j)  #start by assuming all fields work and eliminate
for t in validTickets:
    for ticketIndex in range(len(t)):
        for fieldIndex in possibleFieldMappings[ticketIndex]:
            if validField(fields[fieldIndex],t[ticketIndex]):
                continue
            else:
                possibleFieldMappings[ticketIndex].remove(fieldIndex)
                break

matchedFields = {}  #ticket index is key, field index is value
while len(matchedFields) < len(fields):
    for i in range(len(possibleFieldMappings)):
        if len(possibleFieldMappings[i]) == 1:
            matchedFields[i] = possibleFieldMappings[i][0]
            matchedField = possibleFieldMappings[i][0]
            break
    for line in possibleFieldMappings:
        if matchedField in line:
            line.remove(matchedField)

print(matchedFields)

result = 1
for k in matchedFields:
    if matchedFields.get(k) <= 5:
        result *= myTicket[k]

print("Second result is",result)


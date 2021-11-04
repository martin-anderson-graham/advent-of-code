frequencyFile = open("input.txt")
frequencies = []
for line in frequencyFile:
    frequencies.append(line.rstrip())
frequencyFile.close()

count = 0
seenFrequencies = []
index = 0

while True:
    count += int(frequencies[index % len(frequencies)])
    if count in seenFrequencies:
        break
    seenFrequencies.append(count)
    index += 1

print("Total ", count)
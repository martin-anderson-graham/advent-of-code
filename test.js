/** Write a function which accomplishes what the string requests
 *   Your function should use the mechanism specifed (for, while, forEach, etc)
 *   Use the function name specified
 *   Log the result to the console
 */
 const obj = { text: "Remove occurances of the letter e after the word 'letter' in this sentence" };
 Object.freeze(obj);
 ​
 /**
  * BONUS: 
  * A single function should satisfy the strings defined 'obj' and the bonus objects below
  * The function should only take a single argument of type object
  * The function should be able to accomidate any word between the single quotes
  */
 const bonusObj1 = { text: "Remove occurances of the letter e after 'the' in this sentence" };
 const bonusObj2 = { text: "The letter e should not appear after the word 'not' in this sentence" };
 Object.freeze(bonusObj1);
 Object.freeze(bonusObj2);
 ​
 ​
 ​
 ​
 ​
 ​
 /** for loop - function name: forSolution */ 
 ​let forSolution = (obje) => {
   let signalWord = obje.text.slice(obje.text.indexOf("'") + 1, obje.text.lastIndexOf("'"));
   let result = obje.text.slice(0, obje.text.indexOf(signalWord)) + signalWord;
   for (let idx = obje.text.indexOf(signalWord) + signalWord.length; idx < obje.text.length; idx++ ) {
    if (obje.text[idx] !== 'e') {
      result += obje.text[idx];
    }
   }
   return result;
 };

 //console.log(forSolution(obj));
 ​
 ​
 ​
 ​
 // while loop - function name: whileSolution 
 ​
 ​
 ​
 ​
 ​
 // do while loop - function name: doWhileSolution 
 ​
 ​
 ​
 ​
 ​
 // forEach iteration method  - function name: forEachSolution 
 ​
 ​
 ​
 ​
 ​
 // filter iteration method  - function name: 'filterSolution' 
 ​
 ​
 ​
 ​
 ​
 // map iteration method
 ​
 ​
 ​
 ​
 ​
 // reduce iteration method
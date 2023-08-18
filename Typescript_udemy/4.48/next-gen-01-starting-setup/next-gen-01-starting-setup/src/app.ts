const userName = 'Max';
let age = 30;   // let feature
age = 29;

// arrow function
// const add = (a: number, b: number) => {
//     return a + b;
// };

// console.log(add(2,5));


const printOutput = (output: string | number) => {
    console.log(output);
}
// or
// const printOutput: (a: number | string) => void = output => console.log(output);

// printOutput(add(5,2));

const button = document.querySelector('button');
if (button) {
    button.addEventListener('click', event => console.log(event));
}

// defauit function parameters
// const add = (a: number, b: number = 1) => {
//     return a + b;
// };
// console.log(add(2));

// spread, for pulling elements into array, 1
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);

// spread operator 2
const person = {
    name: 'Max',
    age: 30
};
const copiedPerson = { ...person};

// rest parameters
const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);

};

const addedNumbers = add(5,10,2,3,7);
console.log(addedNumbers);

// destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
// object destructuring const { firstName, age } = person;  
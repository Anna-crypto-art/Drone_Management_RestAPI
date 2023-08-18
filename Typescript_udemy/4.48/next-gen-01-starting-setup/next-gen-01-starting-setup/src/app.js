var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var userName = 'Max';
var age = 30; // let feature
age = 29;
// arrow function
// const add = (a: number, b: number) => {
//     return a + b;
// };
// console.log(add(2,5));
var printOutput = function (output) {
    console.log(output);
};
// or
// const printOutput: (a: number | string) => void = output => console.log(output);
// printOutput(add(5,2));
var button = document.querySelector('button');
if (button) {
    button.addEventListener('click', function (event) { return console.log(event); });
}
// defauit function parameters
// const add = (a: number, b: number = 1) => {
//     return a + b;
// };
// console.log(add(2));
// spread, for pulling elements into array, 1
var hobbies = ['Sports', 'Cooking'];
var activeHobbies = ['Hiking'];
activeHobbies.push.apply(activeHobbies, hobbies);
// spread operator 2
var person = {
    name: 'Max',
    age: 30
};
var copiedPerson = __assign({}, person);
// rest parameters
var add = function () {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (curResult, curValue) {
        return curResult + curValue;
    }, 0);
};
var addedNumbers = add(5, 10, 2, 3, 7);
console.log(addedNumbers);

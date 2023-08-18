// union type
// function combine(input1: number | string, input2: number | string) {
//     let result;
//     if (typeof input1 === 'number' && typeof input2 === 'number') {
//         result = input1 + input2;
//     } else {
//         result = input1.toString() + input2.toString();
//     }
//     return result;
// }

// const combinedAges = combine(30, 26);
// console.log(combinedAges)

// const combinedNames = combine('Max', 'Anna');
// console.log(combinedNames)

// literal type
// function combine(input1: number | string, input2: number | string, resultConversion: 'as-number' | 'as-text') {
//     let result;
//     if (typeof input1 === 'number' && typeof input2 === 'number') {
//         result = input1 + input2;
//     } else {
//         result = input1.toString() + input2.toString();
//     }
//     if (resultConversion === 'as-number') {
//         return +result;
//     } else {
//         return result.toString();
//     }
//     return result;
// }

// const combinedAges = combine(30, 26,'as-number');
// console.log(combinedAges)

// const combinedStringAges = combine('30', '26', 'as-number');
// console.log(combinedStringAges)

// type aliases
type Combinable = number | string;

function combine(input1: Combinable, input2: Combinable, resultConversion: 'as-number' | 'as-text') {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    if (resultConversion === 'as-number') {
        return +result;
    } else {
        return result.toString();
    }
    return result;
}




// aliases 2
type User = { name: string; age: number };
 
function greet(user: User) {
  console.log('Hi, I am ' + user.name);
}
 
function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}
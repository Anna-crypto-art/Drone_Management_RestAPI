// first interface to define an object class
//interface Person {
//     name: string;
//     age: number;

//     greet(phrase: string): void;
// }

// let user1: Person;  // we can use our interface as a type
// user1 = {
//     name: 'Max',
//     age: 30,
//     greet(phrase: string) {
//         console.log(phrase + ' ' + this.name);
//     } 
// };

// user1.greet('Hi there - I am');

// using interface with classes!
interface Named {
    readonly name: string;
    outputName?: string;
}

interface Greetable extends Named {          // inheritance of interfaces
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    age = 30;

    constructor(n: string) {
        this.name = n;
    }

    greet(phrase: string) {
                 console.log(phrase + ' ' + this.name);
            }
}

let user1: Greetable;
user1 = new Person('Max');
user1.greet('Hi there = I am');
console.log(user1);
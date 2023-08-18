// generic types
const names: Array<string> = ['Max', 'Manuel']; // string[]
names[0].split(' ');

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done');
    }, 2000);
});

promise.then(data => {
    data.split(' ');
})

// own generic types, does not work!!!!!   with constrains
// function merge<T extends object, U extends object>(objA: T, objB: U) {
//     return Object.assign(objA, objB);
// }
// console.log(merge({name: 'Max'}, {age: 30}));


// another generic function

interface Lengthy {
    length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = 'Got 1 element';
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + 'elements.';
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));

// generic classes

class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');

const objStorage = new DataStorage<object>();

// generic utility types
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

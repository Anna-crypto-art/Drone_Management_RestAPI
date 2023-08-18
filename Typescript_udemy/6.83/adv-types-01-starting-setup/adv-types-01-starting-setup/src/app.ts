// intersection types

type Admin = {
    name: string;
    privilages: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privilages: ['create-server'],
    startDate: new Date()
};

// type guards
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

// next

type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if ('privilages' in emp) {
        console.log('Privilages: ' + emp.privilages);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}

printEmployeeInformation(e1);


// type guard with classes

class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a track...');
    }

    loadCargo(amount: number) {
        console.log('loading cargo ...' + amount);
    }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
  
}
useVehicle(v1);
useVehicle(v2);

// discriminated unions, for interfaces
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving with speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

// type casting
const paragraph = document.querySelector('p');

const paragraph_1 = document.getElementById('message-output');

const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;  // for html file
userInputElement.value = 'Hi there!';      

// index properties, we do not need to know in advance which properties we wanna use
interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character'

};

// function overloads
function add_1(a: number, b: number): number
function add_1(a: string, b: string): string
function add_1(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add_1('Max', 'Schwarz');
result.split(' ');  // now we can use split, because typescript knows that in the end we get a string

// optional chaining
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'My own company' }
};

console.log(fetchedUserData?.job?.title);
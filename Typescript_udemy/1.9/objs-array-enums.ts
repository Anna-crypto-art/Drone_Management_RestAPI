// const person = {
//     name: 'Maximilian',
//     age: 30,
//     hobbies: ['Sports', 'Cooking']
// };
// console.log(person.name);

// 2
// const product = {
//     id: 'abc1',
//     price: 12.99,
//     tags: ['great-offer', 'hot-and-new'],
//     details: {
//       title: 'Red Carpet',
//       description: 'A great carpet - almost brand-new!'
//     }
//   }

//   for (const hobby of person.hobbies) {
//     console.log(hobby.toUpperCase());
//   }

  //3
//   const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];   // tuple
//   } = {
//     name: 'Maximilian',
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, 'author']
// };
// console.log(person.name);


//4 enum
enum Role { ADMIN, READ_ONLY, AUTHOR };

  const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};

if (person.role == Role.AUTHOR) {
    console.log('is admin')
}
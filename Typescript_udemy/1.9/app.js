// void, it does not return a value
// function add(n1: number, n2: number) {
//     return n1 + n2;
// }
// function printResult(num: number): void {
//     console.log('Result: ' + num);
// }
// printResult(add(5,12));
// let combineValues: Function; //!!!!!!!!!!!!!!!!!!  one way
// combineValues = add;
// another way
// let combineValues: (a: number, b: number) => number;
// combineValues = add;
// callbacks
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
addAndHandle(10, 20, function (result) {
    console.log(result);
});

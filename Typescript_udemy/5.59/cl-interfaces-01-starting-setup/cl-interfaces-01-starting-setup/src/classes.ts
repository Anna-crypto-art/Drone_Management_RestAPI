// CLASSES, public and private,      readonly: you cannot reassign
class Department {
    static fiscalYear = 2020;
    // private readonly id: string;
    // private name: string;
    protected employees: string[] = [];   // protected for using in inheritance

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }

    static createEmployee(name: string) {    // static method
        return {name: name };
    }

    describe(this: Department) {
        console.log(`Department (${this.id}): ${this.name}`);   // method 
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

// inheritance
class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }

    set mostRecentReport(value:string) {
        if (!value) {
            throw new Error('Please pass in a valid value');
        }
        this.addReport(value);
    }

    constructor(id: string, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    describe() {
        console.log('Accounting Department - ID: ' + this.id);
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
}

//const accounting = new Department('d1', 'Accounting');    // define initial value in constractor
// console.log(accounting);
//accounting.addEmployee('Max');
//accounting.addEmployee('Manu');
//accounting.describe();
//accounting.printEmployeeInformation();
const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Max']);   // Max - admins, d1 - ID. Also, for we can also do: it.printEmployeeInformation();
console.log(it);

const accounting = new AccountingDepartment('d2', []);
//console.log(accounting.mostRecentReport); // check if there is a report
//accounting.mostRecentReport = ''; // check set
accounting.addReport('Something went wrong');

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

// accounting.printReports();
// accounting.printEmployeeInformation();
accounting.describe();
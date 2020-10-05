// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeumber() {
        return this.officeNumber;
    }
    getRole() {
        return 'Manager';
    }
}

var Bob = new Manager('bob', 33, 'bob@test.com', 8632558934)

console.log(Bob.getEmail());

console.log(Bob.getRole())

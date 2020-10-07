const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//empty array to be populated as the user creates their team
let teamMembers = [];

// Create team function lets user choose the Type of employee they want to add, and then calls the create function based on that Employee type
function createTeam(){
    inquirer.prompt([
    {
        type: "list",
        message: "What type of employee would you like to add?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "type"
    }
    ])
    .then(function(employee){
        if (employee.type === "Manager"){
            createManager();
        }
        if (employee.type === "Engineer"){
            createEngineer();
        }
        if (employee.type === "Intern"){
            createIntern();
        }
    })
}

function createManager(){
inquirer.prompt([
    {
    type: "input",
    message: "What is your manager's name?",
    name: "name",
    validate: validateName
    },
    {
    type: "input",
    message: "What is your manager's ID number?",
    name: "id",
    validate: validateNumber
    },
    {
    type: "input",
    message: "What is your manager's email address?",
    name: "email",
    validate: validateEmail
    },
    {
    type: "input",
    message: "What is your manager's office number?",
    name: "officeNumber",
    validate: validateNumber
    }
  ])
  .then(function(response) {
    //create new Manager, and push to the teamMembers array
    var newManager = new Manager(response.name, response.id, response.email, response.officeNumber)
    teamMembers.push(newManager);
    addTeamMember()
})
}

function createEngineer(){
inquirer.prompt([
    {
    type: "input",
    message: "What is your engineer's name?",
    name: "name",
    validate: validateName
    },
    {
    type: "input",
    message: "What is your engineer's ID number?",
    name: "id",
    validate: validateNumber
    },
    {
    type: "input",
    message: "What is your engineer's email address?",
    name: "email",
    validate: validateEmail
    },
    {
    type: "input",
    message: "What is your engineer's GitHub?",
    name: "github"
    }
    ])
    .then(function(response) {
   //create new Engineer, and push to the teamMembers array
    var newEngineer = new Engineer(response.name, response.id, response.email, response.github)
    teamMembers.push(newEngineer);
    addTeamMember()
})
}
function createIntern(){
inquirer.prompt([
    {
    type: "input",
    message: "What is your intern's name?",
    name: "name",
    validate: validateName
    },
    {
    type: "input",
    message: "What is your intern's ID number?",
    name: "id",
    validate: validateNumber
    },
    {
    type: "input",
    message: "What is your intern's email address?",
    name: "email",
    validate: validateEmail
    },
{
    type: "input",
    message: "What is your intern's school?",
    name: "school",
    validate: validateName
    }
    ])
    .then(function(response) {
   //create new Intern, and push to the teamMembers array
    var newIntern = new Intern(response.name, response.id, response.email, response.school)
    teamMembers.push(newIntern);
    addTeamMember()
})
}

//ask if user wants to add another Employee, if so then call the createTeam function and choose type. If not, render the HTML
function addTeamMember(){
    inquirer.prompt([
    {
    type: "list",
    message: "Would you like to add another Employee?",
    choices: ["Yes", "No"],
    name: "add",
    }
    ])
    .then(function(add){
        if (add.add === "Yes"){
            createTeam();
        }
        else if (add.add === "No") {
            renderHTML();
        }
    })
}
//make 'output' folder if necessary, and write the file to it
function renderHTML(){
    const generatedFile = render(teamMembers);

    // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
    fs.mkdir(OUTPUT_DIR, { recursive: true }, (err) => {
        if (err) throw err;
    fs.writeFile(outputPath, generatedFile, (err) => {
        if (err){
            return console.log(err);
        }
        console.log("File written!");
        });
    });
}

//initial call for creating the team
createTeam();

//validate that the Name is not empty and that it does not contain numbers
const validateName = async (input) => {
    if (input === ""){
        return "Please enter a name"
    }
    if  (/\d/.test(input)) {
       return "This option should not contain numbers.";
    }
    return true;
 };

//validate the ID number to be a number, and make sure it is not empty
 const validateNumber = async (input) => {
    if (input === ""){
        return "Please enter a valid number"
    }
    if(isNaN(input)) {
       return "This should be a number.";
    }
    return true;
 };

//validate email is in the proper format (follows example found here: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)
 const validateEmail = async (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
        return true;
    }
    else {
        return "Please enter valid email."
    }
}
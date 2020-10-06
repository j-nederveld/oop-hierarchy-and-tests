const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
//ask the appropriate questions
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
    name: "name"
    },
    {
    type: "input",
    message: "What is your manager's ID number?",
    name: "id"
    },
    {
    type: "input",
    message: "What is your manager's email address?",
    name: "email"
    },
    {
    type: "input",
    message: "What is your manager's office number?",
    name: "officeNumber"
    }
  ])
  .then(function(response) {
    
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
    name: "name"
    },
    {
    type: "input",
    message: "What is your engineer's ID number?",
    name: "id"
    },
    {
    type: "input",
    message: "What is your engineer's email address?",
    name: "email"
    },
    {
    type: "input",
    message: "What is your engineer's GitHub?",
    name: "github"
    }
    ])
    .then(function(response) {
   
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
    name: "name"
    },
    {
    type: "input",
    message: "What is your intern's ID number?",
    name: "id"
    },
    {
    type: "input",
    message: "What is your intern's email address?",
    name: "email"
    },
{
    type: "input",
    message: "What is your intern's school?",
    name: "school"
    }
    ])
    .then(function(response) {
   
    var newIntern = new Intern(response.name, response.id, response.email, response.school)

    teamMembers.push(newIntern);
    console.log(newIntern.getRole());

    addTeamMember()
})
}

function addTeamMember(){
    inquirer.prompt([
    {
    type: "confirm",
    message: "Would you like to add another Employee?",
    name: "add"
    }
    ])
    .then(function(add){
        if (add.add){
            createTeam();
        }
        else {
            renderHTML();
        }
    })
}

function renderHTML(){
    console.log(teamMembers)
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

createTeam();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

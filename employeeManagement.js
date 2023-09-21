const readline = require("readline");
const fs = require('fs'); // Require the 'fs' module

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const employees = [];

function addEmployee() {
  rl.question("Enter employee name: ", (name) => {
    rl.question("Enter employee ID: ", (id) => {
      employees.push({ id, name });
      console.log("Employee added successfully!\n");
      saveEmployeeDataToFile(); // Save employee data to a file
    });
  });
}

function viewEmployees() {
  if (employees.length === 0) {
    console.log("No employees found.\n");
  } else {
    console.log("Employee List:\n");
    employees.forEach((employee) => {
      console.log(`ID: ${employee.id}, Name: ${employee.name}`);
    });
    console.log("");
  }
  showMenu();
}

function calculateSalary(hoursWorked, hourlyRate) {
  const baseSalary = hoursWorked * hourlyRate;
  const tax = 0.2 * baseSalary; // 20% tax
  const netSalary = baseSalary - tax;
  return netSalary;
}

function calculateEmployeeSalary() {
  rl.question("Enter employee name: ", (name) => {
    rl.question("Enter hours worked: ", (hoursWorked) => {
      rl.question("Enter hourly rate: ", (hourlyRate) => {
        const salary = calculateSalary(
          parseFloat(hoursWorked),
          parseFloat(hourlyRate)
        );
        console.log(`\nEmployee Name: ${name}`);
        console.log(`Monthly Salary: $${salary.toFixed(2)}`);
        showMenu();
      });
    });
  });
}

function exitProgram() {
  console.log("Exiting...");
  rl.close();
}

function saveEmployeeDataToFile() {
  const jsonData = JSON.stringify(employees, null, 2);

  fs.writeFile('employeeData.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Employee data saved to employeeData.json');
    showMenu();
  });
}

function showMenu() {
  console.log("Main Menu");
  console.log("1. Add Employee");
  console.log("2. View Employees");
  console.log("3. Calculate Employee Salary");
  console.log("4. Exit");
  rl.question("Select an option: ", (option) => {
    switch (option) {
      case "1":
        addEmployee();
        break;
      case "2":
        viewEmployees();
        break;
      case "3":
        calculateEmployeeSalary();
        break;
      case "4":
        exitProgram();
        break;
      default:
        console.log("Invalid option.\n");
        showMenu();
        break;
    }
  });
}

console.log("Welcome to the Employee Management and Salary System");
showMenu();
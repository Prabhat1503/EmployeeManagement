const fs = require('fs');

// Read the employee data from employeeData.json
fs.readFile('employeeData.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  let employees;
  try {
    employees = JSON.parse(data);
  } catch (jsonError) {
    console.error('Error parsing JSON data:', jsonError);
    return;
  }

  // Create a new text file to print employee data
  fs.writeFile('employeeData.txt', 'Employee Data:\n\n', 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    // Append employee data to the text file
    employees.forEach((employee) => {
      fs.appendFile('employeeData.txt', `ID: ${employee.id}, Name: ${employee.name}\n`, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
        }
      });
    });

    console.log('Employee data printed to employeeData.txt');
  });
});
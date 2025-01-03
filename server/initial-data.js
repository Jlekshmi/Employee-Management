import {} from "./models/db.js";
import { Employee } from '../../models/Employee.js';

// Runs on the terminal: node initial-data.js
(async () => {
  const employees = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      age: 30,
      dateOfJoining: new Date("2023-01-01"),
      title: "Developer",
      department: "IT",
      employeeType: "Full-time",
      currentStatus: true,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      age: 25,
      dateOfJoining: new Date("2022-05-15"),
      title: "Designer",
      department: "Design",
      employeeType: "Part-time",
      currentStatus: true,
    },
  ];

  await Employee.create(employees);
  process.exit();
})();

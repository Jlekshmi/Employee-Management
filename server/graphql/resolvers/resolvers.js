import {} from "../../models/db.js";
import { Employee } from "../../models/Employee.js";
import { GQLDate } from "./scalars.js";

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDifference = today.getMonth() - dobDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }

  return age;
}
function isRetirementWithinSixMonths(dob) {
  const retirementAge = 65;
  const dobDate = new Date(dob);
  const retirementDate = new Date(dobDate.setFullYear(dobDate.getFullYear() + retirementAge));
  const today = new Date();
  const sixMonthsFromNow = new Date(today.setMonth(today.getMonth() + 6));
  return retirementDate <= sixMonthsFromNow && retirementDate >= new Date();
}

// Exporting the resolvers for the GraphQL server
export const resolvers = {
  Query: {
    getEmployees: async () => {
      return await Employee.find({});
    },
    getEmployeesByType: async (_, { employeeType }) => {
      return await Employee.find({ employeeType });
    },
    getEmployee: async (_, { id }) => {
      return await Employee.findOne({ id });
    },
    getUpcomingRetirements: async (_, { employeeType }) => {
      const employees = await Employee.find({});
      const upcomingRetirements = employees.filter(employee => {
        const isRetiringSoon = isRetirementWithinSixMonths(employee.dob);
        const matchesType = !employeeType || employee.employeeType === employeeType;
        return isRetiringSoon && matchesType;
      });
      console.log('Upcoming Retirements:', upcomingRetirements);
      return upcomingRetirements;
    },
  },
  Mutation: {
    createEmployee: async (_, { employee }) => {
      const maxIdEmployee = await Employee.findOne().sort({ id: -1 });
      const newId = maxIdEmployee ? maxIdEmployee.id + 1 : 1;
      const age = calculateAge(employee.dob);
      const newEmployee = new Employee({ ...employee, id: newId, age });
      await newEmployee.save();
      return newEmployee;
    },
    editEmployee: async (_, { id, employee }) => {
      const age = calculateAge(employee.dob);
      const updatedEmployee = await Employee.findOneAndUpdate(
        { id },
        { ...employee, age },
        { new: true }
      );
      return updatedEmployee;
    },
    deleteEmployee: async (_, { id }) => {
      const result = await Employee.findOneAndDelete({ id });
      return !!result;
    },
    deleteEmployee: async (_, { id }) => {
      const employee = await Employee.findOne({ id });
      if (!employee) {
        throw new Error('Employee not found');
      }

      if (employee.currentStatus) {
        throw new Error('Cant DELETE EMPLOYEE – STATUS ACTIVE');
      }

      const result = await Employee.findOneAndDelete({ id });
      return !!result;
    },
  
  },
  Date: GQLDate,
};

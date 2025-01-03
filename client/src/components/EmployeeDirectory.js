import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
  

async function fetchAllEmployees() {
  const query = `
    query {
      getEmployees {
        id
        firstName
        lastName
        dob
        age
        dateOfJoining
        title
        department
        employeeType
        currentStatus
      }
    }
  `;

  const response = await fetch("http://localhost:3002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  console.log('GraphQL response:', result);

  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    throw new Error(result.errors.map(error => error.message).join(', '));
  }

  if (!result.data) {
    throw new Error('No data returned from the server');
  }

  return result.data.getEmployees;
}

async function fetchEmployeesByType(employeeType) {
  const query = `
    query getEmployeesByType($employeeType: EmployeeType!) {
      getEmployeesByType(employeeType: $employeeType) {
        id
        firstName
        lastName
        dob
        age
        dateOfJoining
        title
        department
        employeeType
        currentStatus
      }
    }
  `;

  const response = await fetch("http://localhost:3002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { employeeType } }),
  });

  const result = await response.json();
  console.log('GraphQL response:', result);

  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    throw new Error(result.errors.map(error => error.message).join(', '));
  }

  if (!result.data) {
    throw new Error('No data returned from the server');
  }

  return result.data.getEmployeesByType;
}

async function deleteEmployeeById(id) {
  const response = await fetch("http://localhost:3002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation DeleteEmployee($id: Int!) {
        deleteEmployee(id: $id)
      }`,
      variables: { id: id },
    }),
  });

  const result = await response.json();

  // Check if there are errors in the result
  if (result.errors) {
    throw new Error(result.errors.map(error => error.message).join(', '));
  }

  return result.data.deleteEmployee;
}

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [searchParams] = useSearchParams();
  const employeeType = searchParams.get("employeeType") || "All";

  
  const fetchEmployees = async () => {
    try {
      const data = employeeType === 'All'
        ? await fetchAllEmployees()
        : await fetchEmployeesByType(employeeType);
      setEmployees(data || []); // Ensure employees is an empty array if no data
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [employeeType]);

  const deleteEmployee = async (id) => {
    try {
      const success = await deleteEmployeeById(id);
      if (success) {
        setEmployees(employees.filter(employee => employee.id !== id));
      }
    } catch (error) {
      if (error.message.includes('STATUS ACTIVE')) {
        alert('The employee is currently active and cannot be removed.');
      } else {
        console.error('Error deleting employee:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="employee-directory">
      <EmployeeSearch />
      <EmployeeTable data={employees} deleteEmployee={deleteEmployee} />
    </div>
    
  );
}

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
import EmployeeSearch from "./EmployeeSearch";

export default function UpcomingRetirement() {
  const [employees, setEmployees] = useState([]);
  const [searchParams] = useSearchParams();
  const employeeType = searchParams.get("employeeType") || "All";

  const fetchEmployees = async () => {
    try {
      const data = await fetchUpcomingRetirements(employeeType === "All" ? null : employeeType);
      setEmployees(data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [employeeType]);


  async function fetchUpcomingRetirements(employeeType) {
    const query = `
      query getUpcomingRetirements($employeeType: EmployeeType) {
        getUpcomingRetirements(employeeType: $employeeType) {
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
    if (result.errors) {
      throw new Error(result.errors.map((error) => error.message).join(", "));
    }
  
    return result.data.getUpcomingRetirements;
  }

  return (
    <div className="upcoming-retirement">
        
      <EmployeeSearch />
      <EmployeeTable data={employees} hideActions={true}/>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeDetails() {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchEmployee = async (id) => {
    const response = await fetch("http://localhost:3002/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query GetEmployee($id: Int!) {
          getEmployee(id: $id) {
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
        }`,
        variables: { id: parseInt(id) },
      }),
    });
    const result = await response.json();
    console.log("Fetch employee result:", result);
    return result.data.getEmployee;
  };

  useEffect(() => {
    const getEmployee = async () => {
      try{
        const data = await fetchEmployee(id);
      if (data === null) {
        navigate("/NotFound");
      } else {
        setEmployee(data);
        setLoading(false);
      }
      }
      catch{
        navigate("/NotFound");
      }
      
    };
    getEmployee();
  }, [id, navigate]);

  return loading ? (
    <div>LOADING...</div>
  ) : (
    <div className="row mt-4">
      <div className="col-12">
        <div className="add-employee">
          <h4>Employees Details</h4>
          <hr />
      {/* <p><strong>ID:</strong> {employee.id}</p> */}
      <p><strong>First Name:</strong> {employee.firstName}</p>
      <p><strong>Last Name:</strong> {employee.lastName}</p>
      <p><strong>Date Of Birth:</strong> {employee.dob}</p>
      <p><strong>Age:</strong> {employee.age}</p>
      <p><strong>Date of Joining:</strong> {employee.dateOfJoining}</p>
      <p><strong>Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <p><strong>Employee Type:</strong> {employee.employeeType}</p>
      <p><strong>Employee Status:</strong> {employee.currentStatus ? "Working" : "Retired"}</p>
      <button className="btn btn-primary" onClick={() => navigate("/employees")}>Back</button>
    </div>
    </div>
    </div>
  );
}

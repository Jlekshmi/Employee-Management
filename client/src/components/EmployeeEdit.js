import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeEdit() {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({});
  const [isValid, setIsValid] = useState({ valid: true, messages: {} });
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
    return result.data.getEmployee;
  };

  const getEmployeeAndUpdateLoading = async () => {
    const data = await fetchEmployee(id);
    if (data === null) {
      navigate("/NotFound");
    } else {
      setEmployee(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeAndUpdateLoading();
  }, [id]);

  const handleChange = (e, value) => {
    const { name } = e.target;
    setEmployee({
      ...employee,
      [name]: value !== undefined ? value : e.target.value,
    });
    validateField(name, value !== undefined ? value : e.target.value);
  };

  const validateField = (name, value) => {
    let error;
    switch (name) {
      case "title":
        if (!value) {
          error = "Title is required";
        }
        break;
      case "department":
        if (!value) {
          error = "Department is required";
        }
        break;
      case "currentStatus":
        if (value !== true && value !== false) {
          error = "Current Status must be either Working or Retired";
        }
        break;
      default:
        break;
    }
    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      messages: { ...prevIsValid.messages, [name]: error },
    }));
  };

  const editEmployee = async (id, employee) => {
    const response = await fetch("http://localhost:3002/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation EditEmployee($id: Int!, $employee: EmployeeInput!) {
          editEmployee(id: $id, employee: $employee) {
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
        variables: {
          id: parseInt(id),
          employee: {
            firstName: employee.firstName, // Include all required fields
            lastName: employee.lastName,
            dob: employee.dob,
            age: employee.age,
            dateOfJoining: employee.dateOfJoining,
            employeeType: employee.employeeType,
            title: employee.title,
            department: employee.department,
            currentStatus: employee.currentStatus,
          },
        },
      }),
    });

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors.map((error) => error.message).join(", "));
    }
    return result.data.editEmployee;
  };

  const handleSubmit = async () => {
    if (!employee.title || !employee.department || employee.currentStatus === undefined) {
      throw new Error("All fields (Title, Department, Current Status) must be filled before submitting.");
    }

    try {
      const updatedEmployee = await editEmployee(id, employee);
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const errorSpan = (field) =>
    isValid.messages[field] && (
      <small className="text-danger">{isValid.messages[field]}</small>
    );

  return loading ? (
    <div>LOADING...</div>
  ) : (
    <div className="row mt-4">
      <div className="col-12">
        <div className="add-employee">
          <h4>Edit Employees</h4>
          <hr />
          <p className="text-info">
            You can only edit the Title, Department, and Current Status fields.
          </p>
          <form
            id="employeeEdit"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="firstName">First Name:</label>
                <input
                  className="form-control"
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={employee.firstName}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  className="form-control"
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={employee.lastName}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  className="form-control"
                  type="text"
                  id="dob"
                  name="dob"
                  value={employee.dob}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  name="age"
                  value={employee.age}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="dateOfJoining">Date of Joining:</label>
                <input
                  type="text"
                  className="form-control"
                  id="dateOfJoining"
                  name="dateOfJoining"
                  value={employee.dateOfJoining}
                  disabled
                />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="title">Title:</label>
                <select
                  name="title"
                  value={employee.title}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="" disabled>
                    Select Title
                  </option>
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                </select>
                {errorSpan("title")}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="department">Department:</label>
                <select
                  className="form-control"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </select>
                {errorSpan("department")}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="employeeType">Employee Type:</label>
                <select
                  className="form-control"
                  name="employeeType"
                  value={employee.employeeType}
                  disabled
                >
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="currentStatus">Current Status:</label>
                <select
                  className="form-control"
                  name="currentStatus"
                  value={employee.currentStatus ? "1" : "0"}
                  onChange={(e) =>
                    handleChange(e, e.target.value === "1" ? true : false)
                  }
                >
                  <option value="1">Working</option>
                  <option value="0">Retired</option>
                </select>
                {errorSpan("currentStatus")}
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/employees")}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary mx-3">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

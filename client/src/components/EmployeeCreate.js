import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

async function postEmployee(employee) {
  const response = await fetch('http://localhost:3002/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation createEmployee($input: EmployeeInput!) {
          createEmployee(employee: $input) {
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
      `,
      variables: { input: employee },
    }),
  });

  const result = await response.json();
  console.log('Server response:', result);
  if (result.errors) {
    throw new Error(result.errors.map(error => error.message).join(', '));
  }

  return result.data.createEmployee;
}

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

export default function EmployeeCreate() {
  const [errors, setErrors] = useState({});
  const [age, setAge] = useState(null);
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    dateOfJoining: "",
    title: "",
    department: "",
    employeeType: "",
    currentStatus: "1"
  });
  
  const navigate = useNavigate();
  const namePattern = /^[A-Za-z]+$/;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value || !namePattern.test(value)) {
          error = `${name === "firstName" ? "First name" : "Last name"} is required and should contain only letters`;
        }
        break;
      case "dob":
        if (!value || !datePattern.test(value)) {
          error = "Date of Birth is required and should be in YYYY-MM-DD format";
        } else {
          const calculatedAge = calculateAge(value);
          setAge(calculatedAge);
          if (calculatedAge < 20 || calculatedAge > 70) {
            error = "Valid age is required and should be between 20 and 70";
          }
        }
        break;
      case "dateOfJoining":
        if (!value || !datePattern.test(value)) {
          error = "Date of joining is required and should be in YYYY-MM-DD format";
        }
        break;
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
      case "employeeType":
        if (!value) {
          error = "Employee type is required";
        }
        break;
      case "currentStatus":
        if (value !== "1" && value !== "0") {
          error = "Current Status must be either Working or Retired";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      ...employee,
      age: age,
      currentStatus: employee.currentStatus === "1" ? true : false
    };

    const formErrors = validateForm(employeeData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await postEmployee(employeeData);
      setEmployee({
        firstName: "",
        lastName: "",
        dob: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: "",
        currentStatus: "1"
      });
      setErrors({});
      setAge(null);
      navigate('/employees');
    } catch (error) {
      console.error("Error submitting employee:", error);
    }
  };

  const validateForm = (employeeData) => {
    const errors = {};
    Object.keys(employeeData).forEach((key) => {
      validateField(key, employeeData[key]);
      if (errors[key]) {
        errors[key] = errors[key];
      }
    });
    return errors;
  };

  return (
    <div className="row mt-4">
      <div className="col-12">
        <div className="add-employee">
          <h4>Add Employees</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="firstName">First Name:</label>
                <input className="form-control" name="firstName" placeholder="First Name" onChange={handleChange} value={employee.firstName} />
                {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="lastName">Last Name:</label>
                <input className="form-control" name="lastName" placeholder="Last Name" onChange={handleChange} value={employee.lastName} />
                {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="dob">Date of Birth:</label>
                <input className="form-control" name="dob" placeholder="YYYY-MM-DD" type="date" onChange={handleChange} value={employee.dob} />
                {errors.dob && <small className="text-danger">{errors.dob}</small>}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="age">Age:</label>
                <input className="form-control" name="age" placeholder="Age" type="number" value={age || ""} readOnly />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="dateOfJoining">Date of Joining:</label>
                <input className="form-control" name="dateOfJoining" placeholder="Date of Joining" type="date" onChange={handleChange} value={employee.dateOfJoining} />
                {errors.dateOfJoining && <small className="text-danger">{errors.dateOfJoining}</small>}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="title">Title:</label>
                <select className="form-control" name="title" onChange={handleChange} value={employee.title}>
                  <option value="" disabled>Select Title</option>
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                </select>
                {errors.title && <small className="text-danger">{errors.title}</small>}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="department">Department:</label>
                <select className="form-control" name="department" onChange={handleChange} value={employee.department}>
                  <option value="" disabled>Select Department</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Engineering">Engineering</option>
                </select>
                {errors.department && <small className="text-danger">{errors.department}</small>}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="employeeType">Employee Type:</label>
                <select className="form-control" name="employeeType" onChange={handleChange} value={employee.employeeType}>
                  <option value="" disabled>Select Employee Type</option>
                  <option value="FullTime">FullTime</option>
                  <option value="PartTime">PartTime</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
                {errors.employeeType && <small className="text-danger">{errors.employeeType}</small>}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="currentStatus">Current Status:</label>
                <select className="form-control" name="currentStatus" onChange={handleChange} value={employee.currentStatus}>
                  <option value="1">Working</option>
                  <option value="0">Retired</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/employees")}>
                  Back
                </button>
                <button className="btn btn-primary mx-3" type="submit">Add Employee</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

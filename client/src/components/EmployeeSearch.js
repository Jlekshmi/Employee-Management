import React from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

const EmployeeSearch = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const employeeType = searchParams.get("employeeType") || "All";

  const handleChange = (e) => {
    const { name, value } = e.target;
    searchParams.set(name, value);
    setSearchParams(searchParams);

    // Check if the current path is upcoming-retirement, otherwise use employees
    const currentPath = window.location.pathname.includes("upcoming-retirement")
      ? "/employees/upcoming-retirement"
      : "/employees";

    // Navigate while preserving the current path
    navigate(`${currentPath}?employeeType=${value}`);
  };

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='search-container'>
          <h4>Search Employees</h4>
          <hr />
          <div className='row'>
            <div className='col-md-3'>
              <div className='mb-3'>
                <label className="form-label">Employee Type</label>
                <select
                  className="form-control"
                  name="employeeType"
                  value={employeeType}
                  onChange={handleChange}
                >
                  <option value="All">All</option>
                  <option value="FullTime">Full Time</option>
                  <option value="PartTime">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSearch;

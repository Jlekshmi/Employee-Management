import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import EmployeeDirectory from "./components/EmployeeDirectory";
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from "./components/EmployeeEdit";
import EmployeeDetails from "./components/EmployeeDetails";
import UpcomingRetirement from "./components/UpcomingRetirement";
import NotFound from './components/NotFound';
import "./App.css";

function App() {
  return (
    <>
      <div className="container-fluid p-0">
        <div className="owl-carousel owl-theme" id="owl-demo">
          <div className="item">
            <div className="owl-text-overlay">
              <h2>Employee Management System</h2>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate replace to="/employees" />} />
          <Route path="/employees">
            <Route index element={<EmployeeDirectory />} />
            <Route path="create" element={<EmployeeCreate />} />
            <Route path="edit/:id" element={<EmployeeEdit />} />
            <Route path=":id" element={<EmployeeDetails />} />
            <Route path="upcoming-retirement" element={<UpcomingRetirement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

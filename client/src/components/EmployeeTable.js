import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { PencilSquare, Trash, Eye } from 'react-bootstrap-icons'; 
import Modal from 'react-bootstrap/Modal';

export default function EmployeeTable({ data, deleteEmployee, hideActions }) {
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const [currentStatus, setCurrentStatus] = useState();
  
  const handleClose = () => {
    setShow(false);
    setCurrentId('');
  }
  const handleShow = () =>{
    setShow(true);
    
  } 

  const handleDelete = async (id, Status) => {
    console.log(id);
    setCurrentStatus(Status);
  
      setCurrentId(id);
      handleShow();
    

  };

  const employeeDelete = async () => {
    setShow(false);
    try {
      await deleteEmployee(currentId);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
    
    setCurrentId('');
  };


  return (
    <div className='row mt-4'>
      <div className='col-12'>
        <h4>Employees Table</h4>
        <hr />
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Age</th>
              <th scope='col'>Date of Joining</th>
              <th scope='col'>Title</th>
              <th scope='col'>Department</th>
              <th scope='col'>Employee Type</th>
              <th scope='col'>Current Status</th>
              {!hideActions && <th scope='col'>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.age}</td>
                <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                <td>{employee.title}</td>
                <td>{employee.department}</td>
                <td>{employee.employeeType}</td>
                <td>{employee.currentStatus ? 'Working' : 'Retired'}</td>
                {!hideActions && (
                  <td>
                    <ButtonGroup>
                      <Button variant="link" as={Link} to={`edit/${employee.id}`}><PencilSquare /></Button>
                      <Button variant="link" onClick={() => handleDelete(employee.id, employee.currentStatus)}><Trash /></Button>
                      <Button variant="link" as={Link} to={`/employees/${employee.id}`}><Eye /></Button>
                    </ButtonGroup>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={!currentStatus && show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={employeeDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={currentStatus && show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>The employee is currently active and cannot be removed</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>        
        </Modal.Footer>
      </Modal>
    </div>
  );
}

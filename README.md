# Employee Management System

![employees](https://github.com/user-attachments/assets/7c95f8f3-3f43-4b87-8928-95b6062c2735)

The **Employee Management System** is a full-stack web application designed to streamline employee data management within an organization. It provides features like adding, updating, viewing, and deleting employee information, as well as managing employee status, retirement tracking, and filtering capabilities.

---

## Features

1. **Employee Management**:
   - Add, view, update, and delete employee information.
   - Track employee status (e.g., Active, Retired).

2. **Retirement Tracking**:
   - Identify employees nearing retirement within the next six months.
   - Filter employees based on `EmployeeType`.

3. **Data Filtering**:
   - Filter employees by department, status, and other attributes.

4. **Responsive Design**:
   - Built with **React Bootstrap** for mobile-friendly and desktop-friendly user interfaces.

---

## Technology Stack

### **Frontend**
- **React.js**: Component-based UI framework.
- **React Router**: For navigation and routing.
- **Bootstrap**: Styling and responsive design.

### **Backend**
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework.
- **GraphQL**: API query language for efficient data fetching.

### **Database**
- **MongoDB**: NoSQL database for storing employee data.
- **Mongoose**: Object data modeling (ODM) library for MongoDB.

### **Additional Tools**
- **Webpack**: For bundling frontend assets.
- **Babel**: For transpiling modern JavaScript.
- **Dotenv**: To securely manage environment variables.

---
Key Functionalities
Authentication:

Secure login using JWT.
Employee Data Validation:

Schema-based validation using Mongoose.
GraphQL API:

Fetch and manipulate data with efficient queries.
Retirement Status:

Automatically calculate and display upcoming retirements.
Error Handling:

Comprehensive error management for data operations.

## Installation and Setup

### Prerequisites
- Node.js
- npm or yarn
- MongoDB database (local or cloud-based)

Install Dependencies:
npm run installall (Installs all client and server dependencies).
Start Development Server:
npm start (Runs both frontend and backend).

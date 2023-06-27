// import React, { useEffect, useState } from 'react';
// import { Grid, IconButton, Typography } from '@material-ui/core';
// import { ExpandMore, ExpandLess } from '@material-ui/icons';
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-material.css';


// const EmployeeTable1 = () => {

//   const [rowData, setRowData] = useState([]);

//   const [expandedRows, setExpandedRows] = useState([]);
 

//   useEffect(() => {
//     fetchData();
//   }, []);


//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/fetchEmployees');
//       console.log(response.data);
//       setRowData(response.data);
     
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const columnDefs = [
   
//     { field: 'employeeID', headerName: 'Employee ID', sortable: true },
//     { field: 'employeeFirstName', headerName: 'Employee FirstName', sortable: true },
//     { field: 'employeeLastName', headerName: 'Employee LastName', sortable: true },
//     { field: 'address', headerName: 'Address', sortable: true },
//     { field: 'phoneNumber', headerName: 'Phone Number', sortable: true },
//     { field: 'email', headerName: 'Email', sortable: true },
//     { field: 'isActive', headerName: 'Active Status', sortable: true },
//     { field: 'employementType', headerName: 'Employement Type', sortable: true },
   
//   ];


//   const toggleRowDetails = (rowId) => {
//     if (expandedRows.includes(rowId)) {
//       setExpandedRows((prevRows) => prevRows.filter((id) => id !== rowId));
//     } else {
//       setExpandedRows((prevRows) => [...prevRows, rowId]);
//     }
//   };

//   const expandableCellRenderer = ({ value, data }) => {
//     const isExpanded = expandedRows.includes(data.id);

//     return (
//       <div>
//         {isExpanded ? (
//           <ExpandLess onClick={() => toggleRowDetails(data.id)} />
//         ) : (
//           <ExpandMore onClick={() => toggleRowDetails(data.id)} />
//         )}
//         {value}
//       </div>
//     );
//   };

//   const frameworkComponents = {
//     expandableCellRenderer: expandableCellRenderer,
//   };

//   const rowTemplate = ({ rowData }) => {
//     const isExpanded = expandedRows.includes(rowData.id);

//     return (
//       <div>
//         <IconButton
//           onClick={() => toggleRowDetails(rowData.id)}
//           size="small"
//         >
//           {isExpanded ? <ExpandLess /> : <ExpandMore />}
//         </IconButton>
//         <span>{rowData.employeeID}</span>
//         {isExpanded && (
//           <div>
//             {/* Display additional details */}
//             <Typography>{rowData.employeeFirstName}</Typography>
//             <Typography>{rowData.employeeLastName}</Typography>
//             <Typography>{rowData.address}</Typography>
//             <Typography>{rowData.phoneNumber}</Typography>
//             <Typography>{rowData.email}</Typography>
//             {/* ... Display other details ... */}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (

//     <Grid container>
//     <Grid item xs={12}>
//       <div className="ag-theme-material" style={{ height: '500px', width: '100%' }}>
//         <AgGridReact
//           columnDefs={columnDefs}
//           rowData={rowData}
//           frameworkComponents={frameworkComponents}
//           masterDetail={true}
//         ></AgGridReact>
//       </div>
//     </Grid>
//   </Grid>
//   );
// };

// export default EmployeeTable1;
import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Checkbox, InputLabel, MenuItem, Select, TextField, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import axios from 'axios';
import "../employeeTable/table.css";


function EmployeeTable1() {
  const [rowData, setRowData] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});
  const [employeeAdded, setEmployeeAdded] = useState(false);
  const [addEmployeeVisability, setAddEmployeeVisability] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
 

  const showDialog = () => {
    setAddEmployeeVisability(true);
    setEmployeeAdded(false);
  };

  const hideDialog = () => {
    setAddEmployeeVisability(false);
    setAddEmployeeVisability(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetchEmployees');
      setRowData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const inputValue = e.target.type === 'checkbox' ? checked : value;
    setNewEmployee((prevEmployee) => ({ ...prevEmployee, [name]: inputValue }));
  };

  const addEmployee = async () => {
    try {
      await axios.post('http://localhost:5000/saveEmployee', newEmployee);
      fetchData();
      setNewEmployee({});
      setEmployeeAdded(true);
      setAddEmployeeVisability(false);
      setShowNotification(true);

      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/fetchEmployees/${employeeId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const updateEmployee = async (employeeData) => {
    try {
      await axios.put(`http://localhost:5000/fetchEmployees/${employeeData._id}`, employeeData);
      fetchData();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  
 


  const ActionsCellRenderer = ({ data }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({});
  
    const handleDelete = async () => {
      try {
        await deleteEmployee(data._id);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    };
  
    const handleEdit = () => {
      setEditMode(true);
      setEditedEmployee(data);
    };
  
    const handleCancel = () => {
      setEditMode(false);
      setEditedEmployee({});
    };
  
    const handleInputChange = (e) => {
      const { name, value, checked } = e.target;
      const inputValue = e.target.type === 'checkbox' ? checked : value;
      setEditedEmployee((prevEmployee) => ({ ...prevEmployee, [name]: inputValue }));
    };
  
    const handleUpdate = async () => {
      try {
        await updateEmployee(editedEmployee);
        setEditMode(false);
        setEditedEmployee({});
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    };
  
    if (editMode) {
      return (
        <div>
          <IconButton onClick={handleDelete} size="small">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleUpdate} size="small">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleCancel} size="small">
            <CloseIcon />
          </IconButton>
          <form>
            {/* Display the input fields for editing employee data */}
            <input
              type="text"
              name="employeeID"
              placeholder="Employee ID"
              value={editedEmployee.employeeID || ''}
              onChange={handleInputChange}
            />
            {/* Rest of the input fields */}
          </form>
        </div>
      );
    }
  
    return (
      <div>
        <IconButton onClick={handleDelete} size="small">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleEdit} size="small">
          <EditIcon />
        </IconButton>
      </div>
    );
  };

  const columnDefs = [
    { field: 'employeeID', headerName: 'Employee ID', sortable: true },
    { field: 'employeeFirstName', headerName: 'Employee First Name', sortable: true },
    { field: 'employeeLastName', headerName: 'Employee Last Name', sortable: true },
    { field: 'address', headerName: 'Address', sortable: true },
    { field: 'phoneNumber', headerName: 'Phone Number', sortable: true },
    { field: 'email', headerName: 'Email', sortable: true },
    { field: 'isActive', headerName: 'Active Status', sortable: true },
    { headerName: 'Actions', field: 'actions', cellRenderer: ActionsCellRenderer },
  ];


  const frameworkComponents = {
    actionsCellRenderer: ActionsCellRenderer,
  };
  return (
    
    <Grid container>
       
      <Grid item xs={12}>
        <div className="ag-theme-material" style={{ height: '500px', width: '100%' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            frameworkComponents={frameworkComponents}
           
          />
        </div>
      </Grid>

      <Button variant="contained" color="primary" onClick={showDialog}>
       Add A New Employee
      </Button>

      <Dialog open={addEmployeeVisability} onClose={hideDialog}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
        <Grid item xs={12} className='grid-container'>
        <TextField
          type="text"
          name="employeeID"
          label="Employee ID"
          value={newEmployee.employeeID || ''}
          onChange={handleInputChange}
          required
        />
        <TextField
          type="text"
          name="employeeFirstName"
          label="Employee First Name"
          value={newEmployee.employeeFirstName || ''}
          onChange={handleInputChange}
          required
        />
        <TextField
          type="text"
          name="employeeLastName"
          label="Employee Last Name"
          value={newEmployee.employeeLastName || ''}
          onChange={handleInputChange}
          required
        />
        <TextField
          type="text"
          name="address"
          label="Address"
          value={newEmployee.address || ''}
          onChange={handleInputChange}
        />
        <TextField
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          pattern="[0-9]{10}"
          value={newEmployee.phoneNumber}
          onChange={handleInputChange}
          inputProps={{
            pattern: "[0-9]{10}", // Regular expression for 10-digit phone number
            title: 'Please enter a valid 10-digit phone number',
          }}
          required
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          value={newEmployee.email || ''}
          onChange={handleInputChange}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isActive"
              checked={newEmployee.isActive || ''}
              onChange={handleInputChange}
              required
            />
          }
          label="Active Status"
        />
        <InputLabel>Employment Type</InputLabel>
        <Select
          name="employementType"
          value={newEmployee.employementType || ''}
          onChange={handleInputChange}
          required
        >
          <MenuItem value="Full-Time">Full-time</MenuItem>
          <MenuItem value="Part-Time">Part-time</MenuItem>
          <MenuItem value="Temporary">Temporary</MenuItem>
        </Select>
      
      </Grid>
        </DialogContent>
        <DialogActions>
        <Button onClick={addEmployee} color="primary">
           Add Employee
          </Button>
         
          <Button onClick={hideDialog} color="primary">
            Cancel
          </Button>
          
        </DialogActions>
      </Dialog>
      {showNotification && (
        <div className="notification">
          Employee added successfully!
        </div>
      )}

    </Grid>
  );
}

export default EmployeeTable1;


import React, { useState, useEffect } from 'react';
import { Grid, IconButton,  Button} from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';
// import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { Edit as EditIcon, Delete as DeleteIcon, Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import axios from 'axios';
import "../employeeTable/table.css";
import AddEmployeeDialog from './addEmployee';

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
      setEditedEmployee({ ...data });
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

  const onRowDataChanged = (params) => {
    params.api.sizeColumnsToFit();
  };
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
            onRowDataChanged={onRowDataChanged}

          />
        </div>
      </Grid>

      <Button variant="contained" color="primary" onClick={showDialog}>
       Add A New Employee
      </Button>

      <AddEmployeeDialog
        open={addEmployeeVisability}
        handleClose={hideDialog}
        handleInputChange={handleInputChange}
        handleAddEmployee={addEmployee}
        newEmployee={newEmployee}
      />
      {showNotification && (
        <div className="notification">
          Employee added successfully!
        </div>
      )}

    </Grid>
  );
}

export default EmployeeTable1;


import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

const AddEmployeeDialog = ({
  open,
  handleClose,
  handleInputChange,
  handleAddEmployee,
  newEmployee,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogContent>
        <Grid item xs={12} className="grid-container">
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
        <Button onClick={handleAddEmployee} color="primary">
          Add Employee
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;

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

const EditEmployeeDialog = ({
    editDialogOpen,
    closeEditDialog,
    handleEditInputChange,
    handleUpdateEmployee,
  editedEmployee,
}) => {
  return (
    <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {/* Render the form fields for editing */}

          <Grid item xs={12} className="grid-container">
        <TextField
          type="text"
          name="employeeID"
          label="Employee ID"
          value={editedEmployee.employeeID || ''}
          onChange={handleEditInputChange}
          required
        />
        <TextField
          type="text"
          name="employeeFirstName"
          label="Employee First Name"
          value={editedEmployee.employeeFirstName || ''}
          onChange={handleEditInputChange}
          required
        />
        <TextField
          type="text"
          name="employeeLastName"
          label="Employee Last Name"
          value={editedEmployee.employeeLastName || ''}
          onChange={handleEditInputChange}
          required
        />
        <TextField
          type="text"
          name="address"
          label="Address"
          value={editedEmployee.address || ''}
          onChange={handleEditInputChange}
        />
        <TextField
          type="tel"
          name="phoneNumber"
          label="Phone Number"
          pattern="[0-9]{10}"
          value={editedEmployee.phoneNumber}
          onChange={handleEditInputChange}
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
          value={editedEmployee.email || ''}
          onChange={handleEditInputChange}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isActive"
              checked={editedEmployee.isActive || ''}
              onChange={handleEditInputChange}
              required
            />
          }
          label="Active Status"
        />
        <InputLabel>Employment Type</InputLabel>
        <Select
          name="employementType"
          value={editedEmployee.employementType || ''}
          onChange={handleEditInputChange}
          required
        >
          <MenuItem value="Full-Time">Full-time</MenuItem>
          <MenuItem value="Part-Time">Part-time</MenuItem>
          <MenuItem value="Temporary">Temporary</MenuItem>
        </Select>
        </Grid>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateEmployee} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default EditEmployeeDialog;

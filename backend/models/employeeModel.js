const mongoose = require('mongoose')

const employeeSchema  = mongoose.Schema(
    {
        employeeID:{
            type: Number,
            required:[true, "please enter EmployeeID"] 
        },
        employeeFirstName:{
            type: String,
            required:[true, "please enter First Name"] 
        },
        employeeLastName:{
            type: String,
            required:[true, "please enter Last Name"] 
        },
        
        address:String,
        phoneNumber: Number,
        
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
              validator: (value) => {
                // Regular expression to validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
              },
              message: 'Please enter a valid email address.'
            }
          },
          age: Number,
          gender: {
            type: String,
            enum: ['Male', 'Female', 'Other']
          },
          isActive: {
            type: Boolean,
            required:[true] 
        },  
        employementType: {
            type: String,
            enum: ['Part-Time', 'Full-Time', 'Temporary']
          },


    },
    {
        timestamps: true
    }
)

const Employee = mongoose.model('Employee',employeeSchema );

module.exports = Employee;
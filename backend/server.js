console. log("backend has started");

const express = require('express');
const app = express();
const cors = require('cors');
const Employee = require('./models/employeeModel')
const mongoose = require("mongoose");
const port = 5000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, Word!');
});

//fetching employees
app.get('/fetchEmployees', async(req,res)=>{
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//fetching by ID
app.get('/fetchEmployees/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//saving the emoloyees
app.post('/saveEmployee', async(req,res)=>{
 try{

    const employee = await Employee.create(req.body)
    res.status(200).json(employee)
 } catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
 }
})

//Updating the employees
app.put('/fetchEmployees/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body);
        if(!employee){
            return res.status(404).json({message:'cannot find any employee with id ${id}'})
        }
        const updatedEmployee = await Employee.findById(id);
        res.status(200).json(updatedEmployee); 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Deleting employee 

app.delete('/fetchEmployees/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if(!employee){
            return res.status(404).json({message:'cannot find any employee with id ${id}'})
        }
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({message: error.message})  
    }
})


//connecting to database
mongoose.connect('mongodb+srv://root:root@cluster0.sop2xv4.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() =>{
    console.log("connected to database")
    // Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error)=>{
    console.log(error)
})
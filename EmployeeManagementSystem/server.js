const express = require('express');
const mongoose = require('mongoose');
const app = express();
PORT = 5050;


const databaseUrl = 'mongodb://127.0.0.1/studentDb'

mongoose.connect(databaseUrl).then(()=>{
    console.log(`Successfully connected to the database: ${databaseUrl}`);
}).catch((error)=>{
    console.log(error.message)
})

const systemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Employee name is required"]
    },
    email: {
        type: String,
        required: [true, "Employee email is required"]
    },
    password: {
        type: String,
        required: [true, "Employee password is required"]
    },
    role: {
        type: String,
        required: [true, "Employee role is required"]
    },
    department: {
        type: String,
        required: [true, "Employee department is required"]
    },
    manager: {
        type: String,
        required: [true, "Employee manager is required"]
    },
    hireDate: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: Number,
        required: [true, "Employee salary is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const systemModel = mongoose.model('employees', systemSchema);


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Getting all Employees
app.get('/employees', async (req, res)=>{
    try {
        const employees = await systemModel.find();
        if (!employees) {
            return res.status(404).json({
                message: "No employees found"
            })
        } else {
            return res.status(200).json({
                message: "Employees found",
                data: employees
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})



// Employing a new Individual - CREATING

app.post('/employees', async (req, res) => {
    const employee = new systemModel(req.body);
    try {
        const employee = await systemModel.create(req.body)
        if (!employee) {
            return res.status(400).json({
                message: "Employee could not be created"
            })
        } else {
            return res.status(201).json({
                message: "Employee created successfully",
                data: employee
            })
        }
    }catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
})


// Getting an Employee
app.get('/employees/:id', async (req, res)=>{
    try {
        const employee = await systemModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            })
        } else {
            return res.status(200).json({
                message: "Employee found",
                data: employee
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})


// Updating ana Employee's data
app.put('/employees/:id', async (req, res)=>{
    try {
        const employee = await systemModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            })
        } else {
            return res.status(200).json({
                message: "Employee updated successfully",
                data: employee
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})


// Delete an Employee
app.delete('/employees/:id', async (req, res)=>{
    try {
        const employee = await systemModel.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            })
        } else {
            return res.status(200).json({
                message: "Employee deleted successfully",
                data: employee
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})


app.listen(PORT, (error)=>{
    if(error) {
        console.log(`This Server with Port: ${PORT} is diconnected`)
    } else {
        console.log(`This server is connected and listening to Port: ${PORT}`)
    }
})
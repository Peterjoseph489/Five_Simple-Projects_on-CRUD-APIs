const express = require('express');
const fs = require('fs')
PORT = 9090;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello World!"
    });
});


//Function to read my Database
const readDatabase = (req, res) => {
    const database = fs.readFileSync('./database.json')
    return JSON.parse(database);
}

//Function to write into my Database
const writeDatabase = (data)=> {
    fs.writeFileSync('./database.json', JSON.stringify(data, null, 2))
}



//Getting all Tasks
app.get('/tasks', (req, res)=>{
    const tasks = readDatabase();
    if (tasks.tasks.length === 0) {
        res.status(200).json({
        message: "No Tasks"
        })
    } else {
        res.status(200).json({
            message: "OK",
            data: tasks,
            total: tasks.tasks.length
        })
    }
})

//Getting One Task Information
app.get('/tasks/:id', (req, res) => {
    const tasks = readDatabase();
    const task = tasks.tasks.find(task => task.id === parseInt(req.params.id));
    if (task) {
        res.status(200).json({
            message: "OK",
            data: task
        })
    } else {
        res.status(404).json({
            message: "Task Not Found"
        })
    }
})

//Creating a Task
app.post('/tasks', (req, res) => {
    const tasks = readDatabase();
    const newTask = req.body;
    newTask.id = tasks.tasks.length + 1;
    tasks.tasks.push(newTask);
    writeDatabase(tasks);
    res.status(201).json({
        message: "OK",
        data: newTask
    })

    // second method
    // const { title, completed } = req.body;
    // newTaskid = tasks.tasks.length + 1;
    // newTask = {
    //     id: newTaskid,
    //     title,
    //     completed
    // }

    // database.users.push(newTask);
    // writedatabase(tasks);
    // res.status(201).json({
    //     Data: newTasks
    // })
})


// Update a Task
app.put('/tasks/:id', (req, res)=>{
    const tasks = readDatabase();
    const task = tasks.tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({
            message: "Task does not Exist"
        })
    } else {
        task.title = req.body.title || task.tasks.title;
        task.completed = req.body.completed || task.tasks.completed;
        writeDatabase(tasks);
        res.status(200).json({
            message: "OK",
            data: task
        })
    }
})


// Deleting a Task

app.delete('/tasks/:id', (req, res)=>{
    const tasks = readDatabase();
    const task = tasks.tasks.find(task => task.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({
            message: "Task does not Exist"
        })
    } else {
        tasks.tasks = tasks.tasks.filter(task => task.id!== parseInt(req.params.id));
        writeDatabase(tasks);
        res.status(200).json({
            message: "OK",
            data: task
        })
    }
})




app.listen(PORT, () => {
    console.log(`ToDo app listening at http://localhost:${PORT}`);
});
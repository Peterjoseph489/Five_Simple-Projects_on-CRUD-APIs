const express = require('express');
const app = express();
PORT = 3535;

app.use(express.json());

const items = [
    {
        id: 1,
        name: "Product 1",
        price: 10.99,
        quantity: 2
    },
    {
        id: 2,
        name: "Product 2",
        price: 5.99,
        quantity: 1
    },
    {
        id: 3,
        name: "Product 3",
        price: 7.99,
        quantity: 3
    }
]

app.get('/', (req, res)=>{
    res.status(200).json({
        message: "Hello World"
    })
})


// Get all Items
app.get('/items', (req, res)=>{
    res.status(200).json(items)
})

// Get one Item
app.get('/items/:id', (req, res)=>{
    const id = req.params.id;
    const item = items.find(item => item.id == id)
    if (!item) {
        res.status(404).json({
            message: "Item doe not exist"
        })
    } else {
        res.status(200).json(item)
    }
})


// Create new Item
app.post('/items', (req, res)=>{
    const item = req.body;
    const id = items.length + 1;
    item.id = id;
    items.push(item);
    res.status(201).json(item)
})


//Updating an Item
app.put('/items/:id', (req, res)=>{
    const item = req.body;
    const id = req.params.id;
    const index = items.findIndex(item => item.id == id);
    if (index == -1) {
        res.status(404).json({
            message: "Item doe not exist"
        })
    } else {
        items[index] = item;
        res.status(200).json(item)
    }
})


//Delete a item
app.delete('/items/:id', (req, res)=>{
    const id = req.params.id;
    const index = items.findIndex(item => item.id == id);
    if (index == -1) {
        res.status(404).json({
            message: "Item doe not exist"
        })
    } else {
        items.splice(index, 1);
        res.status(200).json({
            message: "Item deleted"
        })
    }
})


app.listen(PORT, (error)=>{
    if(error) {
        console.log(error.message)
    } else {
        console.log (`This Shopping Cart server is connected to Port: ${PORT}`)
    }
})
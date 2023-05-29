const express = require('express');
const mongoose = require('mongoose')
PORT = 2020


//database
const databaseurl = 'mongodb://localhost/blogDb'
mongoose.connect(databaseurl).then(()=>{
    console.log('Database connected')
}).catch(()=>{
    console.log('Database not connected')
})

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog title is required"]
    },
    content: {
        type: String,
        required: [true, "Blog Content is required"]
    },
    author: {
        type: String,
        required: [true, "Blog Author is required"]
    }
})

const blogModel = mongoose.model('blog', blogSchema)



const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World"
  });
});

//create a new post
app.post('/posts', async(req, res)=>{
  try {
    const post = await blogModel.create(req.body);
    if (!student) {
      res.status(404).json({
        message: "Error Creating a Post"
      })
    } else {
      res.status(200).json({
        status: "success",
        data: post
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "error.message"
    })
  }
})



//Getting all Posts
app.get('/posts', async (req, res)=>{
  try {
    const posts = await blogModel.find();
    if (posts.length < 0) {
      res.status(404).json({
        status: "No Post Found",
        data: posts
      })
    } else {
      res.status(201).json({
        status: "success",
        data: posts
      })
    }
  } catch (error) {
    console.log(error.message)
  }
})


//get a Post
app.get('/posts/:id', async (req, res)=>{
  try {
    const postid = req.params.id;
    const post = await blogModel.findById(postid)
    if (!post) {
      res.status(404).json({
        message: `Post with the Id: ${postid} was not found`
      })
    } else {
      res.status(200).json({
        status: "success",
        data: post
      })
    }
  } catch (error) {
    res.status(404).json({
      message:error.message
    })
  }
})


//update a Post
app.put('/posts/:id', async (req, res)=>{
  try {
    const postid = req.params.id;
    const updatePost = blogModel.findByIdAndUpdate(postid, req.body, {
      new: true
    });
    if (!updatePost) {
      res.status(404).json({
        message: "Failed to update Post"
      })
    } else {
      res.status(200).json({
        status: "success",
        data: updatePost
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})



//Delete a Post
app.delete('/post/:id', async (req, res)=>{
  try {
    const postid = req.params.id;
    const deletePost = blogModel.findByIdAndDelete(postid);
    res.status(200).json({
      message: `User with id: ${ postid } deleted`
    })
  } catch {

  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


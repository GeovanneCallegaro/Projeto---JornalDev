const express = require('express');
const cors = require('cors');
require('dotenv').config()

const app = express();

//Config JSON response 
app.use(express.json());

//Solve CORS
app.use(cors( {
    credentials: true, 
    origin: 'http://localhost:3000'
}));

// Public folder for images 
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')
const AdminRoutes = require('./routes/AdminRoutes')
const PostsRoutes = require('./routes/PostsRoutes')

app.use('/users', UserRoutes)
app.use('/admin', AdminRoutes)
app.use('/posts', PostsRoutes)

// start server
app.listen(5000)
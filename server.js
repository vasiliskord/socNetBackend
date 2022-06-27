const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const port =process.env.PORT
const app= express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/users",require('./routes/userRoutes'))
app.use("/api/posts", require("./routes/postRoutes"));


app.use(errorHandler);


app.listen(port,()=>console.log(`Server opened at port ${port}`))
const express = require('express');
const {connection} = require("./db");
const {userRouter} = require("./routes/user.routes");
const {noteRouter} = require("./routes/note.route");
const cors = require("cors");
require("dotenv").config()

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user",userRouter)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to the db")
        console.log(`port is running at port ${process.env.port}`)
    } catch (error) {
        console.log(err);
        console.log("something went wrong")
    }
})
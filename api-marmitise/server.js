const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");


//const usersRouter = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');


const uri = "mongodb+srv://Walagaine:98U6RSutNrDIFSeU@cluster0.sigctnl.mongodb.net/?retryWrites=true&w=majority"
async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}
connect();



const app = express();

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

//app.use('/api/users', usersRouter);
app.use('/api', authRoute);

app.get("/", (req, res) => {
    res.send("welcome to the beginning of my project");
});



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server started on port 8000");
})
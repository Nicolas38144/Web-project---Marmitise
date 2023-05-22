const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");
require('dotenv').config();


const authRoute = require('./routes/auth.routes');
const softRouter = require('./routes/soft.routes');
const alcoolRouter = require('./routes/alcool.routes');
const ingredientRouter = require('./routes/ingredient.routes');
const barRouter = require('./routes/bar.routes');
const cocktailRouter = require('./routes/cocktail.routes');

const password_MongoDB = process.env.PASSWORD_MONGODB;
const uri = "mongodb+srv://"+password_MongoDB+"@cluster0.ob2ppqx.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
    try {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log('Error during the connexion :', err));
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
    //origin: "http://localhost:3000"
    origin: "https://marmitise.netlify.app/"
}));


app.use('/api', authRoute);
app.use('/api/soft', softRouter);
app.use('/api/alcool', alcoolRouter);
app.use('/api/ingredient', ingredientRouter);
app.use('/api/bar', barRouter);
app.use('/api/cocktail', cocktailRouter);




app.get("/", (req, res) => {
    res.send("welcome to the beginning of my project");
});



const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server started on port 8000");
})
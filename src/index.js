const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const mongoose = require("mongoose");
const cors = require("cors");



app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
        console.log("HTTP Method- " + req.method + ", URL- " + req.url);
        next();
});

app.use("/users", userRouter);
app.use("/note", noteRouter);


app.get("/", (req, res)=>{
res.send("Notes API from HarshCode...");
});

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URL)
.then(()=> {
        app.listen(PORT,()=>{
                console.log("Server started on port no " + PORT);
        });
})
.catch((error)=>{
        console.log(error);
})

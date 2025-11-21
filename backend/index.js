const express = require("express")
const userRouter = require("./routes/usersRouter")
const mongoose = require("mongoose");
const cors = require('cors');
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");

const app = express()


mongoose
  .connect("mongodb://localhost:27017/mern-expenses")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));
// cors config
const corsOption = {
  origin:['http://localhost:5173']
};
app.use(cors(corsOption))
// middleware
app.use(express.json());
// routes
app.use("/",userRouter)
app.use("/",categoryRouter)
app.use("/",transactionRouter)
// error
app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT ,()=>{
    console.log(`server is running on this port ${PORT}`)
})


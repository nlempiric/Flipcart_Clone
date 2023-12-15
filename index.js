require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose=require("mongoose")
const routes=require("./routes/auth")
const adminroutes=require("./routes/admin/auth")
const categoryrouter=require("./routes/category")
const productRouter=require("./routes/product")
const cartRouter=require("./routes/cart")
const app=express();
const cors=require("cors")

app.use(cors())
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use("/api",routes) 
app.use("/api",adminroutes) 
app.use("/api",categoryrouter) 
app.use("/api",productRouter) 
app.use("/api",cartRouter) 

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("databe connected");
  });

app.listen(process.env.PORT,()=>{
    console.log("server is running on",process.env.PORT )
})
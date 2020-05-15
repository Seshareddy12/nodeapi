const express=require('express');
const app=express();
const morgan=require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator=require('express-validator');
const fs = require('fs');
// load env variables
const dotenv = require('dotenv');
dotenv.config()
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true,
     useUnifiedTopology: true }
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

const port =8080;
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.get('/',(req,res)=>{
  fs.readFile('./docs/apiDocs.json',(err,data) =>{
      if(err){
        res.status(400).json({
          error:err
        })
      }
      const docs = JSON.parse(data);
      res.json(docs);
  })
})
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(expressValidator());
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function(err,req,res,next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({error:"Unauthorized"});
  }
})

app.listen(port,()=>{
	console.log("A node js is listening");
});
// // const http = require("http");
// import http from "http";
// //old tarika
// // const Name = require("./features.js");
// // console.log(Name);
// // import  { generatelovepercent } from "features.js ";
// // const generatelovepercent  = require("./features.js");
// // console.log(generatelovepercent );
// import   Name from "features.js";
// import  fs from "fs";
// const home = fs.readFile("./index.html" , () => {
//     console.log("File Read");
// });
// console.log(home);


// //new way of import
// // import http from "http";
// // import Name1 from "./features.js";
// // import { Name2} from "./features.js";
// //create server

// // console.log(Name2);
// // const server = http.createServer((req,res)=>{
// //     if(req.url==="/about"){
// //         res.end("<h>love is ${ generatelovepercent()} </h1>");
// //     }
// const server=http.createServer((req, res)=>{
//     if(req.url==="/about"){
//     res.end("<h1>About Page</h1>");    
//     }
//     else if(req.url==="/"){
//         res.end("<h1>Home  Page</h1>");    
//         }
//        else  if(req.url==="/contact"){
//             res.end("<h1>Contact Numaber 8920564804</h1>");    
//             }
//            else  if(req.url==="about"){
//                 res.end("<h1>About Page</h1>");    
//                 }else{
//                     res.end("<h1>Page Not Found</h1>"); 
//                 }
// });
// //listen
// server.listen(9000,()=>{
//     console.log("Server is working");
// });

             ///
            //  express basics
//             import express, { json }  from "express";
//             import path from "path";
// //  res.json({
// //         success:true,
// //         products:[],
// //     });
// // 
// //  console.log(path.resolve());
// //    res.sendFile("./index.html");
//  const app = express();
//  app.get("/",(req,res)=>{
//    const pathlocation = path.resolve();
// res.sendFile(path.join(pathlocation,"./index.html"));
//  });
//  app.listen(5000,()=>{
//     console.log("server is working");
//  });
//             const  =express();
//             serve.listen(5000,()=>{
//                 console.log("server is  working");
//             });



import express from "express";
import path from "path";
import cookieParser from "cookie-parser"; 
import  jwt from "jsonwebtoken";
// connected with mongodb
import mongoose from "mongoose";


mongoose
.connect("mongodb://127.0.0.1:27017",{
    dbName: "BACKEND",
})
.then(()=> console.log("Database Connected"))
.catch(()=>console.log(e));

const userSchema=new mongoose.Schema({
    name: String,
    email: String,
});
const User=mongoose.model("Message",userSchema)
 //end

const app = express();
// const users =[];


//using middleware
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
//setting up view engine
app.set("view engine", "ejs");
//end


//  authentication in nodejs

// app.get("/login",(req,res)=>{
//     res.render("login");
// });

 


// app.get("/",(req,res)=>{
//     const{token}=req.cookies;
//     if(token){
//         res.render("logout");
//     }else{
//         res.render("login");
//     }
// });

const isAuthenticated=(req,res,next)=>{
    const {token}=req.cookies;
    if(token){
        next();
    }else{
        res.render("login");
    }
};

app.get("/",isAuthenticated,(req,res)=>{
    console.log(req.user);
    res.render("logout");
});


app.post("/login",async(req,res)=>{
    const {name,email}=req.body;
    
    const user =await User.create({
        name,
        email,
    });

const token =jwt.sign({_id: user._id},"abcd");
console.log(token);

// //isse cookie set hoti h
//     res.cookie("token",user._id,{
// httpOnly: true,
// expires: new Date (Date.now()+60*1000)//time milesecond m convert krte h isliye 60*1000
// });

//isse login hoga
res.redirect("/");
}) ;
//logout
app.get("/logout",(req,res)=>{
    res.cookie("token",null,{
httpOnly: true,
expires: new Date (Date.now()),
}); 
res.redirect("/");
});

//end



app.get("/",(req,res)=>{
    //for dynamic variable
    res.render("index",{name: "Verma"});
});
//model
app.get("/add",(req,res)=>{
Messge.create({name:"Arvind",email:"arvindbablukori"}).then(()=>{
      res.send("Nice");
});
  
});

app.post("/contact",(req,res)=>{
    console.log(req.body.name);
    users.push({username: req.body.name,email: req.body.email});
    res.render("/success");
});
app.get("/users",(req,res)=>{
    res.json({
        users,
    });
});
app.listen(5000,()=>{
        console.log("server is working");
     });


    


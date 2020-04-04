const express= require('express');
const passport =require('passport');
const authRoutes= require("./routes/auth-routes");
const passportSetup =require('./config/passport-setup.js');
const profileroutes = require('./routes/profile-routes');
const mongoose =require('mongoose');
const cookieSession =require('cookie-session'); 
const app=express();




//set view engine
app.set('view engine','ejs');

//cookie-session
app.use(cookieSession({
    maxAge:24*60*60*1000,//age of a cookie
    keys:['ranjasas']//encrypt key


}));

app.use(passport.initialize());
app.use(passport.session());



//connect to mongoodb
mongoose.connect('mongodb+srv://sandeep:ram@auth-o9p8f.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true} ,()=>{
    console.log(mongoose.connection.readyState);   
console.log("coonect to moongodb");
});

//set up authroutes 
app.use('/auth',authRoutes);

//set up profile routes
app.use('/profile',profileroutes);



//create home page
app.get('/', (req,res) =>
{
    res.render('home',{user:req.user});


});




app.listen(3000,()=>{
console.log("listening");
});

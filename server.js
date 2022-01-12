const express=require('express')
const morgan=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')

const app =express();

require('dotenv').config({
    path:'./config/config.env'
});
app.use(bodyparser)

if(process.env.NODE_ENV==='development'){
    app.use(cors({
        origin:process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))
}

const authRouter= require('./routes/auth.route')
app.use('/api/',authRouter);


app.use((req,res,next)=>{
 res.status(404).json({
     success:false,
     message:"Page not found"
 })
});


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
});
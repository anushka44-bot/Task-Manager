const express=require('express')
const app=express()
const tasks=require('./starter/routes/tasks')
const connectDB=require('./starter/db/connect')
require('dotenv').config()
const notFound=require("./starter/middleware/not-found")
const errorHandlerMiddleware=require('./starter/middleware/error-handler')

app.use(express.static('./starter/public'))
app.use(express.json())

app.get('/home',(req,res)=>{
res.send('Task Manager')
})

app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)
const port=3000
 
const start=async()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`Listening ${port}`));
  } catch (error) {
    console.log(error);
  }
}

start()
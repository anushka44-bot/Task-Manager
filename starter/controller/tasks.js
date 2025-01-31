const Task=require('../models/Task')
const asyncWrapper=require('../middleware/async')

const getAllTasks= asyncWrapper(async (req,res)=>{
  const tasks = await Task.find({})
  res.status(200).json({tasks:tasks})
})

const createTask = async (req, res) => {
    try {
      const task = await Task.create(req.body)
      res.status(201).json({ task })
    } catch (error) {
      res.status(500).json({ error:"Feilds should not be empty" })
    } 
  
}

const getTask= asyncWrapper(async(req,res,next)=>{
    const {id:taskID}=req.params
    const task=await Task.findOne({_id:taskID})
    if(!task){
      const error=new Error('Not Found')
      error.status=404
      return next(error)      
      return res.status(404).json({msg:`NO task with id:${taskID} `})
    }
    res.status(200).json({task})
})

const updateTask= asyncWrapper(async (req,res)=>{
    const {id:taskID}=req.params
    const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
      new:true,runValidators:true
    })
    if(!task){
      return res.status(404).json({msg:`NO task with id:${taskID} `})
    }
    res.status(200).json({task})
  
})

const deleteTask= asyncWrapper(async (req,res)=>{
    const {id:taskID}=req.params
    const task=await Task.findOneAndDelete({_id:taskID})
    if(!task){
      return res.status(404).json({msg:`NO task with id:${taskID} `})
    }
    res.status(200).json({task})
  
})

module.exports={getAllTasks,createTask,getTask,updateTask,deleteTask}
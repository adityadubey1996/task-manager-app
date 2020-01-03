const express = require('express')
const app = express()
// const User = require('./models/user')
const mongoose = require('mongoose')
// const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
mongoose.connect(process.env.MOONGOSE_URL,{
    useNewUrlParser:true,
    useCreateIndex:true
})


const port = process.env.PORT 
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
//  app.post('/users', async (req,res) =>{
        
//         const user = new User(req.body)
//         try{
//             await user.save()
//             res.status(201).send(user)
//         }
//         catch (e){
//             res.status(400).send(e)


//         }

//             // user.save().then(()=>{
//             //     res.send(user)
//             // }).catch((e)=>{
//             //     res.status(400).send(e)
//             // })
    

//         //  console.log(req.body)  for testing
//         //  res.send('testing!')
//  })
//  app.post('/tasks',async (req,res)=>{

//     const task = new Task(req.body)
//     try{
//         await Task.save()
//         res.status(201).send(task)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })
//     // task.save().then(()=>{
//     //     res.send(task)
//     // }).catch((e)=>{
//     //     res.status(400).send(e)
//     // })
//     // })
// app.get('/tasks',async (req,res)=>{

//     try{
//         const tasks = await Task.find({})
//         res.send(tasks) 
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

//     // Task.find({}).then((tasks)=>{
//     //     res.send(tasks)
//     // }).catch((e)=>{
//     //     res.status(500).send(e)
//     // })
//     // })
// app.get('/tasks/:id',async (req,res)=>{
//     const _id= req.params.id
//     try{
//     const task = await Task.findById(_id)
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }
//     catch(e){
//         res.send(500).send(e)

//      }
//     })
// //     Task.findById(_id).then((task)=>{
// //         if(!task){
// //             return res.status(404).send()
// //         }
// //         res.send(task)
// //     }).catch((e)=>{
// //         res.send(500).send(e)
// //     })
// // })
// app.get('/users/:id' , async(req,res)=>{
//     try{
//         console.log(req.params)
//     const _id= req.params.id
//     const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })
    
    
// //     //console.log(_id)
// //     User.findById(_id).then((user)=>{
// //         if(!user) {
// //             return res.status(404).send()
// //         }
// //         res.send(user)
// //     }).catch((e)=>{
// //         res.status(500).send(e)
// //     })    
// // })
// app.get('/users', async (req,res)=>{

//     try{
//         const user =  await User.find({})
//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send(e)
//      }
//     })
// //     User.find({}).then((users)=>{
// //         res.send(users)
// //     }).catch((e)=>
// //     res.send(e))
// // })

// // app.patch('users/:id', async(req,res)=>{

// //     const updates = Object.keys(req.body)
    
// //     const allowedupdates = ['name','email','password','age']
// //     const isvalidupdate = updates.every((updates)=>{
// //         return allowedupdates.includes(updates)
// //     })
// //     if(!isvalidupdate){
// //         console.log(updates)
// //         return res.status(400).send({error:'invalid update'})
// //     }
// //     try{
// //         console.log(req.body)
// //         const user = await User.findByIdAndUpdate(req.params.id, req.body,{ new:true, runValidators: true})
// //         if(!user){
// //             console.log(updates)
// //             return res.status(404).send({error:'user not found'})
// //         }
// //         res.send(user)
// //     }
// //     catch(e){
// //         res.status(400).send(e)
// //     }


// // })

// app.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// // app.patch('/tasks/:id', async (req,res)=>{
// //     const updates = Object.keys(req.body)
// //     const allowedUpdates = ['descrition', 'completed']
// //     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

// //     if (!isValidOperation) {
// //         return res.status(400).send({ error: 'Invalid updates!' })
// //     }

// //     try {
// //         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
// //         if (!task) {
// //             return res.status(404).send()
// //         }

// //         res.send(task)
// //     } catch (e) {
// //         res.status(400).send(e)
// //     }



// // })

// app.patch('/tasks/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

//         if (!task) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })



app.get(''  ,(req,res)=>{
    res.send('Hi')
})
app.get('/help',(req,res)=>{
    res.send('help')
})


app.listen(port, () =>{
    console.log('app is running at ' + port)
}) 
//hassing tutorial
// const bcrypt = require('bcryptjs')

// const myfuncion = async() =>{
//     const password = 'Red123435'
//     const hassed = await bcrypt.hash(password,8)
//     console.log(password)
//     console.log(hassed)


//     const ismatch = await bcrypt.compare('Red123435', hassed)
//     console.log(ismatch)
// }
// //myfuncion()

// const jwt = require('jsonwebtoken')

// const myfunction = async() => {
//     const token = jwt.sign({_id: 'asfsdf'}, 'sldkfnsdnfsdnf')
//     console.log(token)

//     const data = jwt.verify(token,'sldkfnsdnfsdnf')
//     console.log(data)
// }
//myfunction()
//task-->user
const Task = require('../src/models/task')

const main = async() =>{
    const task = await Task.findById('5dfb5fda8bcd6487e81a5999')
    
    await task.populate('owner').execPopulate()
    console.log(task.owner)
}
//main()
//user-->task
const User = require('../src/models/user')
const main1 = async() =>{
    const user = await User.findById('5dfb508c95f4e24ccc15e583')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}
//main1()

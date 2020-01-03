const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})

const user = mongoose.model('user',{
    name:{
        type: String
    },
    age:{
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('age must be a positive number')
            }
        }
     
    },
        email:{
            type:String,
            require:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('email is invalid')
                }
            }
        },
        password:{
            type: String,
            require:true,
            trim:true,
            validate(value) {
                if(value.toLowerCase().includes(value)){
                    throw new Error('password cannot contains password')
                }
            }
        }
    
})

 const me = new user({
  name: 'adityaa',
  age:24,
  email:'mike@gmail.com',
  password:'Phone@1234'
 })
 me.save().then(()=>{

 }).catch((error)=>{
    console.log('error',error)
    
 })

//  })
// const Task = mongoose.model('Tasks',{
//     description :{
//         type: String,
//         trim:true,
//         require:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })
// const task = new Task({
//     description:'clean house',
// })
// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })

//  me.save().then(()=>{
//  console.log(me)
//  }).catch((error)=>{
//      console.log(error)
//  })
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
//creating schema
const userSchema = new mongoose.Schema({
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
            unique:true,
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('email is invalid')
                }
            }
        },
        password:{
            type: String,
            required:true,
            trim:true,
            validate(value) {
                if(value.toLowerCase().includes('password')){
                    throw new Error('password cannot contains password')
                }
            }
        },
        tokens:[{
            token: {
                type:String,
                required:true
            }
        }],
        avator:{
            type:Buffer
        }
    }, {
        
            timestamps:true
    })

userSchema.virtual('tasks',{
    ref:'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

//delete the password and token when requested, hiding private data
userSchema.methods.toJSON = function() {
    const user =this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avator

    return userObject
}

userSchema.methods.generateauthtoken = async function() {
    const user = this
    
    const token = jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token



}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// userschema.statics.findByCredentials = async (email,password) =>{
//     const user = await User.findOne({email})

//     if (!user){
//         throw new Error('email not found')
//     }
//     const isMatch = await bcrypt.compare(password,user.password)

//     if(!isMatch){
//         throw new Error('password is incorrect/not found')
//     }

//     return user 
// }
// hash the password before saving
userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})

//delete user task when the user is delete

userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})

    next()
})


const User = mongoose.model('user',userSchema)



//  const me = new user({
//   name: 'aditya',
//   age:24,
//   email:'mike@gmail.com',
//   password:'Phone@123'

//  })
 module.exports = User
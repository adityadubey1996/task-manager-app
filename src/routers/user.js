const express = require('express')
const User = require('../models/user')
const multer = require('multer')
const router = new express.Router()
const auth = require('../middlewares/auth')
const sharp = require('sharp')
const {sendwelcomeemail,sendcancellationmail} = require('../email/accounts')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    const token = await user.generateauthtoken()

    try {
        await user.save()
        sendwelcomeemail(user.email, user.name)
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/users/me', auth ,async (req, res) => {
    res.send(req.user)
})

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateauthtoken()

        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})


router.post('/users/logout',auth , async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })

        await req.user.save()

        res.send()

    }
    catch (e){
        res.status(500).send()

    }
})
const upload = multer({
    limits :{
        fileSize : 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload an image'))
        }
        cb(undefined, true)
    }
})
router.post('/users/me/avator',auth ,upload.single('avator'), async(req,res) =>{
    const buffer = await sharp(req.file.buffer).resize({width: 250, height:250 }).png().toBuffer()
    
    
    req.user.avator = buffer
    await req.user.save()
    res.send()

}, (error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avator',auth ,upload.single('avator'), async(req,res) =>{
    req.user.avator = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avator', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avator){
            throw new Error()
        }
        res.set('Content-type', 'image/png')
        res.send(user.avator)
    }
    catch(e){
        res.status(404).send(e)
    }
})

router.post('/users/logoutall',auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()

    }
})


// router.post('/users/login'), async(req,res) =>{
//     try{
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         res.send(user)
//     }
//     catch (e) {
//             res.status(400).send(e)

//     }
// }


// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })



// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         //using middleware
//         const user = await User.findById(req.params.id)
//         updates.forEach((update) => user[update] = req.body[update])

//         await user.save()
        
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })


router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //using middleware
        //const user = await User.findById(req.params.id)
        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
        
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        
       

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/me', auth, async(req,res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }
        // res.send(user)
        await req.user.remove()
        sendcancellationmail(user.email,user.name)
        res.send(req.user)
    }catch(e){
        return res.status(500).send()

    }
})

// router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


module.exports = router
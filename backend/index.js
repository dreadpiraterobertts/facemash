const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser');
const User = require('./User')
const PORT = 3000
require('dotenv').config();

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB)



//storage creation
const storage = multer.diskStorage({
    destination : function(req,image,cb){
        return cb(null, "./upload/images")
    },
    filename:function (req,image,cb){
        return cb(null,`${Date.now()}${path.extname(image.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use('/images',express.static('upload/images'))

app.post('/upload', upload.single('image'), (req,res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

//add to the database
app.post('/addperson' , async (req,res)=>{

  console.log(req.body.name +" "+req.body.imageUrl+" "+req.body.rating )

  const user = new User({
    name:req.body.name,
    imageUrl:req.body.imageUrl,
    rating:req.body.rating
  })

  user.save()
  res.json({
    success:1
  })
})
//fetch two random images from the database
app.get('/getImages' , async (req,res)=>{

    let allUsers = await User.find({})
    
    //generate two random numbers
    function getRandomNumbers(min, max) {
        const num1 = Math.floor(Math.random() * (max - min + 1) + min);
        const num2 = Math.floor(Math.random() * (max - min + 1) + min);
        return [num1, num2];
      }
   
    const randoms = getRandomNumbers(0,allUsers.length-1)
    const randomUser1 = allUsers[randoms[0]]
    const randomUser2 = allUsers[randoms[1]]
    res.send({randomUser1 , randomUser2})
})

//store updated ratings of users

app.post('/update' , async(req,res)=>{
    const {personOne,personTwo} = req.body

    await User.findByIdAndUpdate(
      personOne.id,
      {rating:personOne.rating}
    )

    await User.findByIdAndUpdate(
      personTwo.id,
      {rating:personTwo.rating}
    )
    
    console.log(personOne.rating,personTwo.rating)
})
//get all people

app.get('/getPeople' ,async(req,res)=>{
  const allPeople = await User.find({})
  res.send(allPeople)
})


app.listen(PORT , ()=>console.log("server is running on " + PORT))
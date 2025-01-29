const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors({origin:"*"}))

const initializeDatabase = require('./db/db.connect')
const LaptopModel = require('./models/laptop.model')

initializeDatabase()

app.get('/', (_,res) => {
  res.send("Welcome to Laptop Server")
})

//add laptop 

app.post('/api/laptops/add', async(req,res) => {
  try {
    const newLaptop = new LaptopModel(req.body)
    const savedLaptop = await newLaptop.save()
    if (!savedLaptop)
    {
      return res.status(500).json({error:"error in saving laptop"})
    }
    res.status(201).json(savedLaptop)
  }
  catch 
  {
res.status(500).json({error:"failed to add laptop"})
  }
})

//update Laptop

app.post('/api/laptops/update/:laptopId', async (req, res) => {
  const laptopId = req.params.laptopId
  const datatoUpdate = req.body
  try {
    const updatedLaptop = await LaptopModel.findByIdAndUpdate(laptopId, datatoUpdate,{new:true})
    
    if (!updatedLaptop)
    {
return res.status(500).json({error:"error in update laptop"})
    }
    res.status(200).json(updatedLaptop)
  }
  catch {
    res.status(500).json({error:"failed to update laptop"})
  }
})

//get all laptops

app.get('/api/laptops/all',async (req,res) => {
  try {
    const allLaptops = await LaptopModel.find()
    if (!allLaptops)
    {
      return res.status(500).json({error:"error in getting laptops"})
    }
    res.status(200).json(allLaptops)
  }
  catch {
    res.status(500).json({error:"failed to get laptops"})
  }
})

//delete laptops

app.delete('/api/laptops/delete/:laptopId', async (req,res) => {
  const laptopId = req.params.laptopId
  try {
    const deletedLaptop = await LaptopModel.findByIdAndDelete(laptopId)

    if (!deletedLaptop)
    {
return res.status(500).json({error:'error in deleting laptop'})
    }
    res.status(200).json(deletedLaptop)
  }
  catch {
    res.status(500).json({error:"failed to delete laptop"})
  }
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`)
})
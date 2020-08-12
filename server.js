const express = require("express")

const server = express()

const db = require("./.github/database.js")
const { response } = require("express")
const { getUserById } = require("./.github/database.js")

server.use(express.json())

server.get("/", (req,res)=>{
    res.json({message: "Anakuqaso"})
})
server.get("/api/users", (req,res) =>{
    const users = db.getUsers()
   if(users){
    res.json(users)
   }else{
       res.status(500).json({errorMessage: "The users information could not be retrieved."})
   }
})

server.get("/api/users/:id" , (req,res) =>{
    const id = req.params.id
    const user = getUserById(id)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
})

server.post("/api/users" , (req,res) =>{
    
    if(!req.body.name || !req.body.bio){
        return response.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }else if (req.body.name && req.body.bio){
    const NewUser = db.createUser({
        name : req.body.name,
        bio: req.body.bio
    })
    res.status(201).json(NewUser)
    }else {
        res.status(500).json({
            errorMessage: "There was an error while saving the user to the database"
        })
    
    }
})

server.delete("/api/users/:id" , (req,res) => {
    const userD = db.getUserById(req.params.id)

    if(!userD){
        return res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    } else if (userD){
        db.deleteUser(userD.id)
        res.status(200).end()
    } else {
         return res.status(500).json({
            errorMessage: "User could not be removed"
        })
    }

})

server.put("/api/users/:id" , (req,res) =>{
    const user = db.getUserById(req.params.id)

    if(!user){
        return res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    } else if(!user.name || !user.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user"
        })
    } else if(user.name || user.bio){
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name,
            bio: req.body.bio || user.bio
        })
        res.status(200).json(updatedUser)
    } else {
        res.status(500).json({
            errorMessage: "The user information could not be modified."
        })
    }

})



server.listen(8080, ()=>{
    console.log("server is running on port 8080")
})
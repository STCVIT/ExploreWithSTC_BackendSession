const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    ownername: {
        type:String,
    }
   
})


const Todo = mongoose.model("Todo", todoSchema)
module.exports = Todo

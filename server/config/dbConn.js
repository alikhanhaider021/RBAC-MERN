const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://alikhanhaider021:qwertyuiop7777@cluster0.fdjvuxy.mongodb.net/?retryWrites=true&w=majority")
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
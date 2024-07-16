const mongoose=require('mongoose')

const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Database Connected Successfully!");
    })
    .catch((err) => {
        console.error("Error in Database connection!", err); 
    });
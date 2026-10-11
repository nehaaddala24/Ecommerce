const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected Successfully");
    }
    catch(err){
        console.log("DB Connection Failed");
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectDB;
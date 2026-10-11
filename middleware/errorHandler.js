module.exports=(err,req,res,next)=>{
    if(err.name==="ValidError"){
        return res.status(400).json({
            error:err.message
        });
    }
    if(err.name==="CastError"){
        return res.status(400).json({
            error:"Invalid id"
        });
    }
    console.error(err);
    res.status(500).json({
        error:"Server Error"
    })
}

module.exports = (req,res,next)=> {
    if(!req.headers['user-id']) {
        return res.status(400).json({message:"user-id required"})
    } 
        next()
   
}


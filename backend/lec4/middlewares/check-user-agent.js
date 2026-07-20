
module.exports = (req,res,next)=> {
console.log(req.headers['user-agent'])

if (req.headers["user-agent"].includes("Mobile")) {
   return res.status(403).json({
        message:" permission denied"
    })
} else {
}
next()
}
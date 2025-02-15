import jwt from 'jsonwebtoken';

//custom middleware for token based model for pages after login 
function verifyToken(req,res,next){
    if(req.headers.authorization!==undefined)
    {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"nutritrackapp",(err,data)=>{
            if(!err){
               next();
            }
            else{
                res.status(403).send({message:"Invalid token"})
            }
        })
    }
    else{
        res.send({message: "Token not sent"});
    }
   

}

export default verifyToken;


// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).send({ success: false, message: 'Invalid token.' });
//   }
// };

// export default verifyToken;
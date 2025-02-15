import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';
import trackingModel from '../models/trackingModel.js';



export const registeration = async (req,res)=>{ 
    let user = req.body;
    // userModel.create(user)
    // .then((doc)=>{ //whatever promise the user resolves, we get it using then
    //     res.status(201).send({message:"User registered"})
    // })
    // .catch((err)=>{
    //     console.log(err)
    //     res.status(500).send({message:"Error occured while registeration"})
    // })
   
        bcrypt.genSalt(10,(err,salt)=>{ //adding async here as await should be used only within async functions
            if (!err){
                bcrypt.hash(user.password,salt,async(err,hpass)=>{
                    if(!err){
                        user.password=hpass;
                        try {
                            let doc = await userModel.create(user); //waits for whatever promise that user may return and stores in doc
                            res.status(201).send({success:true, message:"User registered", data: doc })
                        }
                        catch(err){
                            if (err.code === 11000) { // Duplicate key error
                                res.status(400).send({ success:true, message: "Email already exists" });
                            } else {
                            console.log(err)
                            res.status(500).send({success:false, message:"Error occured while registeration"})
                            }
                        }
                    }
                })
            }
        })
}

//base idea: post request on the endpoint /login with user creds
//match creds with data stored in mongodb
//after login create a jwt token
export const login = async(req,res)=>{ 
    let userCred = req.body;
    try{
        const user = await userModel.findOne({email:userCred.email}) //if user is found with that email, put it in user object. if user not there, null will be returned
        if (user!=null)
        {
            bcrypt.compare(userCred.password,user.password,(err,success)=>{
                if (success==true)
                {
                    //jwt.sign({email:userCred.email},"nutritrackapp",(err,token)=>{ //token consists of 3 things - header, secret key, payload 
                    jwt.sign({ email: userCred.email, id: user._id }, "nutritrackapp", (err, token) => { 

                        if(!err){
                            res.send({message:"Login Success", token:token,userid:user._id,name:user.name})
                        }
                    })
                }
                else{
                    res.status(403).send({message:"Invalid credentials"})
                }
            })
        }
        else{
            res.status(404).send({message:"User not found"})

        }
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:"Error occured, cannot login"})
    }

}

//basic idea: GET request
export const getallFoodItems =  async(req,res)=>{
    try{
        let foods = await foodModel.find();
        res.send(foods);
    } 
    catch(err){
        console.log(err);
        res.status(500).send({message:"Error in retreiving data"})

    }
}

//basic idea: GET request
export const getFoodItembyName = async(req,res)=>{
    try{
        let foods = await foodModel.find({name:{$regex:req.params.name,$options:'i'}});
        if(foods.length!=0)
        {
            res.send(foods);
        }
        else{
            res.status(404).send({message:"Food item doesnt exist"})
        }
        
    } 
    catch(err){
        console.log(err);
        res.status(500).send({message:"Error in retreiving data"})

    }
}

export const trackfoodItem = async (req,res)=>{
    
    let trackData = req.body;
   
    try 
    {
        let data = await trackingModel.create(trackData);
        console.log(data)
        res.status(201).send({message:"Food Added"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some Problem in adding the food"})
    }
}

export const updateUserProfile = async (req, res) => {
    try {
      const { height, weight, age, activityLevel } = req.body;
      const userId = req.user.id;
  
      const user = await userModel.findByIdAndUpdate(userId, { height, weight, age, activityLevel }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

// export const profileSetup = async (req, res) => {
//     const { height, weight, age, activityLevel } = req.body;
//     console.log('Received data:', { height, weight, age, activityLevel });
//     //console.log('User ID:', req.user.id);
//     try {
//       const user = await userModel.findByIdAndUpdate(req.user.id, { height, weight, age, activityLevel, profileCompleted: true }, { new: true });
//       res.send({ success: true, message: "Profile setup successful", data: user });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ success: false, message: "Error occurred during profile setup" });
//     }
//   }

export const profileSetup = async (req, res) => {
    const { height, weight, age, activityLevel } = req.body;
    console.log('Received data:', { height, weight, age, activityLevel });
  
    // Manually parse the token and set req.user if not already set
    if (!req.user) {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, "nutritrackapp");
          req.user = decoded;
        } catch (error) {
          return res.status(400).send({ success: false, message: 'Invalid token.' });
        }
      } else {
        return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
      }
    }
  
    console.log('User ID:', req.user.id);
    try {
      const user = await userModel.findByIdAndUpdate(req.user.id, { height, weight, age, profileCompleted: true }, { new: true });
      res.send({ success: true, message: "Profile setup successful", data: user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, message: "Error occurred during profile setup" });
    }
  };
  
  
//   export const getProfile = async (req, res) => {
//     try {
//       const user = await userModel.findById(req.user.id);
//       res.send(user);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ success: false, message: "Error occurred while fetching profile" });
//     }
//   }

export const getProfile = async (req, res) => {
    // Manually parse the token and set req.user if not already set
    if (!req.user) {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, "nutritrackapp");
          req.user = decoded;
        } catch (error) {
          return res.status(400).send({ success: false, message: 'Invalid token.' });
        }
      } else {
        return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
      }
    }
  
    console.log('User ID:', req.user.id);
    try {
      const user = await userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
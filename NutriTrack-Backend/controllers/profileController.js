import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import UserProfile from "../models/userProfile.js";
import dotenv from "dotenv";
 
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "nutritrackapp";

// export const profileSetup = async (req, res) => {
//     const { height, weight, age, activityLevel } = req.body;
//     console.log('Received data:', { height, weight, age, activityLevel });
  
//     // Manually parse the token and set req.user if not already set
//     if (!req.user) {
//       const token = req.headers.authorization?.split(' ')[1];
//       if (token) {
//         try {
//           const decoded = jwt.verify(token, "nutritrackapp");
//           req.user = decoded;
//         } catch (error) {
//           return res.status(400).send({ success: false, message: 'Invalid token.' });
//         }
//       } else {
//         return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
//       }
//     }
  
//     console.log('User ID:', req.user.id);
//     try {
//       const user = await userModel.findByIdAndUpdate(req.user.id, { height, weight, age, profileCompleted: true }, { new: true });
//       res.send({ success: true, message: "Profile setup successful", data: user });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ success: false, message: "Error occurred during profile setup" });
//     }
//   };



//   export const getProfile = async (req, res) => {
//     try{
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
//         }
//         try{
//             const decoded = jwt.verify(token, JWT_SECRET);
//         }
//         catch(error){
//             return res.status(400).send({ success: false, message: 'Invalid or Expired token.' });
//         }

//         const userID = decoded;
//         console.log('User ID:', userID);
//         const user = await User.findById(userId).select("-password");  

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found." }); 
//         }
//         const userProfile = await UserProfile.findOne({ user: userId });

//         if (!userProfile) {
//             return res.status(404).json({ success: false, message: "User profile not found." });    
//         }
//         res.status(200).json({ success: true, user, userProfile });
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
    

    
    //   const token = req.headers.authorization?.split(' ')[1];
    //   if (token) {
    //     try {
    //       const decoded = jwt.verify(token, "nutritrackapp");
    //       req.user = decoded;
    //     } catch (error) {
    //       return res.status(400).send({ success: false, message: 'Invalid token.' });
    //     }
    //   } else {
    //     return res.status(401).send({ success: false, message: 'Access denied. No token provided.' });
    //   }
    // }
  
    // console.log('User ID:', req.user.id);
    // try {
    //   const user = await userModel.findById(req.user.id);
    //   if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    //   }
    //   res.status(200).json(user);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ message: 'Server error' });
    // }
//   };

export const profileSetup = async (req, res) => {
    try {
      const { name, age, gender, activityLevel, height, weight } = req.body;
      console.log("Received data:", { name, age, gender, activityLevel, height, weight });
  
      console.log("User ID:", req.user.id);
  
      let userProfile = await UserProfile.findOne({ user: req.user.id });
  
      if (userProfile) {
        userProfile.name = name;
        userProfile.age = age;
        userProfile.gender = gender;
        userProfile.activityLevel = activityLevel;
        userProfile.height = height;
        userProfile.weight = weight;
        userProfile.profileCompleted = true;
      } else {
        userProfile = new UserProfile({
          user: req.user.id,
          name,
          age,
          gender,
          activityLevel,
          height,
          weight,
          profileCompleted: true,
        });
      }
  
      await userProfile.save();
      await User.findByIdAndUpdate(user, { profileCompleted: true });

  
      res.status(200).json({
        success: true,
        message: "Profile setup successful",
        userProfile,
      });
    } catch (error) {
      console.error("Error in profile setup:", error);
      res.status(500).json({
        success: false,
        message: "Error occurred during profile setup",
      });
    }
  };


export const getProfile = async (req, res) => {
    try {
      console.log("Fetching Profile for User ID:", req.user.id);
  
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      const userProfile = await UserProfile.findOne({ user: req.user.id });
      if (!userProfile) {
        return res.status(404).json({ success: false, message: "User profile not found." });
      }
  
      res.status(200).json({ success: true, user, userProfile });
    } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ success: false, message: "Server error." });
    }
  };
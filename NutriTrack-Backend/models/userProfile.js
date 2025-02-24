import mongoose from "mongoose";

// const UserProfileSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links to User
//   name: { type: String, required: true },
//   age: { type: Number },
//   gender: { type: String },
//   fitnessGoals: { type: String },
//   height: {type: Number},
//   weight: {type: Number},
// });




const UserProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Links to User
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  activityLevel: { type: String },
  height: { type: Number },
  weight: { type: Number },
  profileCompleted: { type: Boolean, default: false },
});
 
//const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
const UserProfile = mongoose.models.UserProfile || mongoose.model('UserProfile', UserProfileSchema);

export default UserProfile;
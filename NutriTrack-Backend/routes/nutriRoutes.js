import express from "express";
import verifyToken from '../verifyToken.js';
import {registeration} from "../controllers/nutriControllers.js";
import {login} from "../controllers/nutriControllers.js";
import {getallFoodItems } from "../controllers/nutriControllers.js";
import { getFoodItembyName } from "../controllers/nutriControllers.js";
import { trackfoodItem } from "../controllers/nutriControllers.js";
import { getNutrientHistory } from "../controllers/histController.js";

const router = express.Router();


//endpoint creation for registeration
router.post("/register",registeration)

//endpoint creation for login
router.post("/login", login)

//endpoint to fetch food data 
router.get("/foods",verifyToken,getallFoodItems)

//endpoint to search food by name through URL
router.get("/foods/:name",verifyToken,getFoodItembyName)

// endpoint to track a food 
router.post("/track",verifyToken,trackfoodItem)

// Historical Weekly/Monthly View APIs

//endpoint to get history of food items
// Param: timeAgg (week/month)
router.get("/history",getNutrientHistory);

export default router;

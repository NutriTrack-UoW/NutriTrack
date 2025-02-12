import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';
import trackingModel from '../models/trackingModel.js';

import mongoose from "mongoose";


// Controller to get aggregate nutrient history of the user
export const getNutrientHistory = async (req, res) => {
    try {
        const timeAgg = req.query.timeAgg || 'month'; // Default to 'monthly' if not provided
        const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : null;

        const matchStage = {
            userId: new mongoose.Types.ObjectId('67a64dc0ee7a29f5fb571ba8')
        };

        if (startDate) {
            matchStage.eatenDateObj = { $gte: startDate };
        }

        if (endDate) {
            matchStage.eatenDateObj = matchStage.eatenDateObj || {};
            matchStage.eatenDateObj.$lte = endDate;
        }

        // Aggregate function to get the total calories, protein, fat, fiber, and carbohydrates consumed by the user in a month
        const trackings = await trackingModel.aggregate([
            {
                $addFields: {
                    eatenDateObj: { $dateFromString: { dateString: "$eatenDate" } }
                }
            },
            {
                $match: matchStage
            },
            {
                $lookup: {
                    from: 'foods',
                    localField: 'foodId',
                    foreignField: '_id',
                    as: 'foodDetails'
                }
            },
            {
                $unwind: '$foodDetails'
            },
            {
                $addFields: {
                    aggTime: { $dateTrunc: { date: "$eatenDateObj" , unit: timeAgg } }
                }
            },
            {
                $group: {
                    _id: "$aggTime",
                    totalCalories: {
                        $sum: {
                            $multiply: ["$quantity", "$foodDetails.calories"]
                        }
                    },
                    totalProtein: {
                        $sum: {
                            $multiply: ["$quantity", "$foodDetails.protein"]
                        }
                    },
                    totalFat: {
                        $sum: {
                            $multiply: ["$quantity", "$foodDetails.fat"]
                        }
                    },
                    totalFiber: {
                        $sum: {
                            $multiply: ["$quantity", "$foodDetails.fiber"]
                        }
                    },
                    totalCarbohydrate: {
                        $sum: {
                            $multiply: ["$quantity", "$foodDetails.carbohydrates"]
                        }
                    }
                }
            },
            {
                $sort: { _id: 1 } // Sort by eatenDateObj in ascending order
            },
            {
                $project: {
                    _id: 0,
                    aggTime: "$_id",
                    totalCalories: 1,
                    totalFiber: 1,
                    totalProtein: 1,
                    totalFat: 1,
                    totalCarbohydrate: 1,
                    timeAgg: timeAgg
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            results: trackings.length,
            data: {
                trackings
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
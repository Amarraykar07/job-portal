import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs); //admin ke liye bhi same route hai qki admin bhi jobs dekh sakta hai
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router; 
//ab iss router ko index.js me import krna hai mtlb vaha bhenjana hai
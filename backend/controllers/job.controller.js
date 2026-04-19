import { Job } from "../models/job.model.js";

//admin can post job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location,jobType, experience, position, companyId } = req.body;
        const userId = req.id; // Assuming user ID is available in req.id
        if(!title || !description || !requirements || !companyId || !location || !salary || !jobType || !experience || !position){
            return res.status(400).json({ 
                message: "All fields are required", 
                success: false 
            })
        };
     const job = await Job.create({
                title,
                description,
                requirements: requirements.split(","),
                company: companyId,
                location,
                salary: Number(salary),
                jobType,
                experienceLevel: experience,
                position,
                created_by:userId 
            });
            return res.status(201).json({ 
                message: "Job created successfully", 
                job, 
                success: true 
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create job" });
    }
}
//for students and users to view all jobs
export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || ""; // Get the keyword from query parameters or default to an empty string mtlab hum filter kr rhe hai job ko title ke basis pe
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } }, // Case-insensitive regex search
                {description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({  //hum populate use kar rhe hai qki hume company ka naam bhi chahiye job ke sath
            path:"company",      //jo field hum populate karna chahte hai
            select:"name"       //jo field hume chahiye company me se
        }).sort({ createdAt: -1 }); //newest job pehle show hoga
        if(!jobs || jobs.length === 0){
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
    }
}
//students 
export const getJobById = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"company",
            select:"name"
        });
        if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
        }
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        
    }
}
// admin kitane job create kiya hai abhi tak
export const getAdminJobs = async (req,res) => {
    try {
        const adminId = req.id; // Assuming admin ID is available in req.id
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:"company",
            select:"name"
        });
        if(!jobs || jobs.length === 0){
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to retrieve admin jobs" });
    }
}
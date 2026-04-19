import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req,res) => {
    try {
        const userId = req.id; // Assuming user ID is available in req.id
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job ID is required",
                success:false
            })
        };
        //check if user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success:false
            });
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success:false
            });
        }
        //create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job application submitted successfully",
            application: newApplication,
            success:true
        }); 
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } }, // Sort jobs by creation date in descending order
            //nested populate to get company name in job details
            populate: {
                path: "company"
            }
        });
        if(!applications || applications.length === 0){
            return res.status(404).json({
                message: "No applied jobs found",
                success:false
            });
        }
        return res.status(200).json({
            applications,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};
// admin and company can view all applications for a job
//mtalb admin aur company dono dekh sakte hai ki kisne job ke liye apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success:false
            });
        }
        return res.status(200).json({
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};
//admin and company can update application status
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Status is required",
                success:false
            });
        }
        //find application by applicationId
        const application = await Application.findById({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                success:false
            });
        }
        //update application status
        application.status = status;
        await application.save();
        return res.status(200).json({
            message: "Application status updated successfully",
            success:true
        });
    } catch (error) {
        console.log(error);
    }
};
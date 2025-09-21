import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
//for admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
     
    const userId = req.id;
   

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

//For student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    //Filter
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    // const query = {
    //   $or:[
        
    //       {title:{$regex:keyword,$options:"i"}},
    //       {description:{$regex:keyword,$options:"i"}}
        
    //   ],
    // }

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(400).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobs = await Job.findById(jobId).populate({
      path:"applications"
    });
    if (!jobs) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//how many job created by admin till now
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate(
      {
        path:'company',
        createdAt:-1
      }
    );
    if (!jobs) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

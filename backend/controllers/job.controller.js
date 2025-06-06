import { Job } from "../models/job.model.js";

// Recruiter creates a job
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
      quiz, // New field
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
      !companyId ||
      !quiz ||
      !Array.isArray(quiz) ||
      quiz.length !== 3
    ) {
      return res.status(400).json({
        message: "Missing required fields or invalid quiz data.",
        success: false,
      });
    }

    // Validate each quiz question
    for (const q of quiz) {
      if (
        !q.question ||
        !q.options ||
        !Array.isArray(q.options) ||
        q.options.length < 2
      ) {
        return res.status(400).json({
          message:
            "Each quiz must have a question, at least 2 options, and a correct answer.",
          success: false,
        });
      }
    }

    const job = await Job.create({
      title,
      description,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
      quiz,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// Recruiter updates a job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
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
      quiz, // New field
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !companyId ||
      !quiz ||
      !Array.isArray(quiz) ||
      quiz.length !== 3
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields or invalid quiz data.",
      });
    }

    for (const q of quiz) {
      if (
        !q.question ||
        !q.options ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        typeof q.answer !== "string"
      ) {
        return res.status(400).json({
          message:
            "Each quiz must have a question, at least 2 options, and a correct answer.",
          success: false,
        });
      }
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        requirements: Array.isArray(requirements)
          ? requirements
          : requirements.split(",").map((r) => r.trim()),
        salary,
        location,
        jobType,
        experienceLevel: experience,
        position,
        company: companyId,
        quiz,
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// All other methods unchanged
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
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
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
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

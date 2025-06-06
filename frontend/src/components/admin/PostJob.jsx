import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
    quiz: [
      { question: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
      { question: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
      { question: "", options: ["", "", "", ""], correctAnswerIndex: 0 },
    ],
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const { jobId } = useParams();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id || "" });
  };

  const getSelectedCompanyName = () => {
    const company = companies.find((c) => c._id === input.companyId);
    return company ? company.name.toLowerCase() : "";
  };

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        const job = res.data.job;
        setInput({
          title: job.title || "",
          description: job.description || "",
          requirements: job.requirements?.join(", ") || "",
          salary: job.salary || "",
          location: job.location || "",
          jobType: job.jobType || "",
          experience: job.experienceLevel || "",
          position: job.position || 0,
          companyId: job.company?._id || "",
          quiz: job.quiz || input.quiz,
        });
      } catch (error) {
        toast.error("Failed to fetch job details");
      }
    };
    fetchJob();
  }, [jobId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const isQuizValid = input.quiz.every(
      (q) =>
        q.question.trim() !== "" &&
        q.options.every((opt) => opt.trim() !== "") &&
        q.correctAnswerIndex >= 0 &&
        q.correctAnswerIndex <= 3
    );

    if (!isQuizValid) {
      toast.error("Please fill all quiz questions and options correctly.");
      return;
    }

    try {
      setLoading(true);
      const url = jobId
        ? `${JOB_API_END_POINT}/update/${jobId}`
        : `${JOB_API_END_POINT}/post`;
      const method = jobId ? "put" : "post";

      const payload = {
        ...input,
        requirements: input.requirements.split(",").map((r) => r.trim()),
      };

      const res = await axios[method](url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            {jobId ? "Edit Job" : "Post New Job"}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {/* Basic Fields */}
            <Label>Title</Label>
            <Input
              name="title"
              value={input.title}
              onChange={changeEventHandler}
            />

            <Label>Description</Label>
            <Input
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />

            <Label>Requirements (comma-separated)</Label>
            <Input
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
            />

            <Label>Salary</Label>
            <Input
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
            />

            <Label>Location</Label>
            <Input
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />

            <Label>Job Type</Label>
            <Input
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
            />

            <Label>Experience Level</Label>
            <Input
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
            />

            <Label>No of Positions</Label>
            <Input
              type="number"
              name="position"
              value={input.position}
              onChange={changeEventHandler}
            />

            {/* Company Select */}
            {companies.length > 0 && (
              <div>
                <Label>Select Company</Label>
                <Select
                  onValueChange={selectChangeHandler}
                  value={getSelectedCompanyName()}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Quiz Section */}
          <div className="col-span-2 mt-4">
            <h3 className="text-xl font-semibold mb-2">
              Quiz Questions (3 Required)
            </h3>
            {input.quiz.map((q, index) => (
              <div key={index} className="border p-3 mb-3 rounded-md">
                <Label>Question {index + 1}</Label>
                <Input
                  type="text"
                  className="my-1"
                  value={q.question}
                  onChange={(e) => {
                    const quizCopy = [...input.quiz];
                    quizCopy[index].question = e.target.value;
                    setInput({ ...input, quiz: quizCopy });
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex}>
                      <Label>Option {optIndex + 1}</Label>
                      <Input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const quizCopy = [...input.quiz];
                          quizCopy[index].options[optIndex] = e.target.value;
                          setInput({ ...input, quiz: quizCopy });
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label>Correct Option (Index: 0-3)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="3"
                    value={q.correctAnswerIndex}
                    onChange={(e) => {
                      const quizCopy = [...input.quiz];
                      quizCopy[index].correctAnswerIndex = parseInt(
                        e.target.value
                      );
                      setInput({ ...input, quiz: quizCopy });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              {jobId ? "Update Job" : "Post New Job"}
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;

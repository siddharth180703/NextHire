import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);
  const [answers, setAnswers] = useState(Array(3).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [error, setError] = useState("");

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // ✅ Refetch job from backend
  const fetchSingleJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
      }
    } catch (error) {
      console.log("Error fetching job:", error);
    }
  };

  // ✅ Run on mount
  useEffect(() => {
    fetchSingleJob();
  }, [jobId, dispatch]);

  // ✅ Update isApplied state on job or user change
  useEffect(() => {
    if (singleJob && user?._id) {
      const applied = singleJob?.applications?.some(
        (application) =>
          application.applicant?.toString() === user._id?.toString()
      );
      setIsApplied(applied);
    } else {
      setIsApplied(false);
    }
  }, [singleJob, user?._id]);

  useEffect(() => {
    setQuizSubmitted(false); // reset on job change
    setAnswers(Array(3).fill(null));
    setError("");
  }, [jobId]);

  const handleSelect = (qIndex, optIndex) => {
    const newAns = [...answers];
    newAns[qIndex] = optIndex;
    setAnswers(newAns);
  };

  const submitQuizHandler = async () => {
    if (answers.includes(null)) {
      setError("Please answer all questions.");
      return;
    }

    const correct = singleJob.quiz.reduce((count, q, i) => {
      return count + (answers[i] === q.correctAnswerIndex ? 1 : 0);
    }, 0);

    const quizPassed = correct >= 2;
    if (!quizPassed) {
      toast.error("You need to answer at least 2 correctly to apply.");
      return;
    }

    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { quizPassed },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);
        setQuizSubmitted(true);

        // ✅ Refetch job to get updated applications
        fetchSingleJob();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>

        {!isApplied && !quizSubmitted && singleJob?.quiz?.length === 3 && (
          <Button
            onClick={() => setQuizSubmitted(true)}
            className="rounded-lg bg-[#7209b7] hover:bg-[#5f32ad]"
          >
            Start Quiz
          </Button>
        )}

        {isApplied && (
          <Button
            disabled
            className="rounded-lg bg-gray-600 cursor-not-allowed"
          >
            Already Applied
          </Button>
        )}
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </h1>
      </div>

      {quizSubmitted && !isApplied && singleJob?.quiz?.length === 3 && (
        <div className="bg-white p-4 rounded shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">Quiz</h2>
          {singleJob.quiz.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium">
                {i + 1}. {q.question}
              </p>
              {q.options.map((opt, j) => (
                <div key={j}>
                  <label>
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={j}
                      checked={answers[i] === j}
                      onChange={() => handleSelect(i, j)}
                    />{" "}
                    {opt}
                  </label>
                </div>
              ))}
            </div>
          ))}
          {error && <p className="text-red-500">{error}</p>}
          <Button
            onClick={submitQuizHandler}
            className="mt-4 bg-blue-600 text-white"
          >
            Submit Quiz & Apply
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobDescription;

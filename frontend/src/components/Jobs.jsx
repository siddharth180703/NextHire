import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery, min, max } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    let filtered = allJobs;

    // Apply searchedQuery filter (location, title, description)
    if (searchedQuery) {
      const lowerQuery = searchedQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(lowerQuery) ||
          job.description.toLowerCase().includes(lowerQuery) ||
          job.location.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply salary filter
    filtered = filtered.filter((job) => {
      const jobSalary = job.salary || 0;
      return jobSalary >= min && jobSalary <= max;
    });

    setFilterJobs(filtered);
  }, [allJobs, searchedQuery, min, max]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-1/4 w-full">
            <FilterCard />
          </aside>

          {/* Job Listing */}
          <main className="flex-1 h-[85vh] overflow-y-auto custom-scroll pb-6 pr-1">
            {filterJobs.length <= 0 ? (
              <div className="text-center text-lg font-semibold mt-10 text-red-500">
                🚫 No jobs found matching your criteria.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                    className="rounded-xl shadow-md bg-white dark:bg-gray-800 p-4"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

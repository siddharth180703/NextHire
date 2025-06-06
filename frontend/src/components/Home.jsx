import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") navigate("/admin/companies");
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Text Content */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
            >
              Land Your{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Dream Job
              </span>{" "}
              Today
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              Connect with top employers and explore opportunities that match
              your skills. Discover openings from startups to global companies.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/jobs")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Browse Jobs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/signup")}
                className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition"
              >
                Post a Job
              </motion.button>
            </div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <img
              src="https://img.freepik.com/free-vector/job-portal-concept-illustration_114360-796.jpg"
              alt="Job Portal Illustration"
              className="w-full h-auto object-contain rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-900 py-14">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Platform Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: "💼", label: "Active Jobs", value: "12K+" },
              { icon: "🏢", label: "Top Companies", value: "6K+" },
              { icon: "👥", label: "Candidates", value: "2M+" },
              { icon: "🎯", label: "Placement Rate", value: "98%" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                  {item.value}
                </p>
                <p className="text-gray-600 dark:text-gray-300">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-14 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-10 tracking-tight">
            🔍 Explore Opportunities by Category
          </h2>
          <CategoryCarousel />
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
            🆕 Latest Openings
          </h2>
          <LatestJobs />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

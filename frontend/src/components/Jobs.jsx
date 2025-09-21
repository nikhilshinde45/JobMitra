import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Jobs = () => {
  useGetAllJobs();
  const { alljobs = [], searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(alljobs);

  useEffect(() => {
    if (!searchedQuery) {
      setFilterJobs(alljobs);
      return;
    }

    let filteredJobs = [];

    if (searchedQuery.type === "industry") {
      filteredJobs = alljobs.filter((job) =>
        job.title.toLowerCase().includes(searchedQuery.value.toLowerCase())
      );
    }

    if (searchedQuery.type === "location") {
      filteredJobs = alljobs.filter((job) =>
        job.location.toLowerCase().includes(searchedQuery.value.toLowerCase())
      );
    }

    setFilterJobs(filteredJobs);
  }, [alljobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-5 max-w-7xl">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>

          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;

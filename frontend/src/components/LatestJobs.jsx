import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";




const LatestJobs = () => {
  const {alljobs=[]} = useSelector(store=>store.job)
  return (
    <div className="mx-auto my-20 max-w-7xl">
      <h1 className="text-4xl font-bold ">
        Latest & Top <span className="text-[#6A38C2]">Job Openings</span>
      </h1>
      {/*Put jobs in x-axis manner*/}
      <div className="grid grid-cols-3 gap-4 my-5">
        {
          /* multiple job cards display  0 to 6 jobs */

          alljobs.length<=0?<span>No Job Availabel</span>:alljobs.slice(0,6).map((job) => (
            <LatestJobCards  key={job._id} job={job} />
          ))
        }
      </div>
    </div>
  );
};

export default LatestJobs;

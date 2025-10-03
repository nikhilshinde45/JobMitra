import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useEffect } from "react";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { toast } from "sonner";
const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
//  console.log(jobId);
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
//This is used only once at the very beginning when the component mounts.
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  //This runs whenever singleJob.applications or user._id changes.
  useEffect(() => {
    const initiallyApplied =
      singleJob?.applications?.some(
        (application) => application.applicant === user?._id
      ) || false;
    setIsApplied(initiallyApplied);
  }, [singleJob?.applications, user?._id]);

  const appliHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      // console.log(res.data);
      if (res.data.success) {
        setIsApplied(true); //update the locals tate
        //duplicating and making changes needed
        //Creates an updated version of singleJob, adding this user to the applications list.
        
        const updateSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user._id },
          ],
        };
        //
        dispatch(setSingleJob(updateSingleJob)); //heps us to real time ui update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
//this runs first
  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
         headers:{
              Authorization: `Bearer ${token}`
         }
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.jobs));
          setIsApplied(
            res.data.jobs?.applications?.some(
              (application) => application.applicant === user?._id
            )
          ); //ensure the state is synced with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl p-8 mx-auto my-10 bg-white border border-gray-200 shadow-lg rounded-xl">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {singleJob?.title}
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <Badge className="!text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-lg shadow-sm">
                {singleJob?.position}
              </Badge>
              <Badge className="!text-[#F83002] font-semibold bg-red-100 px-3 py-1 rounded-lg shadow-sm">
                {singleJob?.jobType}
              </Badge>
              <Badge className="!text-[#7209b7] font-semibold bg-purple-100 px-3 py-1 rounded-lg shadow-sm">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : appliHandler}
            disabled={isApplied}
            className={`px-6 py-2 text-lg font-semibold rounded-lg transition duration-300 shadow-md ${
              isApplied
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
            }`}
          >
            {!isApplied ? "Apply Now" : "Already Applied"}
          </Button>
        </div>

        {/* Job Description Section */}
        <h1 className="py-4 mt-6 text-xl font-semibold text-gray-900 border-b border-gray-300">
          Job Description
        </h1>

        <div className="mt-4 space-y-3 leading-relaxed text-gray-800">
          <p className="text-lg font-semibold">
            Role:{" "}
            <span className="font-normal text-gray-600">
              {singleJob?.title}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Location:{" "}
            <span className="font-normal text-gray-600">
              {singleJob?.location}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Description:{" "}
            <span className="font-normal text-gray-600">
              {singleJob?.description}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Experience:{" "}
            <span className="font-normal text-gray-600">
              {singleJob?.experienceLevel}   yrs
            </span>
          </p>
          <p className="text-lg font-semibold">
            Salary:{" "}
            <span className="font-normal text-gray-600">
              {singleJob?.salary} LPA
            </span>
          </p>
          <p className="text-lg font-semibold">
            Total Applicants:{" "}
            <span className="font-normal text-gray-600">
              {singleJob?.applications?.length}
            </span>
          </p>
          <p className="text-lg font-semibold">
            Posted Date:
            <span className="font-normal text-gray-600">
              {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;

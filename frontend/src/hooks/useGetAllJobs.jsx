import { setAllJobs } from "../redux/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JOB_API_END_POINT } from "../utils/constant";
import axios from "axios";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found, user not authenticated");
          return;
        }

        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(
            searchedQuery ?? ""
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.log("No jobs found or request failed:", res.data);
        }
      } catch (error) {
        console.log(
          "fetchAllJobs error:",
          error.response?.data || error.message
        );
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;

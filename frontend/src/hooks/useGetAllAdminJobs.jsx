import { setAllAdminJobs } from "../redux/jobSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "../utils/constant";
import axios from "axios";
const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found, user not authenticated");
          return;
        }
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;

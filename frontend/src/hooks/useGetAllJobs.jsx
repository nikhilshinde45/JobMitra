import { setAllJobs } from '../redux/jobSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_API_END_POINT } from '../utils/constant';
import axios from 'axios';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${encodeURIComponent(searchedQuery ?? "")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
              "Content-Type": "application/json"
            }
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("fetchAllJobs error:", error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;

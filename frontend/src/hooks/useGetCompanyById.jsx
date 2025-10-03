import { setAllJobs } from "../redux/jobSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { setSingleCompany } from "../redux/companySlice";
const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found, user not authenticated");
          return;
        }
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useGetCompanyById;

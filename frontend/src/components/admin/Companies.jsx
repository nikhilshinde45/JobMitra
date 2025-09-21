import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-6xl p-6 mx-auto my-10 bg-white shadow-xl rounded-2xl">
        <div className="flex flex-col items-center justify-between gap-4 my-5 md:flex-row">
          {/* Search Box */}
          <Input
            className="w-full transition-all duration-300 border border-gray-300 shadow-sm md:w-1/3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="🔍 Search companies by name..."
            onChange={(e) => setInput(e.target.value)}
          />

          {/* New Company Button */}
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="font-semibold text-white transition-all duration-300 shadow-md rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            ➕ New Company
          </Button>
        </div>

        {/* Table */}
        <div className="mt-8">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;

import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import axios from "axios";
import { motion } from "framer-motion";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompnayName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl p-10 mx-auto mt-16 bg-white border border-gray-200 shadow-xl rounded-2xl"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Create Your Company 🚀
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Give your company a name to get started.  
            <span className="block">Don’t worry, you can change it later.</span>
          </p>
        </div>

        {/* Input */}
        <div className="mb-8">
          <Label className="text-base font-semibold text-gray-700">
            Company Name
          </Label>
          <Input
            type="text"
            className="px-4 py-3 mt-3 text-lg transition-all duration-200 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
            placeholder="e.g. JobHunt, Microsoft..."
            value={companyName}
            onChange={(e) => setCompnayName(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <Button
            variant="outline"
            className="px-6 py-3 text-base transition-all duration-200 rounded-xl hover:bg-gray-100"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="px-6 py-3 text-base text-white transition-all duration-200 shadow-md rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
            onClick={registerNewCompany}
          >
            Continue →
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyCreate;

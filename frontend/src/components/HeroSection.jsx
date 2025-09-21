import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler = ()=>{
    const trimmed = query.trim();
    if (!trimmed) return; // avoid empty search
    dispatch(setSearchedQuery(trimmed));
    navigate("/browse");
  }
  return (
    <div className="px-4 py-12 text-center">
      {/* Tagline */}
      <div className="flex flex-col gap-6 my-10">
        <span className="mx-auto px-5 py-2 bg-gray-100 rounded-full text-[#F83002] font-medium text-sm">
          Connecting Talent With Opportunity
        </span>

        {/* Main Heading */}
        <h1 className="text-4xl font-bold leading-snug md:text-5xl">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Your career growth starts with a single search — one step today can
          open doors to endless opportunities tomorrow!
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-xl gap-3 py-2 pl-5 pr-2 mx-auto border border-gray-200 rounded-full shadow-lg">
        <input
          type="text"
          placeholder="Find your dream jobs"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="w-full text-base text-gray-700 bg-transparent border-none outline-none"
        />
        <Button onClick={searchJobHandler} className="rounded-full px-5 py-2 bg-[#6A38C2] hover:bg-[#5a2fa5] transition">
          <Search className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;

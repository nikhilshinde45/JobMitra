import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "Python Developer",
      "Data Scientist",
    ],
  },
];

const FilterCard = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedIndustry) {
      dispatch(setSearchedQuery({ type: "industry", value: selectedIndustry }));
    }
  }, [selectedIndustry]);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(setSearchedQuery({ type: "location", value: selectedLocation }));
    }
  }, [selectedLocation]);

  return (
    <div className="w-full p-3 bg-white rounded-md">
      <h1 className="text-lg font-bold">Filter Jobs</h1>
      <hr className="mt-3" />

      {/* Industry */}
      <h1 className="mt-3 text-lg font-bold">Industry</h1>
      <RadioGroup value={selectedIndustry} onValueChange={setSelectedIndustry}>
        {filterData[1].array.map((item, idx) => {
          const id = `industry-${idx}`;
          return (
            <div key={id} className="flex items-center my-2 space-x-2">
              <RadioGroupItem id={id} value={item} />
              <Label htmlFor={id}>{item}</Label>
            </div>
          );
        })}
      </RadioGroup>

      {/* Location */}
      <h1 className="mt-3 text-lg font-bold">Location</h1>
      <RadioGroup value={selectedLocation} onValueChange={setSelectedLocation}>
        {filterData[0].array.map((item, idx) => {
          const id = `location-${idx}`;
          return (
            <div key={id} className="flex items-center my-2 space-x-2">
              <RadioGroupItem id={id} value={item} />
              <Label htmlFor={id}>{item}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;

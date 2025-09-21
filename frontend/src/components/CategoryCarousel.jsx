import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Fullstack Developer",
  "Tester",
  "Consultant",
];

const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
   const searchJobHandler = (query)=>{
      dispatch(setSearchedQuery(query));
      navigate("/browse")
    }
    
  return (
    <div className="px-6 my-20">
      {/* Heading */}
      <h2 className="mb-10 text-3xl font-bold text-center">
        Explore by <span className="text-[#6A38C2]">Categories</span>
      </h2>

      {/* Carousel */}
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="flex gap-6">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center md:basis-1/2 lg:basis-1/3"
            >
              <Button onClick={()=>searchJobHandler(cat)}
                variant="outline"
                className="rounded-full px-6 py-3 text-lg font-medium shadow-md border-gray-300 hover:bg-[#6A38C2] hover:text-white transition-all duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Controls */}
        <CarouselPrevious className="absolute -translate-y-1/2 bg-white shadow-md -left-12 top-1/2 hover:bg-gray-100" />
        <CarouselNext className="absolute -translate-y-1/2 bg-white shadow-md -right-12 top-1/2 hover:bg-gray-100" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

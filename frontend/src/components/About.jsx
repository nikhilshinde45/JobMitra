// src/pages/About.js
import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
 // import your Footer

const About = () => {
  return (
    <>
      <Navbar />

      {/* Vision & Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="grid items-center max-w-6xl gap-12 px-6 mx-auto md:grid-cols-2">
          {/* Vision */}
          <div className="p-8 transition-shadow duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
            <h2 className="text-3xl font-bold text-[#6A38C2] mb-4">Our Vision</h2>
            <p className="leading-relaxed text-gray-600">
              At JobMitrs, our vision is to help companies minimize hiring costs while 
              ensuring a smooth end-to-end recruitment process. We aim to free businesses 
              from recruitment hassles so they can focus on growth and innovation.
            </p>
          </div>

          {/* Mission */}
          <div className="p-8 transition-shadow duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl">
            <h2 className="text-3xl font-bold text-[#6A38C2] mb-4">Our Mission</h2>
            <p className="leading-relaxed text-gray-600">
              Our mission is to empower job seekers in their career growth by connecting 
              them with the best opportunities. We value the importance of a well-paying 
              job and strive to make the job search process simple, effective, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="max-w-6xl px-6 py-16 mx-auto text-gray-800">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-bold text-[#0F172A] mb-6">About JobMitra</h1>
            <p className="mb-4 text-lg leading-relaxed">
             This website was created with the aim of connecting people to better opportunities and helping organizations find the talent they need. It’s built to make the hiring process simpler and the job search more effective, reducing the gap between candidates and employers. By focusing on ease of use and accessibility, the platform strives to support both career growth for individuals and success for businesses!
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://imgs.search.brave.com/98WnFgEHng9ZrUvT9Lf9f0FAFlDAQzlnxIyMkVvxEnA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9qb2It/c2VhcmNoLWh1bWFu/LXJlc291cmNlcy1y/ZWNydWl0bWVudC1j/YXJlZXItYnVzaW5l/c3MtaW50ZXJuZXQt/dGVjaG5vbG9neS1j/b25jZXB0LWpvYi1z/ZWFyY2gtaHVtYW4t/cmVzb3VyY2VzLXJl/Y3J1aXRtZW50LWNh/cmVlci0xMDEzMzA2/ODkuanBn"
              alt="About JobMitrs"
              className="shadow-lg rounded-2xl"
            />
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default About;

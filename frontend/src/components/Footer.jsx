import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram, ChevronDown } from "lucide-react";

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How do I search for jobs on JobPortal?",
      a: "Use our search bar and filters to browse active job listings by location, category, experience, or skills."
    },
    {
      q: "What information do I need to apply for jobs?",
      a: "Make sure your resume is updated and tailored to each job, and prepare a cover letter if required."
    },
    {
      q: "Can I track my job applications?",
      a: "Yes! Log in to your dashboard to see all applications, their submission dates, and current status."
    },
    {
      q: "How do I know if a job listing is legitimate?",
      a: "We review job postings for authenticity, but always research companies and avoid sharing sensitive data."
    },
    {
      q: "Are there tips for creating a strong resume?",
      a: "Highlight relevant skills and achievements, use professional formatting, and tailor each resume."
    },
    {
      q: "What should I do if I don't hear back after applying?",
      a: "Follow up after a week via email if contact details are available, and continue applying to more roles."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-gray-300 py-12 mt-20">
      {/* Top Section */}
      <div className="flex flex-col items-center justify-between gap-8 px-6 mx-auto max-w-7xl md:flex-row">
        <h2 className="text-2xl font-extrabold tracking-wide text-white">
          Job<span className="text-[#6A38C2]">Mitra</span>
        </h2>

        <ul className="flex flex-wrap justify-center gap-8 text-sm font-medium">
          <li><a href="/jobs" className="hover:text-[#6A38C2] transition-colors">Find Jobs</a></li>
          <li><a href="/admin/jobs" className="hover:text-[#6A38C2] transition-colors">Post a Job</a></li>
          <li><a href="/about" className="hover:text-[#6A38C2] transition-colors">About Us</a></li>
        </ul>

        <div className="flex space-x-4">
          <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-[#6A38C2] transition-all duration-300 transform hover:scale-110">
            <Facebook size={18} />
          </a>
          <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-[#6A38C2] transition-all duration-300 transform hover:scale-110">
            <Twitter size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/in/nikhil-shinde1740" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-gray-700 rounded-full hover:bg-[#6A38C2] transition-all duration-300 transform hover:scale-110"
          >
            <Linkedin size={18} />
          </a>
          <a href="#" className="p-2 bg-gray-700 rounded-full hover:bg-[#6A38C2] transition-all duration-300 transform hover:scale-110">
            <Instagram size={18} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="w-11/12 mx-auto my-10 border-t border-gray-700"></div>

      {/* Reach Us Section */}
      <section className="w-full max-w-4xl px-4 mx-auto mb-12 text-center">
        <h3 className="mb-4 text-xl font-semibold text-white">Reach Us</h3>
        <p className="text-sm text-gray-400">📧 Email: <a href="mailto:nikhilshinde26448@gmail.com" className="hover:text-[#6A38C2]">nikhilshinde26448@gmail.com</a></p>
        <p className="text-sm text-gray-400">📱 Mobile: <a href="tel:8823145580" className="hover:text-[#6A38C2]">8823145580</a></p>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl px-4 mx-auto">
        <h3 className="mb-6 text-2xl font-semibold text-center text-white">
          Frequently Asked <span className="text-[#6A38C2]">Questions</span>
        </h3>
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-[#1E293B] rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left text-white font-medium hover:bg-[#27364a] transition-colors"
              >
                {item.q}
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-[#6A38C2]" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-4 text-sm text-gray-400 border-t border-gray-700">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="mt-12 text-xs text-center text-gray-500">
        © {new Date().getFullYear()} JobMitra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

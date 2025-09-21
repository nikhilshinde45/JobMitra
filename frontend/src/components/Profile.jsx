import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useState } from "react";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
//import store from "../redux/store";


// const skills = ["Html", "Css", "Javascript", "Reactjs"];
const Profile = () => {
  useGetAppliedJobs();
  const isResume = true;
  const [open,setOpen] = useState(false);
  const {user}= useSelector(store=>store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Navbar */}
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl p-8 mx-auto my-10 bg-white shadow-lg rounded-2xl">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <Avatar className="shadow-md  w-28 h-28">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user?.fullname}</h1>
              <p className="max-w-md mt-2 text-sm leading-relaxed text-gray-600">
              { user?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)}
            className="rounded-full shadow-sm"
            variant="outline"
            size="icon"
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="grid gap-3 my-6 sm:grid-cols-2">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-indigo-500" />
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="text-indigo-500" />
            <span className="font-medium">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1 text-indigo-700 transition-all bg-indigo-100 rounded-full hover:bg-indigo-200"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-6">
          <Label className="font-bold text-gray-800 text-md">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="block mt-2 font-medium text-indigo-600 hover:underline"
            >
              {user?.profile?.resumeOriginalName }
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl p-8 mx-auto mt-6 bg-white shadow-md rounded-2xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Applied Jobs
        </h2>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;


import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";

const AdminJobsTable = () => {
  useGetAllAdminJobs();
  //const navigate=useNavigate
  // const { Companies, searchCompanyByText } = useSelector(
  //   (store) => store.company
  // );
  const {allAdminJobs,searchJobByText}=useSelector(store=>store.job);
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
  const filteredJobs = allAdminJobs.filter((job) => {
    if (!searchJobByText) {
      return true;
    }
    return (
      job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
      job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
    );
  });
  setFilterJobs(filteredJobs);
}, [allAdminJobs, searchJobByText]);

  return (
    <div className="p-4 bg-white border border-gray-200 shadow-md rounded-2xl">
      <Table>
        <TableCaption className="text-sm italic text-gray-500">
          Recently registered Jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="transition-colors bg-gray-100 hover:bg-gray-200">
            <TableHead className="font-semibold">Company Name</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-6 italic text-center text-gray-500"
              >
                You haven’t posted any job yet.
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filterJobs?.map((job, index) => (
                <TableRow
                  key={index}
                  className="transition-colors hover:bg-gray-50"
                >
                 
                  <TableCell className="font-medium text-gray-800">
                    {job?.company?.name}
                  </TableCell>
                  <TableCell className="font-medium text-gray-800">
                    {job?.title}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {job.createdAt
                      ? job.createdAt.split("T")[0]
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-2 transition rounded-full hover:bg-gray-100">
                          <MoreHorizontal />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="p-2 shadow-lg w-36 rounded-xl">
                        <div
                          className="flex items-center gap-2 p-2 transition rounded-lg cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            navigate(`/admin/companies/${job._id}`)
                          }
                        >
                          <Edit2 size={16} className="text-blue-600" />
                          <span className="text-sm">Edit</span>
                        </div>
                        <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)}   className="flex items-center gap-2 mt-2 cursor-pointer w-fit">
                          <Eye className="w-4"/>
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;


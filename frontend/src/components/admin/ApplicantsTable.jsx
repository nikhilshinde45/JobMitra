import React from "react";
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
const shortlistingStatus = ["Accepted", "Rejected"];
import { toast } from "sonner";
import axios from "axios";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  //update status
  const params=useParams();
  const appId=params.id;
  const statusHandler = async(status,id)=>{
    try{

      const res= await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
      }
      
    }catch(error){
      console.log(error);
      toast.error(error.res.data.messaage);
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div onClick={()=>statusHandler(status,item?._id)} 
                            key={index}
                            className="flex items-center my-2 cursor-pointer w-fit"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;

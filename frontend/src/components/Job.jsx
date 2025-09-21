import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate=useNavigate();
  const daysAgo =(mongodbTime)=>{
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timediffer=currentTime-createdAt;

    return Math.floor(timediffer/(1000*24*60*60));
    
  }
  //const jobId="mfkansf";
  return (
    <div className="p-4 transition bg-white border rounded-lg shadow-sm hover:shadow-md">
      {/* Top row: date + bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgo(job?.createdAt)===0?"Today":`${daysAgo(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar>
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h1 className="text-lg font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='my-2 text-lg font-bold'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
        
      </div>
       <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
         {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
         {job?.salary}LPA
        </Badge>
      </div>
      <div className='flex items-center gap-4 mt-r'>
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline" className="mt-4">Details</Button>
        <Button className="bg-[#7209b7] mt-4 hover:bg-[#5a2fa5]">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job

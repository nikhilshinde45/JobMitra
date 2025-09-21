
import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '../../redux/applicationSlice';
import { toast } from 'sonner';
import axios from 'axios';

const Applicants = () => {
  const params=useParams();
  const jobId=params.id;
  const dispatch = useDispatch();
  const {applicants}=useSelector(store=>store.application);
  useEffect(()=>{
    const fetchAllApplicants = async ()=>{
      try{
        const res= await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`,{withCredentials:true});
      //console.log(res.data);

        if(res.data.success){
          dispatch(setApplicants(res.data.job));
        }
        
      }catch(error){
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
    fetchAllApplicants();
    
  },[]);
  return (
    <div>
      <Navbar/>
      <div className='mx-auto max-w-7xl'>
        <h1 className='my-5 text-xl font-bold'>Applicants {applicants?.applications?.length}</h1>
        <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants
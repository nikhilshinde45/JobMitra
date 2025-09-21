import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './Footer';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//useEffect calls before the returing the jsx 
//when you comes first for home page rendering useeffect call before that and chacks user is student or recruiter
const Home = ()=>{
  useGetAllJobs();
  const {user}=useSelector(store=>store.auth);
 const navigate=useNavigate();
 useEffect(
  ()=>{
    if(user?.role==='recruiter'){
      navigate("/admin/companies");

    }

  },[]
 )


return (
  <>
    <Navbar />
    <HeroSection />        
    <CategoryCarousel/> 
     <LatestJobs/>    
    <Footer/>
  </>
);

}
export default Home
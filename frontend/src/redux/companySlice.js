
import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name:"company",

  initialState : {
    singleCompany:null,
    Companies:[],
    searchCompanyByText:""
  },
   reducers:{
    //actions
    setSingleCompany:(state,action)=>{
      state.singleCompany = action.payload;
    },
    setCompanies:(state,action)=>{
      state.Companies=action.payload;

    },
    setSearchCompanyByText:(state,action)=>{
      state.searchCompanyByText=action.payload;
    }
   }
}
);

export const {setSingleCompany,setCompanies,setSearchCompanyByText}=companySlice.actions;
export default companySlice.reducer;
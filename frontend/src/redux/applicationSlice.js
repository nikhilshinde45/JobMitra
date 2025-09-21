
import { createSlice } from "@reduxjs/toolkit";

const applicatiSlice = createSlice(
  {
    name:"application",
    initialState:{
     applicants: { applications: [] },
    },reducers:{
      //actions
      setApplicants:(state,action)=>{
        state.applicants=action.payload;
      }
    }
  }
)

export  const {setApplicants}=applicatiSlice.actions;
export default applicatiSlice.reducer;
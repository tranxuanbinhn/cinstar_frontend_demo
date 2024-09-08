import { createSlice } from "@reduxjs/toolkit";

  
const TimeSlice = createSlice({
    name:'ticket',
    initialState:{

        loading:null,
        error:null,
        time:300,
        showticket:300,
        success:false,
        payment:false,
        timecounter:300
     
    },
    reducers: {
        decrementTimeCounter : (state) => {
            if(state.timecounter > 0)
            {
                state.timecounter -=1;
            }
        },
        resetTimeCounter : (state) => {
            state.timecounter = 300;
        },
        decrementSecond:(state => {
            state.time-=1;
        }),
        showticketSecond:(state => {
            state.showticket-=1;
        }),
        setsuccess:(state, action) => {
            state.success = action.payload;
        },
        setpayment:(state, action) => {
            state.payment = action.payload;
        },
    },
    
    extraReducers:(builder)=>{
        
    }
});
export const {decrementSecond,showticketSecond,setsuccess,setpayment,decrementTimeCounter, resetTimeCounter} = TimeSlice.actions;
export default TimeSlice;   
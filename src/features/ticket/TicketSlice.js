import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllTicket = createAsyncThunk(
    'ticket/getall',
    async (thunkAPI)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/ticket/getall`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  
const TicketSlice = createSlice({
    name:'ticket',
    initialState:{
        allticket:null,
        loading:null,
        error:null,
        ticketrelation:{}
    },
    reducers: {
        saveticketrelation: (state, action) => {
            const { seatId, ...rest } = action.payload;
            console.log('action.payload', action.payload);
        
         
            if (!state.ticketrelation[seatId]) {
                state.ticketrelation[seatId] = {};
            }
        

            state.ticketrelation[seatId] = {
                ...state.ticketrelation[seatId],
                ...rest,
            };
        },
        deleteticketrelation:(state)=>{
            state.ticketrelation = {};
        }
    },
    
    extraReducers:(builder)=>{
        builder
        .addCase(getAllTicket.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllTicket.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.allticket=action.payload;
            
        })
        .addCase(getAllTicket.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
            console.log('state.error ', state.error )
        })
       
    }
});
export const {saveticketrelation,deleteticketrelation} = TicketSlice.actions;
export default TicketSlice;   

import clientServer from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const getAllPosts=createAsyncThunk(
    "post/getAllPosts",
    async(_,thunkAPI)=>{
        try{
            const response=await clientServer.get("/posts")
            return thunkAPI.fulfillWithValue(response.data)
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)



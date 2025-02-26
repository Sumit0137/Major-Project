import { createAsyncThunk } from "@reduxjs/toolkit";
import clientServer from "@/config/index";

// Login User
export const loginUser=createAsyncThunk(
    "user/login",
    async(user,thunkAPI)=>{
        try{
            const response=await clientServer.post("/login",{
                email:user.email,
                password: user.password,
            });

        if(response.data.token){
            localStorage.setItem("token",response.data.token);
        }
        else{
            return thunkAPI.rejectWithValue({
                message:"token not provided",
            })
        }

        return thunkAPI.fulfillWithValue(response.data.token);
    }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
});


export const registerUser=createAsyncThunk(
    "user/register",
    async(user,thunkAPI)=>{
        try{
            const request=await clientServer.post("/register",{
                username:user.username,
                password:user.password,
                email:user.email,
                name:user.name,
            });
            
            return request.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
         
        }
    }
)
// export const getAboutUser=createAsyncThunk(
//     "user/getAboutUser",
//     async(_,thunkAPI)=>{
//         try{
//             const response=await clientServer.get("/get_user_and_profile",{
//                 params:{
//                     token:user.token
//                 }
//             })
//             return thunkAPI.fulfillWithValue(response.data)
            
//         } catch(error){
//             return thunkAPI.rejectWithValue(error.response.data)
//         }
//     }
// )

//  ✅ Fetch User Profile Action
export const getAboutUser = createAsyncThunk(
    "user/getAboutUser",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return thunkAPI.rejectWithValue("No token available");

            const response = await clientServer.get("/get_user_and_profile", {
                params: { token },
            });

           // return response.data;
return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user data");
        }
    }
);

export const getAllUsers=createAsyncThunk(
    "users/getAllUsers",
    async( _,thunkAPI)=>{
        try{
            const response=await clientServer.get("/user/get_all_users")
            return thunkAPI.fulfillWithValue(response.data)
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }

)











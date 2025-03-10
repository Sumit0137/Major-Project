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

// export const getAboutUser = createAsyncThunk(
//     "user/getAboutUser",
//     async (_, thunkAPI) => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) return thunkAPI.rejectWithValue("No token available");

//             const response = await clientServer.get("/user/profile", {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             return thunkAPI.fulfillWithValue(response.data);
//         } catch (error) {
//             const errorMsg = error.response?.data?.message || "Failed to fetch user data";
//             return thunkAPI.rejectWithValue(errorMsg);
//         }
//     }
// );


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

export const sendConnectionRequest=createAsyncThunk(
    "user/sendConnectionRequest",
    async(user,thunkAPI)=>{
        try{
            const response=await clientServer.post("/user/send_connection_request",{
                token:user.token,
                connectionId: user.user_id
        })
        thunkAPI.dispatch(getConnectionsRequest({token:user.token}))
        return thunkAPI.fulfillWithValue(response.data);
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)


// export const sendConnectionRequest = createAsyncThunk(
//     "user/sendConnectionRequest",
//     async (user, thunkAPI) => {
//       try {
//         const token = localStorage.getItem("token"); // Retrieve the token
  
//         console.log("Token before request:", token); // Debugging log
  
//         if (!token) {
//           console.error("No token found in localStorage");
//           return thunkAPI.rejectWithValue("Unauthorized: No token available");
//         }
  
//         const response = await clientServer.post(
//           "/user/send_connection_request",
//           { connectionId: user.connectionId },
//           {
//             headers: {
//               Authorization: `Bearer ${token.trim()}`, // Ensure proper formatting
//               "Content-Type": "application/json",
//             },
//           }
//         );
  
//         return thunkAPI.fulfillWithValue(response.data);
//       } catch (error) {
//         console.error("Error Response:", error.response?.data);
//         return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
//       }
//     }
//   );
  

export const getConnectionsRequest=createAsyncThunk(
    "user/getConnectionRequests",
    async(user,thunkAPI) =>{
        try{
            const response=await clientServer.get("/user/getConnectionRequests",{
                params:{
                    token:user.token
                }
            })
            return thunkAPI.fulfillWithValue(response.data.connections);
        }
        catch(err){

            console.log(err)
            return thunkAPI.rejectWithValue(err.response.data.message)
        }
    }
)


// export const getConnectionsRequest = createAsyncThunk(
//     "user/getConnectionRequests",
//     async (user, thunkAPI) => {
//         try {
//             if (!user || !user.token) {
//                 console.error("Token is missing!");
//                 return thunkAPI.rejectWithValue("Token is missing!");
//             }

//             console.log("Fetching connection requests with token:", user.token);

//             const response = await clientServer.get("/user/getConnectionRequests", {
//                 params: { token: user.token }
//             });

//             console.log("Response received:", response.data);
//             return thunkAPI.fulfillWithValue(response.data.connections);
//         } catch (err) {
//             console.error("Error fetching connection requests:", err.response?.data || err.message);
//             return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch connection requests");
//         }
//     }
// );


export const getMyConnectionRequests=createAsyncThunk(
    "user/getMyConnectionRequests",
    async(user,thunkAPI)=>{
        try{
            const response=await clientServer.get("/user/user_connection_request",{
                params:{
                    token:user.token
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch(err){
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
)

// export const getMyConnectionRequests = createAsyncThunk(
//     "user/getMyConnectionRequests",
//     async (user, thunkAPI) => {
//         try {
//             const response = await clientServer.get("/user/getMyConnectionsRequests", {
//                 params: { token: user.token },
//             });

//             // Ensure connections is always an array
//             const connections = response.data.connections ?? [];

//             return thunkAPI.fulfillWithValue(connections);
//         } catch (err) {
//             console.error("Error fetching connection requests:", err);
//             return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch connection requests");
//         }
//     }
// );


export const AcceptConnection=createAsyncThunk(
    "user/acceptConnection",
    async(user,thunkAPI)=>{
        try{
            const response=await clientServer.post("/user/accept_connection_request",{
                token:user.token,
                connection_id:user.connectionId,
                action_type:user.action
            });
            return thunkAPI.fulfillWithValue(response.data);
            } catch(err){
                return thunkAPI.rejectWithValue(err.response.data.message)
            }
        }
)

//  ///////





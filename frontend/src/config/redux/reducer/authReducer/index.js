import { createSlice } from "@reduxjs/toolkit"
import { getAboutUser, getAllUsers, loginUser,registerUser } from "../../action/authAction"

const initialState={
    user:undefined,
    isError:false,
    isSuccess:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    isTokenThere:false,
    profileFetched:false,
    connections:[],
    connectionRequest:[],
    all_users:[],
    all_profiles_fetched:false
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:()=>initialState,
        handleLoginUser:(state)=>{
            state.message="hello";
        },
        emptyMessage:(state)=>{
            state.message=""
        },
        setTokenIsThere:(state)=>{
            state.isTokenThere=true
        },
        setTokenIsNotThere:(state)=>{
            state.isTokenThere=false
            dispatch
        },
    },

    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
            state.message="Knocking the door....";
        })

        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.loggedIn=true;
            state.message="Login is Successfull";
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;

        })
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true
            state.message="Registering you...."
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.message={
                message:"Registration is Successfull, Please login in"
            }
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
        })
        // Older
//         .addCase(getAboutUser.fulfilled,(state,action)=>{
//             state.isLoading=false;
//             state.isError=false;
//             state.profileFetched=true;
//             state.user=action.payload.profile


            .addCase(getAboutUser.fulfilled, (state, action) => {
                console.log("Received user data:", action.payload); // ✅ Debugging Log
                state.isLoading = false;
                state.isError = false;
                state.profileFetched = true;
                state.user = action.payload.userId || {}; // ✅ Ensure correct structure
            })
            .addCase(getAllUsers.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.all_profiles_fetched=true;
                state.all_users=action.payload.profiles
            })
    }
});

export const { reset, emptyMessage,setTokenIsThere,setTokenIsNotThere} = authSlice.actions;

export default authSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";
// import { getAboutUser, getAllUsers, loginUser, registerUser } from "../../action/authAction";

// const initialState = {
//     user: null,  // ✅ Changed from `[]` to `null` for better handling
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     loggedIn: false,
//     message: "",
//     isTokenThere: false,
//     profileFetched: false,
//     connections: [],
//     connectionRequest: [],
//     all_users: [],
//     all_profiles_fetched: false,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         reset: () => initialState,
//         emptyMessage: (state) => {
//             state.message = "";
//         },
//         setTokenIsThere: (state) => {
//             state.isTokenThere = true;
//         },
//         setTokenIsNotThere: (state) => {
//             state.isTokenThere = false;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = false;
//                 state.isSuccess = true;
//                 state.loggedIn = true;
//                 state.user = action.payload.user;
//                 state.message = "Login Successful";
//             })
//             .addCase(loginUser.pending, (state) => {
//                 state.isLoading = true;
//                 state.message = "Logging in...";
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = true;
//                 state.message = action.payload || "Login failed";
//             })

//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = false;
//                 state.isSuccess = true;
//                 state.message = "Registration Successful. Please log in.";
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = true;
//                 state.message = action.payload || "Registration failed";
//             })

//             .addCase(getAboutUser.fulfilled, (state, action) => {
//                 console.log("Received user data:", action.payload); // Debugging log
//                 state.isLoading = false;
//                 state.isError = false;
//                 state.profileFetched = true;
//                 state.user = action.payload.userId || {}; // Ensure correct structure
//             })
//             .addCase(getAllUsers.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = false;
//                 state.all_profiles_fetched = true;
//                 state.all_users = action.payload.profiles || [];
//             });
//     },
// });

// export const { reset, emptyMessage, setTokenIsThere, setTokenIsNotThere } = authSlice.actions;
// export default authSlice.reducer;

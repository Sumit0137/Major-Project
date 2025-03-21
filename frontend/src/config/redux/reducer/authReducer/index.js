import { createSlice } from "@reduxjs/toolkit"
import { getAboutUser, getAllUsers, getConnectionsRequest, getMyConnectionRequests, loginUser, registerUser } from "../../action/authAction"

const initialState = {
    user: undefined,
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    isTokenThere: false,
    profileFetched: false,
    connections: [],
    connectionRequest: [],
    all_users: [],
    all_profiles_fetched: false
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        handleLoginUser: (state) => {
            state.message = "hello";
        },
        emptyMessage: (state) => {
            state.message = "";
        },
        setTokenIsThere: (state) => {
            state.isTokenThere = true;
        },
        setTokenIsNotThere: (state) => {
            state.isTokenThere = false; // ❌ Removed incorrect dispatch
            
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Knocking the door....";
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.loggedIn = true;
                state.message = "Login is Successful";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Registering you....";
            })
            .addCase(registerUser.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = {
                    message:"Registeration is Successfull, Please login in"
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // ✅ Handle `getAboutUser`
            .addCase(getAboutUser.pending, (state) => {
                state.isLoading = true;
                state.profileFetched = false;
            })
            //getting error here
            // .addCase(getAboutUser.fulfilled, (state, action) => {
            //     console.log("Received user data:", action.payload); // ✅ Debugging Log
            //     state.isLoading = false;
            //     state.isError = false;
            //     state.profileFetched = true;
            //     state.user = action.payload; // ✅ Ensure correct structure
            // })

            .addCase(getAboutUser.fulfilled, (state, action) => {
                console.log("Received user data:", action.payload); // ✅ Debugging Log
                
                state.isLoading = false;
                state.isError = false;
                state.profileFetched = true;
            
                // Ensure correct structure
                state.user = {
                    ...action.payload, // ✅ Keep original data
                    ...(action.payload.userId || {}) // ✅ Merge userId fields if available
                };
            
                console.log("Updated User State:", state.user); // ✅ Debugging Log
            })
            
            .addCase(getAboutUser.rejected, (state, action) => {
                console.error("Error fetching user:", action.payload);
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // ✅ Handle `getAllUsers`
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.all_profiles_fetched = true;
                state.all_users = action.payload.profiles || [];
                console.log("All Users:", state.all_users);
            })

            // ✅ Handle Connections Requests
            .addCase(getConnectionsRequest.fulfilled, (state, action) => {
                state.connections = action.payload;
            })
            .addCase(getConnectionsRequest.rejected, (state, action) => {
                state.message = action.payload;
            })
            .addCase(getMyConnectionRequests.fulfilled, (state, action) => {
                state.connectionRequest = action.payload;
            })
            .addCase(getMyConnectionRequests.rejected, (state, action) => {
                state.message = action.payload;
            });
    }
});

export const { reset, emptyMessage, setTokenIsThere, setTokenIsNotThere } = authSlice.actions;
export default authSlice.reducer;



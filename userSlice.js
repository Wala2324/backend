import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout(state) {
            console.log("Redux logout triggered")
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

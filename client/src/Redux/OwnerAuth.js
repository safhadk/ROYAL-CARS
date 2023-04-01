import { createSlice } from "@reduxjs/toolkit";

const OwnerAuth = createSlice({
    name: "Owner",
    initialState: {
        Token: null,
        name:null,
    },
    reducers: {
        OwnerLogin(state, action) {
            state.Token = action.payload.token;
            state.name = action.payload.name;
        },
        OwnerLogout(state, action) {
            state.Token = "";
            state.name = "";
        },
    },
});
export const { OwnerLogin, OwnerLogout } = OwnerAuth.actions;
export default OwnerAuth.reducer;

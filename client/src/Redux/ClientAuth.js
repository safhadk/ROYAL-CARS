import { createSlice } from "@reduxjs/toolkit";

export const ClientAuth = createSlice({
    name: "Client",
    initialState: {
        Token: null,
        name:null,
    },
    reducers: {
        ClientLogin(state, action) {
            state.Token = action.payload.token;
            state.name = action.payload.name;
        },
        ClientLogout(state, action) {
            state.Token = "";
            state.name = "";

        },
    },
});
export const { ClientLogin, ClientLogout } = ClientAuth.actions;
export default ClientAuth.reducer;

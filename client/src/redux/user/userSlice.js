import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    Error: null,
    Loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.Loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.Loading = false;
            state.Error = null;
        },
        signInFailure: (state, action) => {
            state.Error = action.payload;
            state.Loading = false;
        },
        clearError: (state) => {
            state.Error = null;
        },
        updateUserStart: (state) => {
            state.Loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.Loading = false;
            state.Error = null;
        },
        updateUserFailure: (state, action) => {
            state.Error = action.payload;
            state.Loading = false;
        },
        deleteUserStart: (state) => {
            state.Loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.Loading = false;
            state.Error = null;
        },
        deleteUserFailure: (state, action) => {
            state.Error = action.payload;
            state.Loading = false;
        },
        signOutUserStart: (state) => {
            state.Loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.Loading = false;
            state.Error = null;
        },
        signOutUserFailure: (state, action) => {
            state.Error = action.payload;
            state.Loading = false;
        },
    }
});

export const { 
    signInStart,
    signInSuccess,
    signInFailure,
    clearError,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
    } = userSlice.actions;

export default userSlice.reducer;

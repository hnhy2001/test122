import { createSlice } from '@reduxjs/toolkit';

type User = {
    name: string;
};


const initialState: User = {
    name: ''
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.name = action.payload.name
        },
    },
});

export const { setUsername } = user.actions;
export default user.reducer;
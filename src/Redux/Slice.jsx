// Redux/Slice.js

import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    userData: [],
    previousValues: {},
    editHistory: {}, // Manage edit history by user ID
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateUserData: (state, action) => {
      const { index, updatedUser } = action.payload;
      state.userData[index] = updatedUser;
    },
    clearPreviousValues: (state) => {
      state.previousValues = {};
    },
    addEditHistory: (state, action) => {
      const { userId, changes, timestamp } = action.payload;
      if (!state.editHistory[userId]) {
        state.editHistory[userId] = [];
      }
      state.editHistory[userId].push({ changes, timestamp });
    },
    setEditHistory: (state, action) => {
      const { userId, history } = action.payload;
      state.editHistory[userId] = history;
    },
  },
});

export const { setUserData, updateUserData, clearPreviousValues, addEditHistory, setEditHistory } = dataSlice.actions;
export default dataSlice.reducer;

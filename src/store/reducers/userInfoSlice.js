import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//// get Info

export const getInfo = createAsyncThunk('users/usersInfo', async (id) => {
  const response = await axios.get(
    `http://localhost:4000/api/user/user/get?code=${id}`
  );
  return response.data;
  // console.log("infoUser",response.data);
});

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userInfoState: { skills: [], contact: { address: {} } },
  },

  ///// xử lý reducers
  extraReducers: {
    //// get info
    [getInfo.pending]: (state, action) => {
      console.log('Fetching users from backend');
    },
    [getInfo.fulfilled]: (state, action) => {
      console.log('done');

      state.userInfoState = action.payload;
      state.userInfoState.skills = action.payload.skills;
      state.userInfoState.contact = action.payload.contacts[0];
      state.userInfoState.contact.address = action.payload.contacts[0].address;
    },
    [getInfo.rejected]: (state, action) => {
      console.log('false');
    },
  },
});

const userInfoReducer = userInfoSlice.reducer;

//// Selector /////

export const userInfoSelector = (state) => state.userInfoReducer.userInfoState;

//// export reducer cho index.js ////

export default userInfoReducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//// get contact

export const getContact = createAsyncThunk("users/userContact", async (id) => {
  const response = await axios.get(
    `http://localhost:4000/api/user/contact/get?code=${id}`
  );
  return response.data;
  console.log(response.data);
});

const userContactSlice = createSlice({
  name: "userContact",
  initialState: {
    userContactState: [],
  },

  ///// xử lý reducers
  extraReducers: {
    //// get contact
    [getContact.pending]: (state, action) => {
      console.log("Fetching users from backend");
    },
    [getContact.fulfilled]: (state, action) => {
      console.log("done");
      state.userContactState = action.payload;
    },
    [getContact.rejected]: (state, action) => {
      console.log("false");
    },
  },
});

const userContactReducer = userContactSlice.reducer;

//// Selector /////

export const userContactSelector = (state) =>
  state.userContactReducer.userContactState;

//// export reducer cho index.js ////

export default userContactReducer;

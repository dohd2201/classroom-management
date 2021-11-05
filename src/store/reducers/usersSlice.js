import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//// reducer thunk

/// get list users
export const getUsers = createAsyncThunk("users/usersFetched", async () => {
  const response = await axios.get("http://localhost:4000/api/user/user/list");
  return response.data;
});
/// delete user
export const deleteUser = createAsyncThunk("users/userDelete", async (id) => {
  await axios.post(`http://localhost:4000/api/user/user/delete?code=${id}`);
  return id;
});
/// create user
export const createUser = createAsyncThunk("users/userCreate", async (data) => {
  const response = await axios.post(
    `http://localhost:4000/api/user/user/create`,
    data
  );
  return response.data;
});

//// tạo slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: [],
  },

  ///// xử lý reducers
  extraReducers: {
    //// get users
    [getUsers.pending]: (state, action) => {
      console.log("Fetching users from backend");
    },
    [getUsers.fulfilled]: (state, action) => {
      console.log("done");
      state.allUsers = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      console.log("false");
    },

    //// delete user

    [deleteUser.pending]: (state, action) => {
      console.log("Loading...");
    },
    [deleteUser.fulfilled]: (state, action) => {
      console.log("done");
      const userID = action.payload;
      state.allUsers = state.allUsers.filter((user) => user.code !== userID);
    },
    [deleteUser.rejected]: (state, action) => {
      console.log("false");
    },

    // //// update user info

    // [updateInfo.pending]: (state, action) => {
    //   console.log('Loading...');
    // },
    // [updateInfo.fulfilled]: (state, action) => {
    //   console.log('update info done');
    //   const updatedUser = action.payload;
    //   state.allUsers = state.allUsers.map((user) => {
    //     if (user.code === updatedUser.code) {
    //       return updatedUser;
    //     }
    //     return user;
    //   });
    // },
    // [updateInfo.rejected]: (state, action) => {
    //   console.log('false');
    // },

    // //// update user

    // [updateContact.pending]: (state, action) => {
    //   console.log('Loading...');
    // },
    // [updateContact.fulfilled]: (state, action) => {
    //   console.log('update contact done');
    // },
    // [updateContact.rejected]: (state, action) => {
    //   console.log('false');
    // },

    //// create user

    [createUser.pending]: (state, action) => {
      console.log("Loading...");
    },
    [createUser.fulfilled]: (state, action) => {
      state.allUsers.unshift(action.payload);
    },
    [createUser.rejected]: (state, action) => {
      console.log("false");
    },
  },
});

//// Tạo reducer/////

const usersReducer = usersSlice.reducer;

//// Selector /////

export const usersSelector = (state) => state.usersReducer.allUsers;

//// export reducer cho index.js ////

export default usersReducer;

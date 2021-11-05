import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/// get province

export const getProvince = createAsyncThunk(
  "users/userAddressProvince",
  async () => {
    const response = await axios.get(
      `http://localhost:4000/api/address/address/list?type=province`
    );
    return response.data;
  }
);

export const getDistrict = createAsyncThunk(
  "users/userAddressDistrict",
  async (id) => {
    const response = await axios.get(
      `http://localhost:4000/api/address/address/list?type=district&parent_id=${id}`
    );
    return response.data;
  }
);

export const getWard = createAsyncThunk("users/userAddressWard", async (id) => {
  const response = await axios.get(
    `http://localhost:4000/api/address/address/list?type=ward&parent_id=${id}`
  );
  return response.data;
});

const userAddressSlice = createSlice({
  name: "userAddress",
  initialState: {
    userAddressState: {
      province: [],
      district: [],
      ward: [],
    },
  },

  ///// xử lý reducers
  extraReducers: {
    //// get province
    [getProvince.pending]: (state, action) => {
      console.log("fetching province");
    },
    [getProvince.fulfilled]: (state, action) => {
      console.log("done");
      state.userAddressState.province = action.payload;
    },
    [getProvince.rejected]: (state, action) => {
      console.log("false");
    },
    //// get district
    [getDistrict.pending]: (state, action) => {
      console.log("fetching province");
    },
    [getDistrict.fulfilled]: (state, action) => {
      console.log("done");
      state.userAddressState.district = action.payload;
    },
    [getDistrict.rejected]: (state, action) => {
      console.log("false");
    },
    //// get ward
    [getWard.pending]: (state, action) => {
      console.log("fetching province");
    },
    [getWard.fulfilled]: (state, action) => {
      console.log("done");
      state.userAddressState.ward = action.payload;
    },
    [getWard.rejected]: (state, action) => {
      console.log("false");
    },
  },
});

const userAddressReducer = userAddressSlice.reducer;

//// Selector /////

export const userAddressSelector = (state) =>
  state.userAddressReducer.userAddressState;

//// export reducer cho index.js ////

export default userAddressReducer;

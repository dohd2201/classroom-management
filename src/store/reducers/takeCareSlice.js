import { createSlice } from '@reduxjs/toolkit';
import { fbLink } from '../../constances/fakeDataFBLink';

//// tạo slice
const takeCareSlice = createSlice({
  name: 'users',
  initialState: {
    data: fbLink,
  },
  reducers: {
    addLink: (state, action) => {
      state.data.unshift({
        id: Math.floor(Math.random() * 1000 + 1),
        fb: action.payload,
        status: 0
      });
    },
  },
});

//// Tạo reducer/////
const takeCareReducer = takeCareSlice.reducer;

//// Selector /////
export const takeCareSelector = (state) => state.takeCareReducer.data;

/// export actions
export const {addLink} = takeCareSlice.actions

//// export reducer cho index.js ////
export default takeCareReducer;

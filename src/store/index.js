import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/usersSlice';
import userInfoReducer from './reducers/userInfoSlice';
import userContactReducer from './reducers/userContactSlice';
import userAddressReducer from './reducers/userAddressSlice';
import takeCareReducer from './reducers/takeCareSlice';

//// Tạo kho lưu trữ dữ liệu /////

const store = configureStore({
  reducer: {
    usersReducer,
    userInfoReducer,
    userContactReducer,
    userAddressReducer,
    takeCareReducer,
  },
});

//// Xuất kho dữ liệu đi đi /////

export default store;

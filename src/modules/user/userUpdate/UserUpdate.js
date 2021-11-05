import React, { useEffect } from 'react';
import './userUpdate.css';
import { HomeOutlined } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  userInfoSelector,
  getInfo,
} from '../../../store/reducers/userInfoSlice';

import UserForm from '../../../components/registerForm/UserForm';

const UserUpdate = () => {
  // get user will update
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfo(id));
  }, [dispatch, id]);
  ///
  const userInfo = useSelector(userInfoSelector);

  return (
    <div className="userUpdated">
      <div className="userUpdatedTitle">
        <HomeOutlined className="userUpdateIconTitle" /> / Chỉnh sửa thông tin
        học viên
      </div>
      {userInfo.code === id && <UserForm data={userInfo} />}
    </div>
  );
};

export default UserUpdate;

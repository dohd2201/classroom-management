import React from 'react';
import './userCreate.css';
import { HomeOutlined } from '@material-ui/icons';
import UserForm from '../../../components/registerForm/UserForm';

function UserCreate() {
  return (
    <div className="userCreate">
      <div className="userCreateTitle">
        <HomeOutlined className="userCreateIconTitle" /> / Thêm thành viên mới
      </div>
      <UserForm />
    </div>
  );
}

export default UserCreate;

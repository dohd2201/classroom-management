import {
  HomeOutlined,
  PersonAddOutlined,
  VisibilityOutlined,
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  DeleteOutline,
  SearchOutlined,
} from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import './userList.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { usersSelector, getUsers } from '../../../store/reducers/usersSlice';
import Modal from '../../../components/modal/Modal';

function UserList() {
  const usersRow = useSelector(usersSelector);
  const dispatch = useDispatch();

  //get all users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns = [
    { field: 'code', headerName: 'Mã nhân viên', width: 180 },
    {
      field: 'fullName',
      headerName: 'Họ tên',
      width: 200,
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      width: 140,
      renderCell: (params) => (params.value === 'male' ? 'Nam' : 'Nữ'),
    },
    {
      field: 'birthday',
      headerName: 'Năm sinh',
      width: 140,
      renderCell: (params) =>
        params.value.toString().split('-').reverse().join('-'),
    },
    {
      field: 'CCCD',
      headerName: 'Số điện thoại',
      width: 160,
      renderCell: (params) => params.row.contacts[0].phone,
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link className="link" to={'/users/user/' + params.row.code}>
              <button className="userListView">
                <VisibilityOutlined className="userListIcon" />
              </button>
            </Link>
            <Link className="link" to={'/users/user/update/' + params.row.code}>
              <button className="userListEdit">
                <EditOutlined className="userListIcon" />
              </button>
            </Link>
            <Link className="link" to="/users">
              <button
                className="userListDelete"
                onClick={deleteHandleChange.bind(this, params.row.code)}
              >
                <DeleteOutline className="userListIcon" />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  // open modal and delete user
  const [deleteID, setDeleteID] = useState('');
  const deleteHandleChange = (id) => {
    setOpenModal(true);
    setDeleteID(id);
  };
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && <Modal closeModal={setOpenModal} deleteUsers={deleteID} />}
      <div className="userList">
        <div className="userListTitle">
          <HomeOutlined className="userListIconTitle" /> / Danh sách học viên
        </div>
        <div className="userListWrapper">
          <div className="userListHeader">
            <Link className="link" to="/users/create-user">
              <button className="userListCreate">
                <PersonAddOutlined className="userListIcon" /> Thêm thành viên
                mới
              </button>
            </Link>
            <div className="userListSearch">
              <SearchOutlined className="userSearchIcon" />
              <input placeholder="Search" />
            </div>
          </div>

          <div className="userListTable">
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={usersRow}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;

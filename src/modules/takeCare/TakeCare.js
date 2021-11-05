import React from 'react';
import './TakeCare.css';
import { HomeOutlined } from '@material-ui/icons';
import { InputForm } from './InputForm';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { takeCareSelector } from '../../store/reducers/takeCareSlice';

const TakeCare = () => {
  const rows = useSelector(takeCareSelector);
  const dispatch = useDispatch();

  const columns = [
    {
      field: 'fb',
      headerName: 'Link Facebook',
      width: 500,
    },
  ];

  return (
    <div className="takeCare">
      <div className="takeCareTitle">
        <HomeOutlined className="takeCareIcon" /> / Chăm sóc khách hàng
      </div>
      <InputForm />
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[7]}
        />
      </div>
    </div>
  );
};

export default TakeCare;

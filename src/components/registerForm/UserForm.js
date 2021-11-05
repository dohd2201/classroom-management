import React, { useEffect } from 'react';
//Material UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// Register components
import InputTypeSelectSkills from './userFormComp/InputTypeSelectSkills';
import InputTypeText from './userFormComp/InputTypeText';
import InputTypeSelect from './userFormComp/InputTypeSelect';
import InputBirthday from './userFormComp/InputBirthday';
// fake data
import { Uni, Majors } from '../../constances/fakeData';
// react-hook-form
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './Validate';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  userAddressSelector,
  getProvince,
  getDistrict,
  getWard,
} from '../../store/reducers/userAddressSlice';
import {
  createUser,
  updateInfo,
  updateContact,
} from '../../store/reducers/usersSlice';
import { useHistory } from 'react-router';
/// Func convert data
import {
  ConvertDataToCreateUser,
  ConvertDataToUpdateUserInfo,
  ConvertDataToUpdateUserContact,
  getID,
} from './ConvertData';

// test
import axios from 'axios';

///////////////////////////////////////////////////

const UserForm = ({ data, type }) => {
  /// methods of react-hook-form
  const methods = useForm({ resolver: yupResolver(schema) });

  /// get address by redux
  const getAddress = useSelector(userAddressSelector);
  const dispatch = useDispatch();

  /// get province || get district, ward when selected
  useEffect(() => {
    dispatch(getProvince());
  }, [dispatch]);

  useEffect(() => {
    if (methods.watch('province') !== undefined) {
      const id = getID(getAddress.province, methods.watch('province'));
      dispatch(getDistrict(id));
    }
  }, [dispatch, methods.watch('province'), getAddress.province, methods]);
  useEffect(() => {
    if (methods.watch('district') !== undefined) {
      const id = getID(getAddress.district, methods.watch('district'));
      dispatch(getWard(id));
    }
  }, [dispatch, methods.watch('district'), getAddress.district, methods]);

  /// REGISTER
  const history = useHistory();
  const submitFunc = async (dataForm) => {
    if (data) {
      const dataUserInfo = ConvertDataToUpdateUserInfo(dataForm);
      const dataUserContact = ConvertDataToUpdateUserContact(dataForm);

      await Promise.all([
        axios.post(
          `http://localhost:4000/api/user/user/update?code=${data.code}`,
          dataUserInfo
        ),
        axios.post(
          `http://localhost:4000/api/user/contact/update?code=${data.code}`,
          dataUserContact
        ),
      ]);

      // dispatch(updateInfo(data.code, dataUserInfo));
      // dispatch(updateUserContact(data.code, dataUserContact));

      history.push('/users');
      return 0;
    }
    debugger;
    const dataCreateUser = ConvertDataToCreateUser(dataForm);
    dispatch(createUser(dataCreateUser));

    if (type) {
      history.push('/success');
    }
    history.push('/users');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitFunc)}>
        <Box
          sx={{
            margin: '15px 80px',
            border: '1px solid #333',
            borderRadius: '7px',
          }}
        >
          <Grid container sx={{ padding: '30px 0' }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ padding: '0 30px 0 80px', borderRight: '1px solid black' }}
            >
              <h2>Thông tin cơ bản</h2>

              <InputTypeText
                name="fullName"
                label="Họ tên"
                oldValue={data ? data.fullName : ''}
              />
              <InputTypeSelect
                name="gender"
                label="Giới tính"
                options={[
                  { v: 'male', n: 'Nam' },
                  { v: 'female', n: 'Nữ' },
                ]}
                oldValue={data ? data.gender : ''}
              />
              <InputBirthday oldValue={data ? data.birthday : '2000-01-01'} />
              <InputTypeText
                name="CCCD"
                label="Căn cước công dân"
                oldValue={data ? data.CCCD : ''}
              />

              <h2 style={{ marginTop: '10px' }}>Học vấn</h2>

              <InputTypeSelect
                name="university"
                label="Trường học"
                options={Uni}
                oldValue={data ? data.university : ''}
              />
              <InputTypeSelect
                name="majors"
                label="Ngành học"
                options={Majors}
                oldValue={data ? data.majors : ''}
              />
              <InputTypeSelectSkills oldValue={data ? data.skills : []} />
            </Grid>

            <Grid item xs={12} md={6} sx={{ padding: '0 80px 0 30px' }}>
              <h2>Thông tin liên hệ</h2>

              <InputTypeText
                name="phone"
                label="Số điện thoại"
                oldValue={data ? data.contact.phone : ''}
              />
              <InputTypeText
                name="email"
                label="Email"
                oldValue={data ? data.contact.email : ''}
              />
              <InputTypeText
                name="facebook"
                label="Facebook"
                oldValue={data ? data.contact.facebook : ''}
              />
              <InputTypeSelect
                name="province"
                label="Tỉnh/Thành phố"
                options={getAddress.province}
                type="address"
                oldValue={data ? data.contact.address.province : ''}
              />
              <InputTypeSelect
                name="district"
                label="Quận/Huyện"
                options={getAddress.district}
                type="address"
                oldValue={data ? data.contact.address.district : ''}
              />
              <InputTypeSelect
                name="ward"
                label="Phường/Xã"
                options={getAddress.ward}
                type="address"
                oldValue={data ? data.contact.address.ward : ''}
              />
              <InputTypeText
                name="detail"
                label="Địa chỉ chi tiết"
                oldValue={data ? data.contact.address.detail : ''}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                style={{ padding: '5px 30px', margin: '50px 0 0 0 ' }}
                variant="contained"
                type="submit"
              >
                {data ? 'Cập nhật' : 'Đăng kí'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
export default UserForm;

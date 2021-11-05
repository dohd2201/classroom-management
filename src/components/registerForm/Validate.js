import * as yup from 'yup';

export const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Bạn vui lòng nhập thông tin Họ tên')
    .min(5, 'Bạn vui lòng nhập độ dài của Họ tên ít nhất 5 ký tự'),
  gender: yup.string().required('Bạn vui lòng chọn thông tin Giới tính'),
  birthday: yup.string().required('Bạn vui lòng nhập thông tin Ngày sinh'),
  CCCD: yup
    .string()
    .required('Bạn vui lòng nhập thông tin Căn cước công dân')
    .matches(
      /^(\d{9}|\d{12})$/,
      'Bạn vui lòng nhập đúng định dạng của Căn cước công dân'
    ),
  university: yup.string().required('Bạn vui lòng chọn thông tin Trường học'),
  majors: yup.string().required('Bạn vui lòng chọn thông tin Ngành học'),
  skills: yup.array().min(1, 'Bạn vui lòng chọn Kiến thức đã biết'),
  phone: yup
    .string()
    .required('Bạn vui lòng nhập Số điện thoại')
    .matches(
      /^(\d{10}|\d{11})$/,
      'Bạn vui lòng nhập đúng định dạng của Số điện thoại'
    ),
  email: yup
    .string()
    .email('Bạn vui lòng nhập đúng định dạng của Email')
    .required('Bạn vui lòng nhập thông tin Email'),
  facebook: yup.string().required('Bạn vui lòng nhập link Facebook'),
  province: yup.string().required('Bạn vui lòng chọn thông tin Tỉnh/Thành phố'),
  district: yup.string().required('Bạn vui lòng chọn thông tin Quận/Huyện'),
  ward: yup.string().required('Bạn vui lòng chọn thông tin Phường/Xã'),
  detail: yup.string().required('Bạn vui lòng nhập thông tin Địa chỉ chi tiết'),
});

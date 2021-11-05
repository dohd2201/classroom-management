// convet 1 -> 01
const convertNum = (num) => (num > 0 && num < 10 ? `0${num}` : `${num}`);

// convert birthday to YYYY-MM-DD
const convertBirthday = (time) => {
  const t = new Date(time);

  const d = t.getDate();
  const m = t.getMonth() + 1;
  const y = t.getFullYear();

  return `${y}-${convertNum(m)}-${convertNum(d)}`;
};

// Convert data in form to create data
export const ConvertDataToCreateUser = (data) => {
  const {
    fullName,
    gender,
    birthday,
    CCCD,
    university,
    majors,
    skills,
    phone,
    email,
    facebook,
    province,
    district,
    ward,
    detail,
  } = data;

  const convertedData = {
    fullName,
    gender,
    birthday: convertBirthday(birthday),
    CCCD,
    university,
    majors,
    skills,
    phone,
    address: {
      province,
      district,
      ward,
      detail,
    },
    email,
    facebook,
  };

  return convertedData;
};

// get province id and district id by name
export const getID = (arr, name) => {
  let id;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      id = arr[i].id;
    }
  }

  return id;
};

// Convert data in form to data used to update userInfo
export const ConvertDataToUpdateUserInfo = (data) => {
  const { fullName, gender, birthday, CCCD, university, majors, skills } = data;

  const convertedData = {
    fullName,
    gender,
    birthday: convertBirthday(birthday),
    CCCD,
    university,
    majors,
    skills,
  };

  return convertedData;
};

// Convert data in form to data used to update userContact
export const ConvertDataToUpdateUserContact = (data) => {
  const { phone, email, facebook, province, district, ward, detail } = data;

  const convertedData = {
    phone,
    address: {
      province,
      district,
      ward,
      detail,
    },
    email,
    facebook,
  };

  return convertedData;
};

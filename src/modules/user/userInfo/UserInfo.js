import React, { useState, useEffect } from 'react';
import './userInfo.css';
import {
  Add,
  ArrowRight,
  EmailOutlined,
  Facebook,
  HomeOutlined,
  LocationOnOutlined,
  PhoneAndroidOutlined,
} from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  userInfoSelector,
  getInfo,
} from '../../../store/reducers/userInfoSlice';

function UserInfo() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);

  useEffect(() => {
    dispatch(getInfo(id));
  }, [dispatch, id]);

  return (
    <div className="userInfo">
      <div className="userInfoTitle">
        <HomeOutlined className="userInfoIconTitle" /> / Quay lại trang chủ
      </div>

      <div className="userInfoButton">
        <Link className="link" to="/users/user/update/:userID">
          <span>Chỉnh sửa thông tin</span>
        </Link>
      </div>

      <div className="userInfoWrapper">
        <div className="userInfoLeft">
          <div className="userInfoLeftImg">
            <img src="../images/avatar.jpg" />
          </div>
          <h3 className="userInfoLeftTitle">Contact</h3>
          <div className="userInfoLeftContact">
            <div className="userInfoContactList">
              <div className="userInfoContactItem">
                <PhoneAndroidOutlined className="userInfoIcon" />
                {userInfo.contact.phone}
              </div>
              <div className="userInfoContactItem">
                <EmailOutlined className="userInfoIcon" />
                {userInfo.contact.email}
              </div>
              <div className="userInfoContactItem">
                <Facebook className="userInfoIcon" />
                {userInfo.contact.facebook}
              </div>
              <div className="userInfoContactItem">
                <LocationOnOutlined className="userInfoIcon" />
                {`${userInfo.contact.address.province}, ${userInfo.contact.address.district}, ${userInfo.contact.address.ward}, ${userInfo.contact.address.detail}`}
              </div>
            </div>
          </div>
          <h3 className="userInfoLeftTitle">Education</h3>
          <div className="userInfoLeftEducation">
            <div className="userInfoEducationList">
              <p className="school">{userInfo.university}</p>
              <p className="major">{userInfo.majors}</p>
              <p className="time">(2019-2022)</p>
            </div>
          </div>
          <h3 className="userInfoLeftTitle">Skills</h3>
          <div className="userInfoLeftSkill">
            {userInfo.skills.map((skill) => (
              <p>
                <ArrowRight /> {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="userInfoRight">
          <div className="userInfoRightHeader">
            <p className="personName">{userInfo.fullName}</p>
            <p className="jobPosition">Intern React</p>
          </div>
          <h3 className="userInfoRightTitle">Profile</h3>
          <div className="userInfoProfile">
            <p className="text">
              Dưới đây là một số đoạn code tạo khung Text mẫu dạng HTML CSS
              (đóng khung text văn bản trong HTML hoặc code tạo khung HTML) để
              anh em chèn vào bài viết cho nó nhí nhảnh tí :v Các mẫu mình tham
              khảo từ nhiều website trong và ngoài nước, thấy ưng cái bụng là
              hốt về để dành chơi :v
            </p>
          </div>
          <h3 className="userInfoRightTitle">Internship Reviews</h3>
          <div className="userInfoReview">
            <div className="userInfoReviewItem">
              <b className="progressName">
                <Add className="userInfoIcon" /> Quá trình 1:
              </b>
              <p className="text">Thời gian: 6/2021-10/2021</p>
              <p className="text">
                - Dưới đây là một số đoạn code tạo khung Text mẫu dạng HTML CSS
                (đóng khung text văn bản trong HTML hoặc code tạo khung HTML) để
                anh em chèn vào bài viết cho nó nhí nhảnh tí :v Các mẫu mình
                tham khảo từ nhiều website trong và ngoài nước, thấy ưng cái
                bụng là hốt về để dành chơi :v
              </p>
            </div>
            <div className="userInfoReviewItem">
              <b className="progressName">
                <Add className="userInfoIcon" /> Quá trình 2:
              </b>
              <p className="text">Thời gian: 6/2021-10/2021</p>
              <p className="text">
                - Dưới đây là một số đoạn code tạo khung Text mẫu dạng HTML CSS
                (đóng khung text văn bản trong HTML hoặc code tạo khung HTML) để
                anh em chèn vào bài viết cho nó nhí nhảnh tí :v Các mẫu mình
                tham khảo từ nhiều website trong và ngoài nước, thấy ưng cái
                bụng là hốt về để dành chơi :v
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

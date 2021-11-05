import React from "react";
import "./modal.css";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../store/reducers/usersSlice";
function Modal(props) {
  const dispatch = useDispatch();
  const deleteID = props.deleteUsers;
  console.log(deleteID);
  return (
    <div className="modal">
      <button className="close" onClick={() => props.closeModal(false)}>
        x
      </button>
      <div className="modalContainer">
        <div className="title">
          <h3>XTP TECHNOLOGY</h3>
        </div>
        <div className="content">
          <p>Bạn muốn xóa thành viên này ?</p>
        </div>
        <div className="footer">
          <button
            className="cancelBtn button"
            onClick={() => props.closeModal(false)}
          >
            Thoát
          </button>
          <button
            className="okBtn button"
            onClick={() => {
              dispatch(deleteUser(deleteID));
              props.closeModal(false);
            }}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

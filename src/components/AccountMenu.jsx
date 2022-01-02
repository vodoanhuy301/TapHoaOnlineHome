import styled from "styled-components";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import { useState } from "react";
import MyTable from "./MyTable";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../requestsAPI";
const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Menu = styled.div`
  display: flex;
  cursor: pointer;
  ${mediumMobile({ padding: "0px", flexDirection: "column" })};
`;
const ButtonContainer = styled.div`
  display: flex;
`;
const MenuItem = styled.div`
  text-align: center;
  background-color: #c68400;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;
const MyProfile = styled.div`
  margin: 10px;
  padding: 10px;
`;
const MyOrder = styled.div`
  margin: 100px;
  padding: 10px;
  color: black;
`;
const ProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 30px;
`;
const ProfileInput = styled.input`
  padding: 10px;
  margin: 10px;
`;
const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
  background-color: #c68400;
  color: white;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.5s ease;
  &:hover {
    background-color: #ffb300;
    color: white;
  }
`;
const ProfileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProfileItemTitle = styled.div`
  color: black;
`;
const Warning = styled.span`
  color: orange;
`;
const Done= styled.span`
  color: green;
`;
function AccountMenu() {
  const [profileClick, setProfileClick] = useState(true);
  const [orderClick, setOrderClick] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const [editInput, setEditInput] = useState(true);
  const [username, setUserName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const uid = user._id;
  const handleClickEdit = () => {
    setEditInput(false);
  };
  const handleClickCancel = () => {
    setUserName(user.username);
    setEmail(user.email);
    setEditInput(false);
    setPassword("");
    setEditInput(true);
  };
  const handleClickEditSave = async () => {
    try {
      if (password.trim() =="") {
        var res = await userRequest.put(`/users/${user._id}`, {
            username,
            email
          });
      } else {
        var res = await userRequest.put(`/users/${user._id}`, { username, email, password });
      }
    } catch (err) {
      setError(true);
    }
    setDone(true);
    setEditInput(true);
  };
  const handleClickProfile = () => {
    if (orderClick) {
      setOrderClick(false);
      setProfileClick(!profileClick);
    }
  };
  const handleClickOrder = () => {
    if (profileClick) {
      setProfileClick(false);
      setOrderClick(!orderClick);
    }
  };
  return (
    <Container>
      <Menu>
        <MenuItem onClick={handleClickProfile}>Thông tin tài khoản</MenuItem>
        <MenuItem onClick={handleClickOrder}>Đơn hàng của tôi</MenuItem>
      </Menu>
      {profileClick && (
        <MyProfile>
          <h1>Thông tin tài khoản</h1>
          <ProfileForm>
            <ProfileItem>
              <ProfileItemTitle>Tên tài khoản</ProfileItemTitle>
              <ProfileInput
                type="text"
                value={username}
                disabled={editInput}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </ProfileItem>
            <ProfileItem>
              <ProfileItemTitle>Email:</ProfileItemTitle>
              <ProfileInput
                type="text"
                placeholder="Email"
                value={email}
                disabled={editInput}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </ProfileItem>
            <ProfileItem>
              <ProfileItemTitle>Mật khẩu:</ProfileItemTitle>
              <ProfileInput
                type="password"
                value={password}
                disabled={editInput}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </ProfileItem>
            <ButtonContainer>
              <Button onClick={handleClickEdit}>Sửa</Button>
              <Button onClick={handleClickEditSave}>Lưu</Button>
              <Button onClick={handleClickCancel}>Hủy</Button>
            </ButtonContainer>
            {error&& <Warning>Lỗi!!! Vui lòng kiểm tra lại!</Warning>}
          {done&& <Done>Đã lưu!!</Done>}
          </ProfileForm>

        </MyProfile>
      )}
      {orderClick && (
        <MyOrder>
          <h1>Đơn hàng</h1>
          <MyTable uid={uid} />
        </MyOrder>
      )}
    </Container>
  );
}

export default AccountMenu;

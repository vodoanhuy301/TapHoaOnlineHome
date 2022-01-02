import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/APICall";
import { useState } from "react";
import { Link } from 'react-router-dom';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  );
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const MiniLink = styled(Link)`
  margin: 5px 0px;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>ĐĂNG NHẬP</Title>
        <Form>
          <Input
            placeholder="Tên tài khoản"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>Đăng nhập</Button>
          {error && <Error>Lỗi! Vui lòng kiểm tra lại tên tài khoản và mật khẩu</Error>}
          <MiniLink>Quên mật khẩu</MiniLink>
          <MiniLink to="/dangki">Tạo tài khoản</MiniLink>
          <MiniLink to="/">Trở về trang chủ</MiniLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

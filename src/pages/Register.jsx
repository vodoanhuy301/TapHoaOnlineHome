import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/APICall";
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
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;


const Button = styled.button`
  width: 40%;
  border: none;
  margin-top: 10px;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const MiniLink = styled(Link)`
  margin: 10px;
  font-size: 16px;
`;
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isSending, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    signup(dispatch, { username, email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Tạo tài khoản</Title>
        <Form>
          <Input placeholder="Tên tài khoản" onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Mật khẩu " type="password" onChange={(e) => setPassword(e.target.value)}/>
          <Button onClick={handleClick} disabled={isSending}>ĐĂNG KÍ</Button>
          <MiniLink to="/">Trở về trang chủ</MiniLink>
        </Form>
   
      </Wrapper>

    </Container>
  );
};

export default Register;
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addInfo } from "../redux/userRedux";
import { useHistory } from "react-router";
import {Link} from "react-router-dom";
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
  font-size: 36px;
  font-weight: 500;
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
const Total = styled.span`
  color: red;
  font-size: 30px;
`;
const Payment = () => {
  const user = useSelector((state) => state.user);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const totalPay = useSelector((state) => state.cart.totalPay);
  const checkInfo=()=>{
    if (name==="" || address===""||phone===""){
      alert("Vui lòng nhập đầy đủ thông tin");
    }
    else{
      dispatch(addInfo({name, address, phone}));
    history.push("/thanhtoanthanhcong");
    }
  }
  const handleClick =async (e) => {
    e.preventDefault();
    await checkInfo();
  };
  return (
    <Container>
      <Wrapper>
        <Title>Thanh toán</Title>
        <Form>
          <Total>{"Tổng tiền phải trả là: " + totalPay+ "đ"}</Total>
          <Input
            placeholder="Tên người nhận hàng"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Số điện thoại"
            onChange={(e) => setPhone(e.target.value)}

          />
          <Input
            placeholder="Địa chỉ nhận hàng"
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={handleClick}>THANH TOÁN</Button>
          <MiniLink to="/">Trở lại trang chủ</MiniLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Payment;

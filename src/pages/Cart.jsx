import { Add, OtherHouses, Remove } from "@mui/icons-material/";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import SearchForMedium from "../components/SearchForMedium";
import { useSelector, useDispatch } from "react-redux";
import {
  addAmountProduct,
  reduceAmountProduct,
  addTotalPay,
  removeProduct,
  resetCart,
} from "../redux/cartRedux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../requestsAPI";
import { useHistory } from "react-router";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${largeDevice({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
  font-size: 18px;
  margin: 10px;
  display: block;
`;
const RemoveProduct = styled.span`
  color: orange;
  margin-left: 50px;
  text-decoration: underline;
  cursor: pointer;
`;
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const removeProductClick = (key) => () => {
    dispatch(removeProduct(key));
    console.log(key);
  };
  const handleClickPlus = (key) => () => {
    // console.log(key);
    dispatch(addAmountProduct(key));
  };
  const handleClickMinus = (key) => () => {
    // console.log(key);
    dispatch(reduceAmountProduct(key));
  };
  const shippingFee = 15000;
  const totalPay = shippingFee + cart.total;

  const handlePayClick = async () => {
    if (user) {
      await dispatch(addTotalPay(totalPay));
       await history.push("/thanhtoan");
    }
  };
  function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " đ";
  }
  return (
    <Container>
      <Navbar />
      <SearchForMedium />
      <Wrapper>
        <Title>Giỏ hàng của tôi</Title>
        <TopTexts>
          <TopText>{"Giỏ hàng(" + cart.quantity + ")"}</TopText>
          <TopText onClick={() => dispatch(resetCart())}>
            Tạo giỏ hàng mới
          </TopText>
        </TopTexts>
        <Top>
          <Link to="/">
            <TopButton>Tiếp tục mua sắm</TopButton>
          </Link>
          <TopButton type="filled">Thanh toán</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, key) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Sản phẩm:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add key={key} onClick={handleClickPlus(key)} />
                    <ProductAmount>{product.amount}</ProductAmount>
                    <Remove key={key} onClick={handleClickMinus(key)} />
                    <RemoveProduct key={key} onClick={removeProductClick(key)}>
                      Xóa
                    </RemoveProduct>
                  </ProductAmountContainer>
                  <ProductPrice>
                    {currencyFormat(product.price * product.amount)}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Tổng cộng</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Tổng tiền hàng</SummaryItemText>
              <SummaryItemPrice>{currencyFormat(cart.total)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Phí ship</SummaryItemText>
              <SummaryItemPrice>{currencyFormat(shippingFee)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng cộng</SummaryItemText>
              <SummaryItemPrice>{currencyFormat(totalPay)}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handlePayClick}>Thanh toán ngay</Button>
            {!user && (
              <Error>Vui lòng đăng nhập tài khoản để thanh toán!</Error>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

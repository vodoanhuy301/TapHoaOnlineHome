import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material/";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { style } from "@mui/system";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Overlay = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  margin: 5px;
  border-radius: 3px;
  overflow: hidden;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const Title = styled.div`
  color: teal;
  padding: 10px;
  cursor: pointer;
`;
const PriceTitle = styled.div`
  color: orange;
  padding: 10px;
`;

const Image = styled.img`
  height: 75%;
  z-index: 1;
`;

const Icon = styled.div`
  color: rgba(0, 0, 0, 0.4);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: rgb(3, 173, 173);
    transform: scale(1.3);
    color: white;
  }
`;
  const LinkStyle = styled(Link)`
  color:rgba(0, 0, 0, 0.4);
  &:hover {
    color:white;
  }
  `;
  const LinkItem = styled(Link)`
  text-decoration:none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:3;
  width: 100%;
  padding-bottom: 18px;
  &:hover {
    background-color:rgba(255, 255, 255, 0.9)
  }
  `;

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const amount = 1;
  const handleClick = () => {
    dispatch(addProduct({...item, amount}));
  }
  function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ";
 }
  return (
    <Container>
      <Image src={item.img} />
      <Overlay>
        <Icon onClick={handleClick}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <LinkStyle to={`/sanpham/${item._id}`}>
          <SearchOutlined />
          </LinkStyle>
        </Icon>
      </Overlay>
      <LinkItem to={`/sanpham/${item._id}`}>
      <Title>{item.title}</Title>
      <PriceTitle>{currencyFormat(item.price)}</PriceTitle>
      </LinkItem>
      
    </Container>
  );
};

export default Product;

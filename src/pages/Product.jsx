import { Add, Remove } from "@mui/icons-material/";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import SearchForMedium from "../components/SearchForMedium";
import { useLocation } from "react-router";
import {publicRequest} from "../requestsAPI";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mediumMobile({ padding: "10px", flexDirection:"column" })}
  ${largeDevice({flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  border-radius: 3px;
  ${mediumMobile({ height: "30vh" })};
  ${largeDevice({ height: "50vh" })};
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 500;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 20px;
  line-height: 30px;
`;

const Price = styled.span`
  font-weight: 500;
  font-size: 40px;
  color: rgb(255, 186, 96);

`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 300;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  font-size: 28px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  padding: 7px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
  ${largeDevice({fontSize: "12px" })};
`;
const PlusMinus = {
  cursor: "pointer",
  border: "1px solid gray",
  borderRadius: "5px",
  fontSize: "32px",
}
const Product = () => {
  const Location = useLocation();
  const idProduct = Location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [priceFormat, setPriceFormat] = useState("");
  const [color, setColor] = useState("");
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({...product,amount, color}));
  }
  function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ";
 };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" +idProduct);
        setProduct(res.data);
        setPriceFormat(currencyFormat(res.data.price));
      } catch {}
    };
    getProduct();
  }, [idProduct]);
  return (
    <Container>
      <Navbar />
      <SearchForMedium />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
          </Desc>
          <Price>Giá: {priceFormat}</Price>
          { !product.color?.includes("")&&
          <FilterContainer>
          <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) =>{
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              })}
          </Filter>
        </FilterContainer>
          } 
          <AddContainer>
            <AmountContainer>
              <Remove onClick={(e)=>{setAmount(amount > 1 ? amount -1 : amount)}}  style={PlusMinus}/>
              <Amount>{amount}</Amount>
              <Add onClick={(e)=>{setAmount(amount +1)}} style={PlusMinus}/>
            </AmountContainer>
            <Button onClick={handleClick}>Thêm vào giỏ hàng</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
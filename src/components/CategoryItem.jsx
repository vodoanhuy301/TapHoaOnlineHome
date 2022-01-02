import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";

const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.7;
  object-fit: cover;
  transition: all 0.5s ease;
  ${mobile({ height: "20vh" })};
  ${mediumMobile({ height: "30vh" })};

`;
const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 30vh;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  &:hover ${Image} {
    opacity: 1;
  }
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0, 0.4);
`;

const Title = styled.h1`
  color: #ffe54c;
  margin-bottom: 20px;
  font-size: 42px;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px;
  background-color: white;
  color: gray;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/danhmuc/${item.category}`}>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>MUA NGAY</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;

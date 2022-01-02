import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import SearchForMedium from "../components/SearchForMedium";
import styled from "styled-components";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import RasaChatBot from "../components/RasaChatBot";

const Container = styled.div`
  width: 100%;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-size: 42px;
  color: #ffb300;
  ${largeDevice({ fontSize: "30px" })};
  ${mediumMobile({ fontSize: "24px" })};
`;
const Home = () => {
  return (
    <Container>
      <Navbar />
      <SearchForMedium />
      <Slider />
      <Categories />
      <TitleContainer>
        <Title>Các sản phẩm phổ biến</Title>
      </TitleContainer>
      <Products/>
      <Footer />
      <RasaChatBot/>
    </Container>
  );
};

export default Home;

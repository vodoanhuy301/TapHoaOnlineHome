import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material/";
import styled from "styled-components";
import { sliderItems } from "./data";
import { useState, useEffect } from "react";
import axios from "axios";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  ${mobile({ height: "10vh" })};
  ${mediumMobile({ height: "20vh" })};
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(0, 128, 128, 0.4);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "20px"};
  right: ${(props) => props.direction === "right" && "20px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  ${mediumMobile({ height: "30px", width: "30px" })};
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  width: 100vw;
  height: 30vh;
  align-items: center;
  background-color: #${(props) => props.bg};
  justify-content: center;
  ${mediumMobile({ height: "20vh" })};
  ${mobile({ height: "20vh" })};
`;
const Image = styled.img`
  height: 100%;
`;
const ImgContainer = styled.div`
  height: 100%;
`;
const TitleContainer = styled.div`
  padding: 50px;
  ${mediumMobile({ padding: "10px" })};
`;
const Title = styled.h1`
  font-size: 30px;
  ${mediumMobile({ fontSize: "18px" })};
  ${mobile({ fontSize: "16px" })};
`;

const Desc = styled.p`
  margin: 30px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mediumMobile({ fontSize: "14px", margin: "10px 0" })};
  ${mobile({ fontSize: "12px", margin: "10px 0" })};
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  border-style: solid;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
  ${mediumMobile({ fontSize: "16px" })};
  ${mobile({ fontSize: "14px" })};
`;
const Slider = () => {
  const [sliderItems, setSliderItems] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  useEffect(() => {
    const getSliderItems = async () => {
      const res = await axios
        .get("http://localhost:3001/api/banners")
        .then((res) => {
          setSliderItems(res.data);
        });
    };
    getSliderItems();
  }, []);

  const clickSlider = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length-1);
    } else
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
  };
  return (
    <Container>
      <Arrow direction="left" onClick={() => clickSlider("left")}>
        <KeyboardArrowLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item, key) => (
          <Slide bg={item.bgColor} key={key}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <TitleContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              {item.link&&<Link to={item.link}>
                <Button>XEM NGAY</Button>
              </Link>}
              
            </TitleContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => clickSlider("right")}>
        <KeyboardArrowRight />
      </Arrow>
    </Container>
  );
};

export default Slider;

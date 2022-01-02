import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import SearchForMedium from "../components/SearchForMedium";
import { useLocation } from "react-router";
import { useState } from 'react';

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const Location = useLocation();
  const category = Location.pathname.split('/')[2];
  const search = Location.pathname.split('/')[3];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const handleFilters = (e) =>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    });
  }
  return (
    <Container>

      <Navbar />
      <Title>Các sản phẩm</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Lọc sản phẩm:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option value="none">
              Màu
            </Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option value="none">
              Kích cỡ
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sắp xếp theo:</FilterText>
          <Select onChange={(e)=> setSort(e.target.value)}>
            <Option value="newest">Mới nhất</Option>
            <Option value="asc">Giá tăng</Option>
            <Option value="desc">Giá giảm</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products category={category} search={search} filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
};

export default ProductList;

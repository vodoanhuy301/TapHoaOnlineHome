import styled from "styled-components";
import Product from "./Product";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ProductsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category, search, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        if (category) {
          var res = await axios.get(
            `http://localhost:3001/api/products/?category=${category}`
          );
        }
        else if (search) {
          var res = await axios.get(
            `http://localhost:3001/api/products/findname/${search}`);
        }
        else {
          var res = await axios.get(
            "http://localhost:3001/api/products/");
        }
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [category,search]);
  const newestSort = () => {
    setFilteredProducts((prev) =>
      [...prev].sort(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
      )
    );
  };
  // console.log(filters);
  useEffect(() => {
    if (category || search) 
      setFilteredProducts(
        Object.values(filters).includes("none")
          ? products
          : products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
      );
    newestSort();
  }, [products, category, filters, search]);
  // console.log(sort);
  // console.log([...filteredProducts].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)));
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        )
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      <ProductsContainer>
        {category || search
          ? filteredProducts.map((item) => (
              <Product item={item} key={item.id} />
            ))
          : products
              .slice(0, 8)
              .map((item) => <Product item={item} key={item.id} />)}
      </ProductsContainer>
    </Container>
  );
};

export default Products;

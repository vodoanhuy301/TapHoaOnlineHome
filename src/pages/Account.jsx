import React from "react";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import SearchForMedium from "../components/SearchForMedium";
import styled from "styled-components";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import AccountMenu from './../components/AccountMenu';

const Container = styled.div`
  width: 100%;
`;
const Account = () => {
  return (
    <Container>
      <Navbar />
      <SearchForMedium />
      <AccountMenu/>
      <Footer />
    </Container>
  );
};

export default Account;
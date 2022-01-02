import { Search, ShoppingBasketOutlined } from "@mui/icons-material/";
import Badge from "@mui/material/Badge";
import styled from "styled-components";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userRedux";
import { useState } from "react";
import { useHistory } from "react-router";

const Container = styled.div`
  height: 60px;
  width: 100%;
  padding-bottom: 10px;
  ${mobile({ height: "50px" })};
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })};
  ${mediumMobile({ display: "none" })};
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  width: 50%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
  border-radius: 5px;
  ${largeDevice({ width: "50%" })};
`;
const Input = styled.input`
  border: none;
  height: 20px;
  width: 100%;
  &:focus {
    outline: none;
  }
  ${largeDevice({ height: "15px" })};
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mediumMobile({ textAlign: "left" })};
`;
const Logo = styled.h1`
  font-weight: bold;
  color: #ffb300;
  cursor: pointer;
  ${mobile({ fontSize: "13px" })};
  ${largeDevice({ fontSize: "16px" })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "flex-end", marginRight: "30px" })};
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 20px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;
function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [searchText, setSearchText]= useState("");
  const dispatch = useDispatch();
  const handleSearch =() =>{
    history.push("/timkiem/sanpham/"+searchText);
  }
  const handleLogout = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(logout());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Tìm kiếm" onChange={(e)=> setSearchText(e.target.value)} onKeyPress={(e)=>{e.key=="Enter"&& handleSearch()}}/>
            <Search
              style={{ fontSize: 16, color: "gray", cursor: "pointer" }}
              onClick={()=>{handleSearch()}}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>TẠP HÓA ONLINE</Logo>
          </Link>
        </Center>
        <Right>
          { user ? 
          <Link to="/taikhoan" style={{textDecoration: 'none', color: 'black'}}>
          <MenuItem>Xin chào {user.username}</MenuItem>
          </Link>
        : 
        <Link to="/dangki" style={{textDecoration: 'none', color: 'black'}}>
        <MenuItem>ĐĂNG KÍ</MenuItem>
        </Link>
        }
        {!user && <Link to="/dangnhap" style={{textDecoration: 'none',color: 'black'}}>
          <MenuItem>ĐĂNG NHẬP</MenuItem>
        </Link>}
        { user && <MenuItem onClick={handleLogout}>Đăng Xuất</MenuItem>}
          <Link to="/giohang" style={{ color: "black"}}>
            <MenuItem>
              <Badge badgeContent={quantity} color="warning">
                <ShoppingBasketOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;

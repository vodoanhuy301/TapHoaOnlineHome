import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
} from "@mui/icons-material/";
import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from "react-router-dom";
const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  justitfy-content:center;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  display:flex;
  align-items: center;
  justitfy-content:center;
  flex-direction: column;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  font-size: 26px;
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;

`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  display:flex;
  align-items: center;
  justitfy-content:center;
  flex-direction: column;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>TẠP HÓA ONLINE</Logo>
        <Desc>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore quos fuga aperiam consectetur laboriosam dolores est eos nihil eveniet et atque dolor voluptates quod, laudantium maxime quibusdam dignissimos soluta nemo!
        </Desc>
      </Left>
      <Center>
        <Title>Các liên kết</Title>
        <List>
          <ListItem>
          <Link to="/">Trang chủ</Link>
          </ListItem>
          <ListItem>
          <Link to="/giohang">Giỏ hàng</Link>
          </ListItem>
          <ListItem>
          <Link to="/danhmuc/Thuc-pham">Thực phẩm</Link>
          </ListItem>
          <ListItem>
          <Link to="/danhmuc/Banh-keo">Bánh kẹo</Link>
          </ListItem>
          <ListItem>
          <Link to="/danhmuc/Gia-dung">Đồ gia dụng</Link>
          </ListItem>
          <ListItem>
          <Link to="/taikhoan">Tài khoản</Link>
          </ListItem>
          <ListItem>Quy định - chính sách</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/>cái này là địa chỉ
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/>đây là số điện thoại
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} />đây là email 
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;
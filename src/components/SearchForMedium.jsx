import { Search} from "@mui/icons-material/";
import styled from "styled-components";
import { mobile, mediumMobile, largeDevice, XlargeDevice } from "../responsive";
import { useState } from "react";
import { useHistory } from "react-router";
const Container = styled.div`
  border: 0.5px solid lightgray;
  display: none;
  align-items: center;
  margin: 10px 20px;
  padding: 5px;
  border-radius: 5px;
  ${mobile({display:"flex"})};
  ${mediumMobile({display:"flex"})};
`;
const Input = styled.input`
  border: none;
  height: 20px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;
function SearchForMedium() {
  const [searchText, setSearchText]= useState("");
  const history = useHistory();
  const handleSearch =() =>{
    history.push("/timkiem/sanpham/"+searchText);
  }
  return (
    <Container>
     <Input placeholder="Tìm kiếm" onChange={(e)=> setSearchText(e.target.value)} onKeyPress={(e)=>{e.key=="Enter"&& handleSearch()}}/>
            <Search
              style={{ fontSize: 16, color: "gray", cursor: "pointer" }}
              onClick={()=>{handleSearch()}}
            />
    </Container>
  )
}

export default SearchForMedium

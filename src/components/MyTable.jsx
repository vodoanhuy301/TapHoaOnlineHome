import { DataGrid } from "@mui/x-data-grid";
import { useState,useEffect } from "react";
import {userRequest} from "../requestsAPI";
import styled from "styled-components";
import { useHistory } from 'react-router';

const ButtonEdit = styled.div`
  border: none;
  border-radius: 10px;
  padding: 5px 20px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 10px;
`;

const MyTable =({uid}) => {
const [orders,setOrders] = useState([]);
const history = useHistory();
const test = [];
  useEffect(() => {
    const getOrders = async () => {
      console.log(uid);
      try {
        const res = await userRequest.get(`http://localhost:3001/api/orders/userFind/${uid}`);
        setOrders(res.data);
      } catch (err) {}
    };
    getOrders();
  }, []);
  orders.map((order) =>{
    const {products, userId, updatedAt, __v,...others} = order;
    test.push(others)});
    test.map((order)=>{
      order['id'] = order['_id'];
      delete order['_id'];
  });
  const handleDetail =(id) =>{
    history.push(`/donhang/${id}`);
  }
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Họ và tên", width: 150 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Tổng tiền",
      type: "number",
      width: 90,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 200,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
    },
    {
      field: "action",
      headerName: " ",
      width: 150,
      renderCell: (params) => {
        return (
              <ButtonEdit onClick={(e) => handleDetail(params.row.id)}>Xem chi tiết</ButtonEdit>
        );
      },
    },
  ];
  return (

    <div style={{ height: 400, width: 1500 }}>
      <DataGrid
        rows={test}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
export default MyTable;

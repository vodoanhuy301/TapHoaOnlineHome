import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userRequest } from "../requestsAPI";
import { resetCart } from "../redux/cartRedux";
import { useHistory } from 'react-router';

const Success = () => {
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history =useHistory();
  const [orderId, setOrderId] = useState(null);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            productName: item.title,
            price: item.price,
            quantity: item.amount,
          })),
          amount: cart.totalPay,
          name: user.name,
          phone: user.phone,
          address: user.address,
        });
        setOrderId(res.data._id);
        console.log(res.data);
      } catch {}
    //   var test ={userId: currentUser._id,
    //   products: cart.products.map((item) => ({
    //     productId: item._id,
    //     productName: item.title,
    //     price: item.price,
    //     quantity: item.amount,
    //   })),
    //   amount: cart.totalPay,
    //   name: user.name,
    //   phone: user.phone,
    //   address: user.address,
    // }
    //   console.log(test);
    };
    createOrder();
  }, [cart, user]);
  const handlePaid = (e) => {
    e.preventDefault();
    dispatch(resetCart());
    history.push("/");
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "30px",
      }}
    >
      {orderId
        ? `Đặt hàng thành công!! Đơn hàng của bạn đã được tạo, mã đơn hàng là ${orderId}`
        : `Đặt hàng thành công, đơn hàng của bạn đang được tạo...`}
      <button style={{ padding: 10, marginTop: 20 }} onClick={handlePaid}>
        Trở về trang chủ
      </button>
    </div>
  );
};

export default Success;

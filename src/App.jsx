import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import ResultProduct from "./pages/ResultProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import OrderDetail from "./pages/OrderDetail";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Account from "./pages/Account";
import Payment from "./pages/Payment";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/tatcasanpham">
          <Products />
        </Route>
        <Route path="/sanpham/:id">
          <Product />
        </Route>
        <Route path="/danhmuc/:category">
          <Products />
        </Route>
        <Route path="/timkiem/sanpham/">
          <ResultProduct />
        </Route>
        <Route path="/giohang">
          <Cart />
        </Route>
        <Route path="/donhang/:id">
          <OrderDetail/>
        </Route>
        <Route path="/thanhtoanthanhcong">
          <Success />
        </Route>
        <Route path="/dangnhap">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/dangki">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/taikhoan">
          <Account />
        </Route>
        <Route path="/thanhtoan">
          <Payment />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import HomeNavigation from "./routes/home-navigation/home-navigation";
import Home from "./routes/home/home";
import Authentication from "./routes/authentication/authentication";
import Shop from './routes/shop/shop.jsx';
import Checkout from './routes/checkout/checkout.jsx';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<HomeNavigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;

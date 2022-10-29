import { Routes, Route, Navigate } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";
import NewOrder from "./pages/NewOrder/NewOrder";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/NewOrder" />} />
      <Route path="/NewOrder" element={<OrderProvider />}>
        <Route index element={<NewOrder />} />
      </Route>
      {/* <Route path="/Customers" element={<Customers />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Login" element={<Login />} /> */}
    </Routes>
  );
};

export default AppRoutes;

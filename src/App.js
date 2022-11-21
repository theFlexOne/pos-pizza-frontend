import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Box } from "@mui/material";
import Layout from "./components/Layout";
import Customers from "./pages/Customers/Customers";
import Settings from "./pages/Settings/Settings";
import useDragScroll from "./hooks/useDragScroll";
import Login from "./pages/Login/Login";
import Order from "./pages/Order/Order";
import { useEffect, useMemo, useState } from "react";
import useApp from "./hooks/useApp";
import { UserProvider } from "./context/UserContext";
import { useAppData } from "./context/AppDataContext";

function App() {
  const dragScrollEvents = useDragScroll();

  return (
    <Layout>
      <Box {...dragScrollEvents}>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="login" />} />
            <Route path="order/*" element={<Order />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Box>
    </Layout>
  );
}

export default App;

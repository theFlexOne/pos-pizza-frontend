import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuItems from "./MenuItems";
import MenuSectionBar from "./MenuSectionBar";
import Cart from "./Cart";
import CustomerInfoBox from "./CustomerInfoBox";
import useStyles from "../../../../hooks/useStyles";
import { useNavigate } from "react-router-dom";

const MainPanel = ({ menu }) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  console.log(`menu: `, menu);
  const styles = useStyles().menu;

  return (
    <Box sx={styles.mainPanel}>
      <MenuSectionBar
        sections={menu.map(({ section }) => section)}
        index={sectionIndex}
        changeSection={(id) => setSectionIndex(id)}
      />
      <MenuItems section={menu[sectionIndex]} flex="1" />
    </Box>
  );
};

const SidePanel = ({ navigateToCustomer }) => {
  const styles = useStyles().menu;
  return (
    <Box sx={styles.sidePanel}>
      <CustomerInfoBox navigateToCustomer={navigateToCustomer} />
      <Divider sx={{ borderColor: "rgba(0,0,0,0.5)" }} />
      <Cart />
    </Box>
  );
};

export default function Menu({ menu }) {
  const navigate = useNavigate();

  return (
    <>
      <MainPanel menu={menu} />
      <SidePanel navigateToCustomer={() => navigate("../customer")} />
    </>
  );
}

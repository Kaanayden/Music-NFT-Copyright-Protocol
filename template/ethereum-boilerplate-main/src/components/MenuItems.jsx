import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "left",
        marginLeft: "50px",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/home">
        <NavLink to="/home">Home</NavLink>
      </Menu.Item>
      <Menu.Item key="/marketplace">
        <NavLink to="/marketplace">Marketplace</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;

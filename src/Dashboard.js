import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;



const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true); // Initially set to dark theme

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const onMenuItemClick = () => {
  };

  const theme = darkTheme ? "dark" : "light";

  const menuItemStyles = {
    color: darkTheme ? "inherit" : "black",
  };

  const bottomButtonStyle = {
    color: darkTheme ? "dark" : "light"
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme={theme}>
        <div className="logo" />
        <Menu theme={theme} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />} style={menuItemStyles}>
            <Link to="/dashboard" style={{color: darkTheme ? "Light" : "Dark"}}><div style={{ color: darkTheme ? "white" : "black" }}>Home</div></Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />} style={menuItemStyles}>
            <Link to="/dashboard/movies" ><div style={{ color: darkTheme ? "white" : "black" }}>Chart</div></Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />} style={menuItemStyles}>
            <Link to="/dashboard/upload" onClick={onMenuItemClick} ><div style={{ color: darkTheme ? "white" : "black" }}>Upload</div>
</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            ...(!darkTheme && menuItemStyles), // Apply light theme styles
          }}
        >
          <Button onClick={toggleMenu}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Button
            onClick={toggleTheme}
            style={bottomButtonStyle} // Apply separate style to the bottom button
          >
            Switch to {darkTheme ? "Light" : "Dark"} Theme
          </Button>
        </Header>
        <Content
          style={{
            margin: "16px",
            ...(!darkTheme && menuItemStyles), // Apply light theme styles
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              ...(!darkTheme && menuItemStyles), // Apply light theme styles
            }}
          >
            {/* Content of your dashboard goes here */}
            
            {/* Your other content here */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

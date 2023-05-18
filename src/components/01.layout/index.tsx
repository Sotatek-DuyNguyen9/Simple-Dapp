import React from "react";
import "./styles.scss";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

interface ILayoutProps {
  children?: React.ReactNode;
}

const LayoutDefault: React.FC<ILayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout id="layout">
      <Header className="header">
        <div className="header-logo">
          <img
            src="https://htmldemo.net/lendex/p2/img/logo.png"
            alt="logo"
            height="100%"
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ width: "100%" }}
        >
          <Menu.Item key="information">
            <Link to="/information">
              <span className="header-nav">Information</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="tranfer">
            <Link to="/tranfer">
              <span className="header-nav">Tranfer</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default LayoutDefault;

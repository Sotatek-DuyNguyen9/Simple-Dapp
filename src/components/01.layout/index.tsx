import React from "react";
import "./styles.scss";
import { Layout, Menu, theme, Button, Modal, message } from "antd";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../../connectors";
import { Link } from "react-router-dom";
import { Buffer } from 'buffer';

const { Header, Content, Footer } = Layout;

interface ILayoutProps {
  children?: React.ReactNode;
}

const LayoutDefault: React.FC<ILayoutProps> = ({ children }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { active, account, activate, deactivate } = useWeb3React();
  (window as any).Buffer = Buffer;

  React.useEffect(() => {
    if(!active) setShowModal(true);
    else setShowModal(false);
  }, [active]);

  React.useEffect(() => {
    const init = async () => {
      // const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      // if(chainId !== "97") setShowNotification(true);
      // else setShowNotification(false);

      (window as any).ethereum.on('accountsChanged', () => {
        messageApi.info('Account changed!');
      });

      (window as any).ethereum.on('networkChanged', (networkId: string) => {
        console.log('networkChanged: ',networkId);

        if(networkId !== "97") setShowNotification(true);
        else setShowNotification(false);
      });
    }

    init();
    console.log("Call init")
  }, []);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function connectWallet() {
    // setShowModal(false);
    try {
      const result = await activate(walletconnect, undefined, true);
      console.log(result);
    } catch (ex) {
      console.log(ex);
    }
  }

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
          <Menu.Item key="design">
            <Link to="/design">
              <span className="header-nav">Design</span>
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
          <Modal
            open={showModal}
            closable={false}
            title="You need to connect to wallet"
            footer={[
              <Button
                key="metamask"
                type="primary"
                onClick={connect}
              >
                Connect Metamask
              </Button>,
              <Button
                key="wallet"
                type="primary"
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>,
            ]}
          >
            <p>Choose one of the following methods...</p>
          </Modal>
          <Modal
            open={showNotification}
            closable={false}
            title="Wrong network"
            className="notification-modal"
            // footer={null}
          >
            <p>You need to change to BSC network to use our services</p>
          </Modal>
          {contextHolder}
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutDefault;

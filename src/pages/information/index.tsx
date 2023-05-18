import React from "react";
import "./styles.scss";
import Web3 from "web3";
import erc20Abi from "../../web3/abis/erc20.json";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../connectors";
import { Button } from "antd";

// import { init } from "../../web3/connectors";

export const Information: React.FC = () => {
  const [allowance, setAllowance] = React.useState();
  const [coinBalance, setCoinBalance] = React.useState();
  const [customTokenBalance, setCustomTokenBalance] = React.useState();
  const { active, account, library, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);

      const balance = await library?.getBalance(account as any);
      console.log(balance);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      setCoinBalance(0 as any);
      setCustomTokenBalance(0 as any);
    } catch (ex) {
      console.log(ex);
    }
  }

  const getCoinBalance = async () => {
    if (!account) return;
    (window as any).ethereum
      .request({
        method: "eth_getBalance",
        params: [String(account)],
      })
      .then((balance: any) => {
        setCoinBalance((Web3 as any).utils.fromWei(balance));
      })
      .catch((err: any) => console.log(err));
  };

  const getCustomTokenBalance = async () => {
    if (!account) return;
    const web3 = new Web3((window as any).ethereum);

    const erc20Contract = new web3.eth.Contract(
      erc20Abi as any,
      "0x8d1E1b97957DA2012E6a5E96C3af3aFEbf86D85E"
    );

    erc20Contract.methods
      .balanceOf(account)
      .call()
      .then((balance: any) => {
        // setCustomTokenBalance((Web3 as any).utils.fromWei(balance));
        setCustomTokenBalance((Web3 as any).utils.fromWei(balance));
      })
      .catch((err: any) => console.log(err));
  };

  const getAllowance = async () => {
    if (!account) return;
    const web3 = new Web3((window as any).ethereum);

    const erc20Contract = new web3.eth.Contract(
      erc20Abi as any,
      "0x8d1E1b97957DA2012E6a5E96C3af3aFEbf86D85E"
    );

    erc20Contract.methods.allowance(account, "0x8d1E1b97957DA2012E6a5E96C3af3aFEbf86D85E").call()
        .then((balance: any) => {
          setAllowance(balance);
        })
        .catch((err: any) => console.log(err));
  };

  React.useEffect(() => {
    getAllowance();
    getCoinBalance();
    getCustomTokenBalance();
  }, [account]);

  // React.useEffect(() => {
  //   const connectWalletOnPageLoad = async () => {
  //     if (localStorage?.getItem('isWalletConnected') === 'true') {
  //       try {
  //         await activate(injected)
  //         localStorage.setItem('isWalletConnected', true)
  //       } catch (ex) {
  //         console.log(ex)
  //       }
  //     }
  //   }
  //   connectWalletOnPageLoad()
  // }, [])

  return (
    <div className="information">
      <Button type="primary" className="information__btn" onClick={connect}>
        Connect to MetaMask
      </Button>

      <Button type="primary" onClick={disconnect}>
        Disconnect
      </Button>

      {active ? (
        <div>
          <h3>Connected with Metamask</h3>
          <h3>Address: {account}</h3>
          <h3>Allowance: {allowance}</h3>
          <h3>Coin balance: {coinBalance}</h3>
          <h3>Custom token balance: {customTokenBalance}</h3>
        </div>
      ) : (
        <h3>Not connected</h3>
      )}
    </div>
  );
};

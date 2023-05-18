import React, { useEffect } from "react";
import "./styles.scss";
import Web3 from "web3";
import erc20Abi from "../../web3/abis/erc20.json";
import { Button, Input, message, Typography } from "antd";
import { getCoinBalance, getCustomTokenBalance } from "../../share/getInfoToken";
import { useWeb3React } from "@web3-react/core";

const { Text, Link } = Typography;

type CustomTokenInfo = {
  name: string; 
  symbol: string; 
  decimals: number; 
  totalSupply: number; 
  balance: number;
};

export const Tranfer: React.FC = () => {
  const [isValid, setIsValid] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [targetAdrr, setTargetAddr] = React.useState("");
  const [coinBalance, setCoinBalance] = React.useState();
  const [customTokenInfo, setCustomTokenInfo] = React.useState<CustomTokenInfo>();
  const [messageApi, contextHolder] = message.useMessage();
  const { account } = useWeb3React();

	const handleInputSearch = async (e : React.ChangeEvent<HTMLInputElement>) => {
    setTargetAddr(e.target.value);
		setIsError(false);
	}

  const handleSearch = async () => {
    const web3 = new Web3((window as any).ethereum);
    const checkValid = web3.utils.isAddress(targetAdrr);
    
    if(checkValid) {
      const customInfo = await getCustomTokenBalance(targetAdrr as string);
      const nativeBalance = await getCoinBalance(targetAdrr as string);
      setCoinBalance(nativeBalance);
			setCustomTokenInfo(customInfo);
		}

    setIsValid(checkValid);
    setIsError(!checkValid);
  }

  const noticeSuccess = () => {
    messageApi.open({
      type: 'success',
      content: 'Send token succeed!',
    });
  };

  const noticeError = () => {
    messageApi.open({
      type: 'error',
      content: 'Send token failed!',
    });
  };

  const handleTranfer = async () => {
    const web3 = new Web3((window as any).ethereum);
    try {
      const erc20Contract = new web3.eth.Contract(
        erc20Abi as any,
        "0x8d1E1b97957DA2012E6a5E96C3af3aFEbf86D85E"
      );

      // const estimatedGas = await erc20Contract.methods.transfer(targetAdrr, amount).estimateGas({ from: account });
      // console.log("estimateGas:", estimatedGas);

      const transactionInfo = await erc20Contract.methods.transfer(targetAdrr, amount).send({ from: account });
      console.log(transactionInfo);
      noticeSuccess();
    } catch (error) {
      noticeError();
      console.log(error);
    }
  }

  return (
    <div className="tranfer">
      {contextHolder}
      <h1>Receiver Address</h1>
      <div className="tranfer__searchbox">
        <Input
          size="large"
          placeholder="Please enter receiver address"
          status={isError ? "error" : ""}
          value={targetAdrr}
          onChange={handleInputSearch}
        />
        <Button size="large" type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

			{isError && <Text type="danger" className="tranfer__helper-text">This address is invalid</Text>}

      {isValid && (
        <div>
          <div>
            <h1>Receiver information</h1>
            <h3>Coin balance: {coinBalance}</h3>
            <h3>Custom token balance: {customTokenInfo?.balance} {customTokenInfo?.symbol}</h3>
          </div>

          <div>
            <h1>Tranfer token</h1>
            <div className="tranfer__searchbox">
              <Input
                size="large"
                placeholder="Please enter amount"
                status={isError ? "error" : ""}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button size="large" type="primary" onClick={handleTranfer}>
                Send token
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

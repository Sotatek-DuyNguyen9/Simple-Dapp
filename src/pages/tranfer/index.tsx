import React, { useEffect } from "react";
import "./styles.scss";
import Web3 from "web3";
import erc20Abi from "../../web3/abis/erc20.json";
import {
  Button,
  Input,
  message,
  Typography,
  Col,
  Divider,
  Row
} from "antd";
import {
  getCoinBalance,
  getCustomTokenBalance,
} from "../../share/getInfoToken";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";

const { Text, Link } = Typography;

type CustomTokenInfo = {
  name: string;
  symbol: string;
  balance: number;
  decimals: number;
  allowance: number;
  totalSupply: number;
};

type LoadingButtonInfo = {
  searchBtn: boolean;
  sendCoinBtn: boolean;
  sendTokenBtn: boolean;
};

export const Tranfer: React.FC = () => {
  const [isValid, setIsValid] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [targetAdrr, setTargetAddr] = React.useState("");
  const [coinBalance, setCoinBalance] = React.useState();
  const [customTokenInfo, setCustomTokenInfo] =
    React.useState<CustomTokenInfo>();
  const [loading, setLoading] = React.useState<LoadingButtonInfo>({
    searchBtn: false,
    sendCoinBtn: false,
    sendTokenBtn: false,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const { account } = useWeb3React();

  const handleInputSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetAddr(e.target.value);
    setIsError(false);
  };

  const handleSearch = async () => {
    const web3 = new Web3((window as any).ethereum);
    const checkValid = web3.utils.isAddress(targetAdrr);

    if (checkValid) {
      setLoading({ ...loading, searchBtn: true });
      const customInfo = await getCustomTokenBalance(targetAdrr as string);
      const nativeBalance = await getCoinBalance(targetAdrr as string);
      setCoinBalance(nativeBalance);
      setCustomTokenInfo(customInfo);
      setLoading({ ...loading, searchBtn: false });
    }

    setIsValid(checkValid);
    setIsError(!checkValid);
  };

  const noticeSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Send token succeed!",
    });
  };

  const noticeError = () => {
    messageApi.open({
      type: "error",
      content: "Send token failed!",
    });
  };

  const handleSendCustomToken = async () => {
    const web3 = new Web3((window as any).ethereum);
    const erc20Contract = new web3.eth.Contract(
      erc20Abi as any,
      process.env.REACT_APP_TOKEN_ADDR
    );

    // const estimatedGas = await erc20Contract.methods.transfer(targetAdrr, amount).estimateGas({ from: account });
    // console.log("estimateGas:", estimatedGas);
    setLoading({ ...loading, sendTokenBtn: true });

    try {
      const transactionInfo = await erc20Contract.methods
        .transfer(targetAdrr, BigNumber(amount).multipliedBy(1e18).toString())
        .send({ from: account });

      console.log(transactionInfo);
      handleSearch();
      noticeSuccess();
    } catch (error) {
      noticeError();
      console.log(error);
    }

    setLoading({ ...loading, sendTokenBtn: false });
  };

  const handleSendNativeToken = async () => {
    // setLoadingSendCoinBtn(true);

    setLoading({
      searchBtn: false,
      sendCoinBtn: true,
      sendTokenBtn: false,
    });

    try {
      const web3 = new Web3((window as any).ethereum);

      const transactionHash = await web3.eth.sendTransaction({
        from: account as string,
        to: targetAdrr as string,
        value: BigNumber(amount).multipliedBy(1e18).toString(),
      });

      console.log(transactionHash);
      handleSearch();
      noticeSuccess();
    } catch (error) {
      noticeError();
      console.log(error);
    }

    setLoading({ ...loading, sendCoinBtn: false });
  };

  return (
    <div className="tranfer">
      {contextHolder}
      <Divider orientation="left" className="primary-divider">
        Find receiver
      </Divider>
      <div className="tranfer__searchbox">
        <Input
          size="large"
          placeholder="Please enter receiver address"
          status={isError ? "error" : ""}
          value={targetAdrr}
          onChange={handleInputSearch}
        />
        <Button
          size="large"
          type="primary"
          onClick={handleSearch}
          loading={loading?.searchBtn}
        >
          Search
        </Button>
      </div>

      {isError && (
        <Text type="danger" className="tranfer__helper-text">
          This address is invalid
        </Text>
      )}

      {isValid && (
        <div>
          <div>
            <Divider orientation="left" className="primary-divider">
              Native token
            </Divider>
            <Row>
              <Col span={2}>
                <p className="primary-text">Address:</p>
              </Col>
              <Col span={10}>
                <p className="hightlight-text">{account}</p>
              </Col>
              <Col span={2}>
                <p className="primary-text">Balance: </p>
              </Col>
              <Col span={10}>
                <p className="hightlight-text">{coinBalance} TBNB</p>
              </Col>
            </Row>
            <Divider orientation="left" className="primary-divider">
              Custom token
            </Divider>
            <Row>
              <Col span={2}>
                <p className="primary-text">Name:</p>
              </Col>
              <Col span={10}>
                <p className="hightlight-text">{customTokenInfo?.name}</p>
              </Col>
              <Col span={2}>
                <p className="primary-text">Total supply: </p>
              </Col>
              <Col span={10}>
                <p className="hightlight-text">
                  {customTokenInfo?.totalSupply} {customTokenInfo?.symbol}
                </p>
              </Col>

              <Col span={2}>
                <p className="primary-text">Allowance: </p>
              </Col>
              <Col span={10}>
                <p className="hightlight-text">
                  {customTokenInfo?.allowance} {customTokenInfo?.symbol}
                </p>
              </Col>
              <Col span={2}>
                <p className="primary-text">Balance:</p>
              </Col>
              <Col span={10}>
                <p className="hightlight-text">
                  {customTokenInfo?.balance} {customTokenInfo?.symbol}
                </p>
              </Col>
            </Row>
          </div>

          <div>
            <Divider orientation="left" className="primary-divider">
              Tranfer token
            </Divider>
            <div className="tranfer__searchbox">
              <Input
                size="large"
                placeholder="Please enter amount"
                status={isError ? "error" : ""}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button
                size="large"
                className="tranfer__sendCoinBtn"
                loading={loading?.sendCoinBtn}
                onClick={handleSendNativeToken}
              >
                Send coin
              </Button>
              <Button
                size="large"
                loading={loading?.sendTokenBtn}
                onClick={handleSendCustomToken}
              >
                Send token
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

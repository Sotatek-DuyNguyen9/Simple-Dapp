import React from "react";
import "./styles.scss";
import { useWeb3React } from "@web3-react/core";
import { Col, Divider, Row } from "antd";
import { getCoinBalance, getCustomTokenBalance} from "../../share/getInfoToken";

type CustomTokenInfo = {
  name: string;
  symbol: string;
  balance: number;
  decimals: number;
  allowance: number;
  totalSupply: number;
};

export const Information: React.FC = () => {
  const [coinBalance, setCoinBalance] = React.useState();
  const [customTokenInfo, setCustomTokenInfo] = React.useState<CustomTokenInfo>();
  const { active, account } = useWeb3React();
  console.log(active);
  React.useEffect(() => {
    if (!active) return;

    const init = async () => {
      const customInfo = await getCustomTokenBalance(account as string);
      const nativeBalance = await getCoinBalance(account as string);
      setCoinBalance(nativeBalance);
      setCustomTokenInfo(customInfo);
    };

    init();
  }, [account]);

  return (
    <div className="information">
      <div>
        {/* <h1 className="title-container">Account information</h1> */}
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
        <Divider orientation="left" className="primary-divider">Custom token</Divider>
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
            <p className="hightlight-text">{customTokenInfo?.totalSupply} {customTokenInfo?.symbol}</p>
          </Col>
          
          <Col span={2}>
            <p className="primary-text">Allowance: </p>
          </Col>
          <Col span={10}>
            <p className="hightlight-text">{customTokenInfo?.allowance} {customTokenInfo?.symbol}</p>
          </Col>
          <Col span={2}>
            <p className="primary-text">Balance:</p>
          </Col>
          <Col span={10}>
            <p className="hightlight-text">{customTokenInfo?.balance} {customTokenInfo?.symbol}</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

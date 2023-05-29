import React from "react";
import "./styles.scss";
import { Divider, Form } from "antd";
import ButtonIcon from "../../components/02.buttons/ButtonIcon";
// import ConnectWalletIcon from '../../icons/common/wallet-icon.svg';
import ButtonContained from "../../components/02.buttons/ButtonContained";
import ButtonOutLined from "../../components/02.buttons/ButtonOutLined";
import FormItem from "../../components/03.inputs/FormItem";
import { ConnectWalletIcon } from '../../assets/icons';
import { TokenIcon } from '../../assets/icons';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export const Design: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <div className="information">
      <Divider orientation="left" className="primary-divider">
        Button
      </Divider>
      <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: "24px", padding: "0px 24px" }}>
        <ButtonIcon iconpath={ConnectWalletIcon}>Connect Wallet</ButtonIcon>
        <ButtonIcon loading>Button</ButtonIcon>
        <ButtonOutLined loading className="outlined-black">Button</ButtonOutLined>
        <ButtonContained loading color="#FFFFFF" bg="#1A1C6B">Button</ButtonContained>
      </div>
      <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: "24px", padding: "0px 24px" }}>
        <ButtonContained color="#383D47" bg="#E1E5EB">Cancel</ButtonContained>
        <ButtonContained color="#FFFFFF" bg="#333652">Confirm</ButtonContained>
        <ButtonOutLined className="outlined-black">Revert</ButtonOutLined>
        <ButtonContained color="#FFFFFF" bg="#1A1C6B">Disconnect</ButtonContained>
      </div>
      <div style={{ display: 'flex', justifyContent: "space-between", marginBottom: "24px", padding: "0px 24px" }}>
        <ButtonContained disabled color="#383D47" bg="#E1E5EB">Cancel</ButtonContained>
        <ButtonContained disabled color="#FFFFFF" bg="#333652">Confirm</ButtonContained>
        <ButtonOutLined disabled className="outlined-black">Revert</ButtonOutLined>
        <ButtonContained disabled color="#FFFFFF" bg="#1A1C6B">Disconnect</ButtonContained>
      </div>
      <Divider orientation="left" className="primary-divider">
        Input
      </Divider>
      <Form
        name="basic"
        labelCol={{ span: 1 }}
        wrapperCol={{ span: 11 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <FormItem 
          form={form}
          label="Name"
          name="name"
          placeHolder="Enter your name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        />
        <FormItem 
          form={form}
          label="Amount"
          name="amount"
          placeHolder="Enter your amount"
          suffix={<img src={TokenIcon} alt="token-icon" />}
          rules={[{ required: true, message: 'Please input your amount!' }]}
        />
        <Form.Item wrapperCol={{ offset: 10 }}>
          <ButtonContained color="#FFFFFF" bg="#333652" htmlType="submit">
            Confirm
          </ButtonContained>
        </Form.Item>
      </Form>
    </div>
  );
};

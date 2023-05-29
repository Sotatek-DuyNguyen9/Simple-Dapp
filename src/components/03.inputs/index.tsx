import { Input, InputProps } from "antd";
import React from "react";
import "./styles.scss";

export interface InputInterface extends InputProps {}

export const CustomInput: React.FC<InputInterface> = (props: InputInterface) => {
  const { className } = props;

  return <Input className={`input-default  ${className}`} {...props} />;
};

export default CustomInput;

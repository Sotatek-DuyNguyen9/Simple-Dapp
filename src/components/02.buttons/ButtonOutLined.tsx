import { Button, ButtonProps } from 'antd';
import React from 'react';
import './styles.scss';
import './styles/button-outlined.scss';

interface ButtonOutLinedInterface extends ButtonProps {
  className?: 'outlined-black' | string;
}

const ButtonOutLined: React.FC<ButtonOutLinedInterface> = (props: ButtonOutLinedInterface) => {
  const { children, className } = props;
  return (
    <Button {...props} className={`button-default outlined-default ${className}`}>
      {children}
    </Button>
  );
};

export default ButtonOutLined;

import { Button, ButtonProps } from 'antd';
import React from 'react';
import './styles.scss';
import './styles/button-contained.scss';

interface ButtonContainedInterface extends ButtonProps {
  color?: string;
  bg?: string;
}

const ButtonContained: React.FC<ButtonContainedInterface> = (props: ButtonContainedInterface) => {
  const { color, bg, children, className } = props;
  return (
    <Button 
      style={{ background: bg, color: color }}
      {...props} className={`button-default contained-default ${className} `}
    >
      {children}
    </Button>
  );
};

export default ButtonContained;

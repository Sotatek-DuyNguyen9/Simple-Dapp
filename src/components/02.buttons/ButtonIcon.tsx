import { Button, ButtonProps } from 'antd';
import './styles.scss';
import './styles/button-icon.scss';

interface ButtonIconInterface extends ButtonProps {
    iconpath?: string;
}

const ButtonIcon: React.FC<ButtonIconInterface> = (
  props: ButtonIconInterface,
) => {
  const { iconpath, children, className } = props;

  return (
    <Button className={`button-default button-icon-default ${className}`} {...props}>
      {iconpath && <img src={iconpath} alt="button-icon-alt" className="button-icon" />}
      <span>{children}</span>
    </Button>
  );
};

export default ButtonIcon;

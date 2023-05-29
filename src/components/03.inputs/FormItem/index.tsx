import { Form } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Rule } from 'antd/lib/form';
import React, { useRef } from 'react';
import CustomInput from '..';
import './styles.scss';

interface FormItemInterface {
  rules?: Rule[];
  // decimal?: number;
  value?: any;
  form: FormInstance<any>;
  name: string;
  regex?: any;
  suffix?: any;
  label?: string;
  placeHolder?: string;
}

const FormItem: React.FC<FormItemInterface> = ({
  rules,
  value,
  form,
  name,
  regex,
  suffix,
  placeHolder,
  ...props
}) => {
  return (
    <Form.Item name={name} className="form-item" rules={rules} {...props}>
      <CustomInput
        name={name}
        suffix={suffix}
        placeholder={placeHolder}
        onChange={(e) => {
          const value = e.target.value;
          form.setFieldValue(name, value);
        }}
      />
    </Form.Item>
  );
};

export default FormItem;

import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';
const SwitchButton = ({enable, setEnable}) => (
  <Switch
    checkedChildren={<CheckOutlined />}
    unCheckedChildren={<CloseOutlined />}
    defaultChecked={enable}
    onClick={setEnable}
  />
);
export default SwitchButton;
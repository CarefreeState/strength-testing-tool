import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, InputNumber, Select, Space } from 'antd';

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="eq" style={{ width: 100 }}>
    <Option value="le">小于等于</Option>
    <Option value="eq">等于</Option>
    <Option value="ge">大于等于</Option>
  </Select>
);

const NumberSelector = () => (
  <Space direction="vertical">
    <InputNumber addonBefore={selectBefore} defaultValue={3} />
  </Space>
);

export default NumberSelector;
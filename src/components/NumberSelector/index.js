import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, InputNumber, Select, Space } from 'antd';

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="eq" style={{ width: 75 }}>
    <Option value="le">≤</Option>
    <Option value="eq">=</Option>
    <Option value="ge">≥</Option>
  </Select>
);

const NumberSelector = () => (
  <Space direction="vertical">
    <InputNumber addonBefore={selectBefore} defaultValue={3} />
  </Space>
);

export default NumberSelector;
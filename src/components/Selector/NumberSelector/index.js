import React from 'react';
import { InputNumber, Select, Space } from 'antd';

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="eq" style={{ width: 75 }}>
    <Option value="le">≤</Option>
    <Option value="eq">=</Option>
    <Option value="ge">≥</Option>
  </Select>
);

const NumberSelector = ({min, max}) => (
  <Space direction="vertical">
    <InputNumber max={max} min={min} addonBefore={selectBefore} defaultValue={3} />
  </Space>
);

export default NumberSelector;
import React from 'react';
import { InputNumber, Select } from 'antd';

const { Option } = Select;

const SelectBefore = ({operate, setOperate}) => {
  return (
    <Select defaultValue={operate} style={{ width: 75 }} onChange={setOperate}>
      <Option value="le">≤</Option>
      <Option value="eq">=</Option>
      <Option value="ge">≥</Option>
    </Select>
  );
}

const NumberSelector = ({operate, number, setNumber, setOperate, min, max}) => (
  <InputNumber 
    max={max} 
    min={min}
    addonBefore={<SelectBefore operate={operate} setOperate={setOperate}/>} 
    defaultValue={number}
    onChange={setNumber} 
  />
);

export default NumberSelector;
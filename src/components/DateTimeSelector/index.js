import React from 'react';
import { DatePicker } from 'antd';


const { RangePicker } = DatePicker;

const DateTimeSelector = () => (
    <RangePicker showTime />
);
export default DateTimeSelector;
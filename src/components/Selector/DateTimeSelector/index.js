import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const DateTimeSelector = ({range, setRange}) => (
    <RangePicker 
        showTime={{
            defaultOpenValue: [
                range.start ? moment(range.start) : null,
                range.end ? moment(range.end) : null
            ]
        }}
        onChange={(dates) => {
            setRange({
                start: dates[0].valueOf(),
                end: dates[1].valueOf()
            });
        }}
    />
);
export default DateTimeSelector;
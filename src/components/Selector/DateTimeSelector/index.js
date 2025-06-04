import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const DateTimeSelector = ({range, setRange}) => {
    return (
        <RangePicker 
            showTime
            defaultValue={[
                range.start ? moment(new Date(range.start)) : null,
                range.end ? moment(new Date(range.end)) : null,
            ]}
            onChange={(dates) => {
                setRange({
                    start: dates[0] ? dates[0].valueOf() : null,
                    end: dates[1] ? dates[1].valueOf() : null
                });
            }}
        />
    )}
export default DateTimeSelector;
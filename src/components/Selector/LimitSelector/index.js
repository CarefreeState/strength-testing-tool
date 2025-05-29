import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const LimitSelector = ({maxCount, options}) => {
  const [value, setValue] = React.useState([]);
  const suffix = (
    <>
      <span>
        {value.length} / {maxCount || "∞"}
      </span>
      <DownOutlined />
    </>
  );
  return (
    <Select
      mode="multiple"
      maxCount={maxCount}
      value={value}
      style={{ width: '100%' }}
      onChange={setValue}
      suffixIcon={suffix}
      placeholder="Please select"
      options={options}
      // 同时查找 value and label
      filterOption={(input, option) => {
        const pattern = new RegExp('[\u4E00-\u9FA5]+');
        // 判断是否是中文
        if (pattern.test(input)) {
          return option?.label ? option?.label?.indexOf(input) > -1 : false;
        } else {
          return option?.value
            ? option?.value
                .toLocaleUpperCase()
                .indexOf(input.toLocaleUpperCase()) > -1
            : false;
        }
      }}
    />
  );
};
export default LimitSelector;
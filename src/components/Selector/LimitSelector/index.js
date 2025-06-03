import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const LimitSelector = ({selected, setOptions, maxCount, options}) => {
  const suffix = (
    <>
      <span>
        {selected.length} / {maxCount || "∞"}
      </span>
      <DownOutlined />
    </>
  );
  return (
    <Select
      mode="multiple"
      maxCount={maxCount}
      value={selected}
      style={{ width: '100%' }}
      onChange={setOptions}
      suffixIcon={suffix}
      placeholder="Please select"
      options={options}
      // 同时查找 selected and label
      filterOption={(input, option) => {
        const pattern = new RegExp('[\u4E00-\u9FA5]+');
        // 判断是否是中文
        if (pattern.test(input)) {
          return option?.label ? option?.label?.indexOf(input) > -1 : false;
        } else {
          return option?.selected
            ? option?.selected
                .toLocaleUpperCase()
                .indexOf(input.toLocaleUpperCase()) > -1
            : false;
        }
      }}
    />
  );
};
export default LimitSelector;
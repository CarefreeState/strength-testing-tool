import React from 'react';
import { Checkbox } from 'antd';
const onChange = e => {
  console.log(`checked = ${e.target.checked}`);
};
const SimpleCheckbox = ({children}) => (
  <Checkbox 
    style={{
      marginRight: '100px',
      transform: 'scale(1.25)',  // 增大1.5倍
      transformOrigin: 'left center'  // 保持左侧对齐
    }} 
    onChange={onChange}
  >
    {children}
  </Checkbox>
);
export default SimpleCheckbox;
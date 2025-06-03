import React from 'react';
import { Checkbox } from 'antd';

const SimpleCheckbox = ({children, active, setActive}) => (
  <Checkbox 
    style={{
      marginRight: '100px',
      transform: 'scale(1.25)',  // 增大1.5倍
      transformOrigin: 'left center'  // 保持左侧对齐
    }}
    checked={active}
    onChange={setActive}
  >
    {children}
  </Checkbox>
);
export default SimpleCheckbox;
import React from 'react';
import { Checkbox } from 'antd';
const onChange = e => {
  console.log(`checked = ${e.target.checked}`);
};
const SimpleCheckbox = ({children}) => <Checkbox style={{marginRight: '100px'}} onChange={onChange}>{children}</Checkbox>;
export default SimpleCheckbox;
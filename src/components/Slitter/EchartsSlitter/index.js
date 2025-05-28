import React from 'react';
import { Flex, Splitter } from 'antd';
import './index.scss';

const __rest =
  (this && this.__rest) ||
  function (s, e) {
    const t = {};
    for (const p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (const i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };


const CustomSplitter = ({left, right, top, ..._a}) => {
  var { style } = _a,
    restProps = __rest(_a, ['style']);
  return (
    <Splitter layout="vertical" className="custom-splitter">
      <Splitter.Panel min="1%" defaultSize="35%">
          {top}
      </Splitter.Panel>
      <Splitter.Panel min="30%" defaultSize="65%">
        <Splitter
          className="custom-splitter"
          style={Object.assign({ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }, style)}
          {...restProps}
        >
          <Splitter.Panel collapsible min="30%" defaultSize="70%">  
            {left}
          </Splitter.Panel>
          <Splitter.Panel collapsible min="30%" defaultSize="30%">  
            {right}
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
    
    
  );
};
const EchartsSlitter = ({left, right, top}) => (
  <Flex gap="middle" style={{ height: '100%' }} vertical>
    <CustomSplitter style={{ height: '100%' }} left={left} right={right} top={top}/>
  </Flex>
);
export default EchartsSlitter;
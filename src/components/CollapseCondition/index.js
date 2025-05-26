
import React from 'react';
import { Collapse } from 'antd';
import DescriptionList from '@/components/DescriptionList'


// item: {label, descriptions:[name, content]}
const CollapseCondition = ({items}) => {
  return (<Collapse defaultActiveKey={items.map((item, index) => index)} ghost items={items.map((item, index) => {
    return {
      key: index,
      label: <strong>{item.label}</strong>,
      children: <DescriptionList vertical={item.vertical} cardinality={item.cardinality} descriptions={item.descriptions}/>
    }})} />)
}

export default CollapseCondition
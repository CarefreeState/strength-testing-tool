
import React from 'react';
import { Collapse } from 'antd';
import DescriptionList from '@/components/List/DescriptionList'


// item: {active, label, vertical, cardinality, descriptions:[name, content]}
const CollapseItems = ({items, style}) => {
  return (<Collapse style={style} collapsible="header" defaultActiveKey={items.map((item, index) => {
    return item.active ? index : null
  })} ghost items={items.map((item, index) => {
    return {
      key: index,
      label: <strong>{item.label}</strong>,
      children: <DescriptionList vertical={item.vertical} cardinality={item.cardinality} descriptions={item.descriptions}/>
    }})} />)
}

export default CollapseItems
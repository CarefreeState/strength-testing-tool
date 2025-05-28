import React from 'react';
import { Descriptions } from 'antd';

function DescriptionList({descriptions, vertical, cardinality}) {
  return (
    <Descriptions
      layout={vertical && "vertical"}
      items={descriptions.map((item, index) => {
        return {
          key: index,
          label: item.name,
          children: item.content,
      }})}
      column={Math.ceil(descriptions.length * cardinality)} // Controls maximum items per row
      styles={{
        label: {
          display: 'inline-block',
          marginRight: 8,
          marginBottom: 0,
        },
        content: {
          display: 'inline-block',
          whiteSpace: 'normal',
        }
      }}
    />
  );
}

export default DescriptionList;
import React from 'react';
import { Button, Popconfirm } from 'antd';
import deleteIcon from '@/assets/delete.png'

const OkButton = ({del}) => (
  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    okText="Yes"
    cancelText="No"
    onConfirm={del}
  >
    <Button 
      danger 
      style={{
        width: '32px',
        height: '32px',
        padding: '4px',
        borderRadius: '8px'
      }}
    >
      <img 
        src={deleteIcon} 
        alt="delete icon"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }} 
      />
    </Button>
  </Popconfirm>
);
export default OkButton;
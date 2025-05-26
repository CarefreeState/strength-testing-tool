import React from 'react';
import { Button, Popconfirm } from 'antd';
const OkButton = () => (
  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    okText="Yes"
    cancelText="No"
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);
export default OkButton;
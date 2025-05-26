
import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/', { replace: true }); // 修改为直接跳转到/search/robot
  }
  return <Result
    status="404"
    title="404"
    subTitle="抱歉，你访问的页面不存在"
    extra={<Button type="primary" onClick={handleClick}>回到主页</Button>}
  />
}

export default NotFound;
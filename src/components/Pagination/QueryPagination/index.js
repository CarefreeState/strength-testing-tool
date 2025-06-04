import React from 'react';
import { Pagination } from 'antd';
const QueryPagination = ({current, total, pageSize, changePage}) => (
  <>
    <Pagination pageSizeOptions={[5, 10, 20, 25, 50, 100]} showSizeChanger={true} showQuickJumper={true}
     pageSize={pageSize} current={current} defaultCurrent={current} total={total} onChange={changePage} />
  </>
);
export default QueryPagination;
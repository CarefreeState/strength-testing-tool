import React from 'react';
import { Pagination } from 'antd';
const onChange = pageNumber => {
  console.log('Page: ', pageNumber);
};
const QueryPagination = () => (
  <>
    <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
  </>
);
export default QueryPagination;
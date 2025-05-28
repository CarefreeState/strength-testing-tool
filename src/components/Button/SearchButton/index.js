import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const SearchButton = ({onClick}) => {

  return (
    <Button onClick={onClick} type="primary" icon={<SearchOutlined />} iconPosition='end'>
      Search
    </Button>
  )
};
export default SearchButton;
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ConfigProvider } from 'antd';

const SearchButton = ({ onClick, buttonTheme}) => {
  return (
    <ConfigProvider theme={{
      components: {
        Button: buttonTheme
      }
    }}>
      <Button 
        onClick={onClick} 
        icon={<SearchOutlined />} 
        iconPosition='end'
      >
        Search
      </Button>
    </ConfigProvider>
  );
};
export default SearchButton;
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';
import sortAsc from '@/assets/sort-asc.png'; // 请确保路径正确
import sortDesc from '@/assets/sort-desc.png'; // 请确保路径正确

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #2D59C6, #76E0D6);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &.clicked-reversed::before {
        background: linear-gradient(315deg, #2D59C6, #76E0D6);
      }
    }
  `,
}));

const PrettyButton = ({ children, sort, active, onClick }) => {
  const { styles } = useStyle();

  const iconStyle = {
    width: '24px',
    height: '24px'
  };

  const icon = sort === 'asc' ? (
    <img src={sortAsc} alt="sort-asc" style={iconStyle} />
  ) : (
    <img src={sortDesc} alt="sort-desc" style={iconStyle} />
  );

  return (
    <ConfigProvider
      button={{
        className: `${styles.linearGradientButton} ${active ? (sort === 'desc' ? 'clicked-reversed' : '') : ''}`,
      }}
    >
      <Space>
        <Button
          type={active ? 'primary' : 'default'}
          size="large"
          icon={icon}
          onClick={onClick}
        >
          {children}
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default PrettyButton;
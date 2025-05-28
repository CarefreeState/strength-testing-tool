import CollapseItems from '@/components/Collapse/CollapseItems'
import EchartsSlitter from '@/components/Slitter/EchartsSlitter'
import QueryHorizontalBar from '@/components/Echarts/QueryHorizontalBar'
import DetailHorizontalBar from '@/components/Echarts/DetailHorizontalBar'
import QueryPagination from '@/components/Pagination/QueryPagination'
import LoadingAnimation from '@/components/Loading/LoadingAnimation'
import SwitchButton from '@/components/Button/SwitchButton'
import { useState } from 'react';
import SimpleCheckbox from '@/components/Button/SimpleCheckbox'
import LimitSelector from '@/components/Selector/LimitSelector'
import NumberSelector from '@/components/Selector/NumberSelector'
import PrettyButton from '@/components/Button/PrettyButton'
import DateTimeSelector from '@/components/Selector/DateTimeSelector'

const Robot = () => {
  const [loading, setLoading] = useState(false);
  // item: {label, descriptions:[name, content]}
  const items = [
    {
      active: true,
      vertical: true,
      label: '查询条件',
      cardinality: 1,
      descriptions: [
        {name: '是否启动', content: <SwitchButton/>},
        {name: '时间范围', content: <DateTimeSelector/>},
        {name: '队长', content: <LimitSelector maxCount={1}/>},
        {name: '小兵数量', content: <NumberSelector/>},
        {name: '小兵', content: <LimitSelector maxCount={3}/>},
        {name: '进修', content: <LimitSelector maxCount={2}/>},
        {name: '遗物', content: <LimitSelector maxCount={3}/>},
        {name: '装备', content: <LimitSelector/>},
      ]
    },
    {
      active: true,
      vertical: true,
      label: '模糊条件',
      cardinality: 4,
      descriptions: [
        {name: '是否启动', content: <SwitchButton/>},
        {name: '选项', content: <>
          <SimpleCheckbox>队长</SimpleCheckbox>
          <SimpleCheckbox>小兵</SimpleCheckbox>
          <SimpleCheckbox>进修</SimpleCheckbox>
          <SimpleCheckbox>遗物</SimpleCheckbox>
          <SimpleCheckbox>装备</SimpleCheckbox>
          <SimpleCheckbox>进化</SimpleCheckbox>
        </>},
      ]
    },
    {
      active: true,
      vertical: false,
      label: '输出条件',
      cardinality: 2,
      descriptions: [
        {content: <PrettyButton>胜率</PrettyButton>},
        {content: <PrettyButton>总治疗</PrettyButton>},
        {content: <PrettyButton>总输出</PrettyButton>},
        {content: <PrettyButton>战斗时长</PrettyButton>},
      ]
    }
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {loading && <LoadingAnimation/>}
      <div style={{ flex: 1, minHeight: 0 }}>
        <EchartsSlitter 
          top={<CollapseItems style={{ flex: 1, minWidth: '1750px'}} items={items}/>} 
          left={<QueryHorizontalBar setLoading={setLoading} />} 
          right={
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: '20px',
              boxSizing: 'border-box',
              gap: '20px'
            }}>
              <DetailHorizontalBar/>
              <DetailHorizontalBar/>
              {/* <DetailHorizontalBar/> */}
              <DetailHorizontalBar/>
            </div>
          }
          pagination={<QueryPagination />}
        />
      </div>
    </div>
  )
}

export default Robot
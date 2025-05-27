import CollapseItems from '@/components/CollapseItems'
import EchartsSlitter from '@/components/EchartsSlitter'
import QueryHorizontalBar from '@/components/QueryHorizontalBar'
import DetailHorizontalBar from '@/components/DetailHorizontalBar'
import QueryPagination from '@/components/QueryPagination'
import LoadingAnimation from '@/components/LoadingAnimation'
import SwitchButton from '@/components/SwitchButton'
import { useState } from 'react';
import SimpleCheckbox from '@/components/SimpleCheckbox'
import LimitSelector from '@/components/LimitSelector'
import NumberSelector from '@/components/NumberSelector'
import PrettyButton from '@/components/PrettyButton'
import DateTimeSelector from '@/components/DateTimeSelector'

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
          top={<CollapseItems items={items}/>} 
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
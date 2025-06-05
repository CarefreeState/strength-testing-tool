import { useState } from 'react';
import EchartsSlitter from '@/components/Slitter/EchartsSlitter'
import LoadingAnimation from '@/components/Loading/LoadingAnimation'
import DetailHorizontalBarList from './DetailHorizontalBarList'
import QueryHorizontalBarElem from './QueryHorizontalBarElem'
import CollapseCondtionList from './CollapseConditionList'

const LayoutSearch = ({type}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {loading && <LoadingAnimation/>}
      <div style={{ flex: 1, minHeight: 0 }}>
        <EchartsSlitter 
          top={<CollapseCondtionList type={type} />} 
          left={<QueryHorizontalBarElem type={type} setLoading={setLoading}/>} 
          right={<DetailHorizontalBarList type={type} />}
        />
      </div>
    </div>
  )
}

export default LayoutSearch
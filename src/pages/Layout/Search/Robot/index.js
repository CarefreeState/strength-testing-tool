import CollapseCondition from '@/components/CollapseCondition'
import EchartsSlitter from '@/components/EchartsSlitter'
import QueryHorizontalBar from '@/components/QueryHorizontalBar'
import DetailHorizontalBar from '@/components/DetailHorizontalBar'

const Robot = () => {
  // item: {label, descriptions:[name, content]}
  const items = [
    {
      vertical: true,
      label: '查询条件',
      cardinality: 1,
      descriptions: [
        {name: '是否启动', content: 'Content 1'},
        {name: 'Name 2', content: 'Content 2'},
        {name: 'Name 3', content: 'Content 3'},
        {name: 'Name 4', content: 'Content 4'},
        {name: 'Name 5', content: 'Content 5'},
        {name: 'Name 6', content: 'Content 6'},
      ]
    },
    {
      vertical: false,
      label: '模糊条件',
      cardinality: 1,
      descriptions: [
        {name: '是否启动', content: 'Content 1'},
        {name: '选项', content: 'Content 2  Content 2  Content 2  Content 2'},
      ]
    },
    {
      vertical: false,
      label: '输出条件',
      cardinality: 2,
      descriptions: [
        {name: '', content: 'Content 1'},
        {name: '', content: 'Content 2'},
        {name: '', content: 'Content 3'},
        {name: '', content: 'Content 4'},
        {name: '', content: 'Content 5'},
        {name: '', content: 'Content 6'},
      ]
    }
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, minHeight: 0 }}>
        <EchartsSlitter top={<CollapseCondition items={items}/>} left={<QueryHorizontalBar />} right={
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '20px',
          boxSizing: 'border-box',
          gap: '20px'
        }}>
          <div style={{ flex: 1, minHeight: 0 }}>
            <DetailHorizontalBar/>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <DetailHorizontalBar/>
          </div>
        </div>
      } />
      </div>
    </div>
  )
}

export default Robot
import { useSearch } from '@/hooks'
import DetailHorizontalBar from '@/components/Echarts/DetailHorizontalBar'
import {useDispatch} from 'react-redux'

import {
  captain,
  units,
  indexNameMap,
  metricsMap,
} from '@/constants'

const DetailHorizontalBarList = ({type}) => {

  const {
    results,
    setDetailResult,
  } = useSearch(type)
  const dispatch = useDispatch();

  const ret = []
  // 找出最大值
  const maxValueMap = {
    "avg_damage": 0.0,
    "avg_heal": 0.0,
  }
  const dataMap = {}
  const namesMap = {}

  for (const item of results.detailResult.list) {
    dataMap[item.key] = {
      "avg_damage": {
        color: "#2D59C6",
        values: [],
      },
      "avg_heal": {
        color: "#76E0D6",
        values: [],
      },
    }

    namesMap[item.key] = []
    for (const metric of item.metrics) {
      namesMap[item.key].unshift(`${captain[`${metric.unit_id}`] || units[`${metric.unit_id}`]}（样本数：${metric.count}）`)
      maxValueMap["avg_damage"] = Math.max(maxValueMap["avg_damage"], metric.avg_damage)
      dataMap[item.key]["avg_damage"].values.unshift(metric.avg_damage)
      maxValueMap["avg_heal"] = Math.max(maxValueMap["avg_heal"], metric.avg_heal)
      dataMap[item.key]["avg_heal"].values.unshift(metric.avg_heal)
    }
  }

  for (const item of results.detailResult.list) {
    // 加工 value => {details, active, data:{"":{color:"",values:[]}}}
    const map = {}
    map[metricsMap["avg_damage"]] = dataMap[item.key]["avg_damage"]
    map[metricsMap["avg_heal"]] = dataMap[item.key]["avg_heal"]
    ret.push(<DetailHorizontalBar
      key={item.key}
      names={namesMap[item.key]} 
      max={maxValueMap[item.active]} 
      data={{
        details: item.details.map((item, index) => {
          return {
            name: indexNameMap[index],
            content: `${item}`,
          }
        }),
        active: metricsMap[item.active],
        data: map
      }} 
      switchMetrics={({name}) => {
        dispatch(setDetailResult({
          updateElem: {
            key: item.key,
            active: metricsMap[name]
          }
        }))
      }} 
      del={() => {
        dispatch(setDetailResult({
          deleteElem: {
            key: item.key,
          },
        }))
      }}
    />)
  }
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '20px',
      boxSizing: 'border-box',
      gap: '20px'
    }}>
      {ret}
    </div>
  )
}

export default DetailHorizontalBarList
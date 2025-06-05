
import {  
  parseKey,
  getMetric,
  getSort,
  request,
} from '@/utils'
import { useSearch } from '@/hooks'
import moment from 'moment';
import QueryHorizontalBar from '@/components/Echarts/QueryHorizontalBar'
import {useDispatch} from 'react-redux'

import {
  indexMap,
  metricsMap,
} from '@/constants'

const QueryHorizontalBarElem = ({setLoading, type}) => {
  
  const {
    conditions,
    results,
    setQueryResult,
    setDetailResult,
  } = useSearch(type)

  const dispatch = useDispatch();

  const getTitle = () => {
    const start = results.queryResult.start
    const end = results.queryResult.end
    const active = results.queryResult.active
    const sort = results.queryResult.sort
    if(active && sort) {
      return `【${metricsMap[active]}】【${sort === "asc" ? "升序" : "降序"}】` + 
      `时间段为 ${(start && moment(start).format('[MM-DD HH:mm')) || "(-∞"}, ${(end && moment(end).format('MM-DD HH:mm]')) || "+∞)"}`
    }else {
      return ""
    }
  }

  const getLines = () => {
    const current = results.queryResult.current || 1;
    const pageSize = results.queryResult.pageSize || 10;
    const list = results.queryResult.list || [];
    const active = results.queryResult.active || "win_rate";
    
    // 计算分页起始位置
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    
    // 返回截取后的数据
    return list.slice(start, end).map(result => {
      const details = parseKey(result.key, indexMap)
      return {
        key: result.key,
        details: details,
        name: `【${`${details[0].concat(details[1])}`}】 (样本数：${result.metrics.count})`,
        value: getMetric(result.metrics, active),
        metrics: result.units_metrics,
    }
    });
  }

  return (
    <QueryHorizontalBar 
      max={results.queryResult.maxValue}
      current={results.queryResult.current} 
      total={results.queryResult.total}
      pageSize={results.queryResult.pageSize}
      changePage={(current, pageSize) => {
        // 如果 size 变化，自动跳到第一页
        if (results.queryResult.pageSize !== pageSize) {
          current = 1
        }
        dispatch(setQueryResult({
          ...results.queryResult,
          current: current,
          pageSize: pageSize
        }))
      }} title={getTitle()} lines={getLines()} click={(params) => {
        dispatch(setDetailResult({
          appendElem: {
            ...params.data,
            active: "avg_damage"
          }
        }))
      }} submit={async () => {
        setLoading(true)
        const res = await request({
          url: "/strength/search",
          method: "post",
          data: {
            type: type,
            ...conditions,
          }
        })
        
        // 计算最大值
        const maxValue = res.reduce((max, result) => {
          const value = getMetric(result.metrics, conditions.sort.active);
          return value > max ? value : max;
        }, -Infinity);
        dispatch(setQueryResult({
          start: conditions.filter_conditions.time_range.start,
          end: conditions.filter_conditions.time_range.end,
          current: 1,
          pageSize: results.queryResult.pageSize || 10,
          total: res.length,
          active: conditions.sort.active, 
          sort: getSort(conditions.sort, conditions.sort.active),
          list: res,
          maxValue: maxValue
        }))
        // TODO 清空右栏（避免不一致）  
        dispatch(setDetailResult({
          list: []
        }))
        setLoading(false)
      }} 
    />
  )
}

export default QueryHorizontalBarElem
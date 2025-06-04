import { useState } from 'react';
import {  
  parseKey,
  getMetric,
  getSort,
  getSelected,
  getPrettyButtons,
  clickPrettyButtons,
  request,
} from '@/utils'
import { useSearch } from '@/hooks'
import moment from 'moment';
import CollapseItems from '@/components/Collapse/CollapseItems'
import EchartsSlitter from '@/components/Slitter/EchartsSlitter'
import QueryHorizontalBar from '@/components/Echarts/QueryHorizontalBar'
import DetailHorizontalBar from '@/components/Echarts/DetailHorizontalBar'
import LoadingAnimation from '@/components/Loading/LoadingAnimation'
import SwitchButton from '@/components/Button/SwitchButton'
import SimpleCheckbox from '@/components/Button/SimpleCheckbox'
import LimitSelector from '@/components/Selector/LimitSelector'
import NumberSelector from '@/components/Selector/NumberSelector'
import PrettyButton from '@/components/Button/PrettyButton'
import DateTimeSelector from '@/components/Selector/DateTimeSelector'
import {getValueLabel} from '@/constants'
import {useDispatch} from 'react-redux'

import {
  captain,
  units,
  advanced_power,
  relic,
  fitness,
  hex,
  indexMap,
  metricsMap,
} from '@/constants'
import { parseInt } from 'lodash';

const LayoutSearch = ({type}) => {
  const {
    conditions,
    results,
    setQueryResult,
    setDetailResult,
    setFilter_conditions,
    setFuzzy_conditions,
    setSort,
  } = useSearch(type)
  

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // item: {label, descriptions:[name, content]}
  const items = [
    {
      active: true,
      vertical: true,
      label: '查询条件',
      cardinality: 1,
      descriptions: [
        {name: '是否启动', content: <SwitchButton enable={conditions.filter_conditions.enable} setEnable={() => {
          dispatch(setFilter_conditions({
            ...conditions.filter_conditions,
            enable: !conditions.filter_conditions.enable,
          }))
        }}/>},
        {name: '时间范围', content: <DateTimeSelector range={conditions.filter_conditions.time_range} setRange={(range) => {
          dispatch(setFilter_conditions({
           ...conditions.filter_conditions,
            time_range: range
          }))
        }}/>},
        {name: '队长', content: <LimitSelector 
          selected={getSelected([conditions.filter_conditions.captain.id])} 
          setOptions={(options) => {
            dispatch(setFilter_conditions({
              ...conditions.filter_conditions,
              captain: {
                ...conditions.filter_conditions.captain,
                id: options[0] ? parseInt(options[0]) : null
              }
           }))
          }} maxCount={1} options={getValueLabel(captain)}/>},
        {name: '小兵数量', content: <NumberSelector operate={conditions.filter_conditions.units.operate} number={conditions.filter_conditions.units.size} setNumber={(number) => {
          dispatch(setFilter_conditions({
           ...conditions.filter_conditions,
            units: {
             ...conditions.filter_conditions.units,
              size: number,
            }
          }))
        }} setOperate={(operate) => {
          dispatch(setFilter_conditions({
           ...conditions.filter_conditions,
            units: {
             ...conditions.filter_conditions.units,
              operate: operate,
            }
          }))
        }} max={5} min={0}/>},
        {name: '小兵', content: <LimitSelector
          selected={getSelected(conditions.filter_conditions.units.ids)} 
          setOptions={(options) => {
            dispatch(setFilter_conditions({
              ...conditions.filter_conditions,
              units: {
                ...conditions.filter_conditions.units,
                ids: options.map((item) => parseInt(item)),
              }
           }))
          }} maxCount={5} options={getValueLabel(units)}/>},
        {name: '进修', content: <LimitSelector 
          selected={getSelected(conditions.filter_conditions.advanced_power_ids)} 
          setOptions={(options) => {
            dispatch(setFilter_conditions({
              ...conditions.filter_conditions,
              advanced_power_ids: options.map((item) => parseInt(item)),
           }))
          }} options={getValueLabel(advanced_power)}/>},
        {name: '遗物', content: <LimitSelector
          selected={getSelected(conditions.filter_conditions.relic_ids)} 
          setOptions={(options) => {
            dispatch(setFilter_conditions({
              ...conditions.filter_conditions,
              relic_ids: options.map((item) => parseInt(item)),
           }))
          }}  options={getValueLabel(relic)}/>},
        {name: '装备', content: <LimitSelector
          selected={getSelected(conditions.filter_conditions.fitness_ids)} 
          setOptions={(options) => {
            dispatch(setFilter_conditions({
              ...conditions.filter_conditions,
              fitness_ids: options.map((item) => parseInt(item)),
           }))
          }} options={getValueLabel(fitness)}/>},
        {name: '专属强化', content: <LimitSelector 
          selected={getSelected(conditions.filter_conditions.hex_ids)} 
          setOptions={(options) => {
            dispatch(setFilter_conditions({
              ...conditions.filter_conditions,
              hex_ids: options.map((item) => parseInt(item)),
           }))
          }} options={getValueLabel(hex)}/>},
      ]
    },
    {
      active: true,
      vertical: true,
      label: '模糊条件',
      cardinality: 4.5,
      descriptions: [
        {name: '是否启动', content: <SwitchButton enable={conditions.fuzzy_conditions.enable} setEnable={() => {
          dispatch(setFuzzy_conditions({
            ...conditions.fuzzy_conditions,
            enable: !conditions.fuzzy_conditions.enable,
          }))
        }}/>},
        {name: '选项', content: <>
          <SimpleCheckbox active={conditions.fuzzy_conditions.captain} setActive={() => {
            dispatch(setFuzzy_conditions({
             ...conditions.fuzzy_conditions,
              captain: !conditions.fuzzy_conditions.captain,
           }))
          }}>队长</SimpleCheckbox>
          <SimpleCheckbox active={conditions.fuzzy_conditions.units} setActive={() => {
            dispatch(setFuzzy_conditions({
             ...conditions.fuzzy_conditions,
             units: !conditions.fuzzy_conditions.units,
           }))
          }}>小兵</SimpleCheckbox>
          <SimpleCheckbox active={conditions.fuzzy_conditions.advanced_power_ids} setActive={() => {
            dispatch(setFuzzy_conditions({
             ...conditions.fuzzy_conditions,
             advanced_power_ids: !conditions.fuzzy_conditions.advanced_power_ids,
           }))
          }}>进修</SimpleCheckbox>
          <SimpleCheckbox active={conditions.fuzzy_conditions.relic_ids} setActive={() => {
            dispatch(setFuzzy_conditions({
             ...conditions.fuzzy_conditions,
             relic_ids: !conditions.fuzzy_conditions.relic_ids,
           }))
          }}>遗物</SimpleCheckbox>
          <SimpleCheckbox active={conditions.fuzzy_conditions.fitness_ids} setActive={() => {
            dispatch(setFuzzy_conditions({
             ...conditions.fuzzy_conditions,
             fitness_ids: !conditions.fuzzy_conditions.fitness_ids,
           }))
          }}>装备</SimpleCheckbox>
          <SimpleCheckbox active={conditions.fuzzy_conditions.hex_ids} setActive={() => {
            dispatch(setFuzzy_conditions({
             ...conditions.fuzzy_conditions,
             hex_ids: !conditions.fuzzy_conditions.hex_ids,
           }))
          }}>专属强化</SimpleCheckbox>
        </>},
      ]
    },
    {
      active: true,
      vertical: false,
      label: '输出条件',
      cardinality: 2.2,
      descriptions: getPrettyButtons(conditions.sort).map((item) => {
        return {
          content: <PrettyButton
            sort={item.sort}
            active={item.active}
            onClick={() => {
              // 更新 Sort 状态
              dispatch(setSort(clickPrettyButtons({
                clickOption: item.option,
                ...conditions.sort,
              })))
            }}
          >{item.label}</PrettyButton>
        }  
      })
    }
  ]
  // TODO
  const getTitle = () => {
    const start = results.queryResult.start
    const end = results.queryResult.end
    const active = results.queryResult.active
    const sort = results.queryResult.sort
    return start && end && `根据 ${active} ${sort}，时间段：${moment(start).format('MM-DD HH:mm')} 至 ${moment(end).format('MM-DD HH:mm')}`
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

  const getDetailHorizontalBarList = () => {
    const ret = []

    // 找出最大值
    const maxValueMap = {
      "avg_damage": 0.0,
      "avg_heal": 0.0,
    }
    const dataMap = {}
    const namesMap = {}
    for (const [key, value] of results.detailResult) {
      dataMap[key] = {
        "avg_damage": {
          color: "#2D59C6",
          values: [],
        },
        "avg_heal": {
          color: "#76E0D6",
          values: [],
        },
      }
      namesMap[key] = []
      for (const metric of value.metrics) {
        namesMap[key].unshift(captain[`${metric.unit_id}`] || units[`${metric.unit_id}`])
        maxValueMap["avg_damage"] = Math.max(maxValueMap["avg_damage"], metric.avg_damage)
        dataMap[key]["avg_damage"].values.unshift(metric.avg_damage)
        maxValueMap["avg_heal"] = Math.max(maxValueMap["avg_heal"], metric.avg_heal)
        dataMap[key]["avg_heal"].values.unshift(metric.avg_heal)
      }
    }

    for (const [key, value] of results.detailResult) {
      // 加工 value => {details, active, data:{"":{color:"",values:[]}}}
      const map = {}
      map.set(metricsMap["avg_damage"], dataMap[key]["avg_damage"])
      map.set(metricsMap["avg_heal"], dataMap[key]["avg_heal"])
      ret.push(<DetailHorizontalBar
        key={key}
        names={namesMap[key]} 
        max={maxValueMap[value.active]} 
          data={{
          details: value.details,
          active: metricsMap[value.active],
          data: map
        }} 
        switchMetrics={(name) => {
          if(results.detailResult[key]) {
            const tmp = {...results.detailResult}
            tmp[key] = {
              ...tmp[key],
              active: metricsMap[name]
            }
            dispatch(setDetailResult(tmp))
          }
        }} 
        del={() => {
          if(results.detailResult[key]) {
            const tmp = {...results.detailResult}
            delete tmp[key]
            dispatch(setDetailResult(tmp))
          }
        }}
      />)
    }
    return ret
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {loading && <LoadingAnimation/>}
      <div style={{ flex: 1, minHeight: 0 }}>
        <EchartsSlitter 
          top={<CollapseItems style={{ flex: 1, minWidth: '1750px'}} items={items}/>} 
          left={<QueryHorizontalBar 
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
              if(!results.detailResult[params.data.key]) {
                const tmp = {...results.detailResult}
                tmp[params.data.key] = {
                  ...params.data,
                  active: "avg_damage"
                }
                dispatch(setDetailResult(tmp))
              }
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
              setLoading(false)
            }} />} 
          right={
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: '20px',
              boxSizing: 'border-box',
              gap: '20px'
            }}>
              {getDetailHorizontalBarList()}
            </div>
          }
        />
      </div>
    </div>
  )
}

export default LayoutSearch
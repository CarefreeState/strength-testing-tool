import { useState } from 'react';
import { request } from '@/utils'
import CollapseItems from '@/components/Collapse/CollapseItems'
import EchartsSlitter from '@/components/Slitter/EchartsSlitter'
import QueryHorizontalBar from '@/components/Echarts/QueryHorizontalBar'
import DetailHorizontalBar from '@/components/Echarts/DetailHorizontalBar'
import QueryPagination from '@/components/Pagination/QueryPagination'
import LoadingAnimation from '@/components/Loading/LoadingAnimation'
import SwitchButton from '@/components/Button/SwitchButton'
import SimpleCheckbox from '@/components/Button/SimpleCheckbox'
import LimitSelector from '@/components/Selector/LimitSelector'
import NumberSelector from '@/components/Selector/NumberSelector'
import PrettyButton from '@/components/Button/PrettyButton'
import DateTimeSelector from '@/components/Selector/DateTimeSelector'
import {getValueLabel} from '@/constants'
import {useSelector, useDispatch} from 'react-redux'
import {
  setDomesticDetailResult, setDomesticQueryResult,
  setOverseasDetailResult,  setOverseasQueryResult,
  setRobotDetailResult, setRobotQueryResult,
  setRobotFilter_conditions, setRobotFuzzy_conditions, setRobotSort, 
  setOverseasFilter_conditions, setOverseasFuzzy_conditions, setOverseasSort,
  setDomesticFilter_conditions, setDomesticFuzzy_conditions, setDomesticSort,
} from '@/store'
import {
  captain,
  units,
  advanced_power,
  relic,
  fitness,
  hex,
} from '@/constants'
import { parseInt } from 'lodash';

function reversePrettyButtons(asc) {
  return asc === "asc" ? "desc" : "asc"
}

function clickPrettyButtons({ clickOption, active, win_rate, avg_duration, avg_damage, avg_heal }) {
  return {
    // 当前激活的是 win_rate 并且点击的也是 win_rate 则反向，否则保持原状
    win_rate: active === 'win_rate' && clickOption === active ? reversePrettyButtons(win_rate) : win_rate,
    avg_duration: active === 'avg_duration' && clickOption === active ? reversePrettyButtons(avg_duration) : avg_duration,
    avg_damage: active === 'avg_damage' && clickOption === active ? reversePrettyButtons(avg_damage) : avg_damage,
    avg_heal: active === 'avg_heal' && clickOption === active ? reversePrettyButtons(avg_heal) : avg_heal,
    // 激活项最终一定是 clickOption
    active: clickOption,
  }
}

function getPrettyButtons({active, win_rate, avg_duration, avg_damage, avg_heal }) {
  return [
    {
      label: '胜率',
      option: 'win_rate',
      sort: win_rate,
      active: active === 'win_rate'
    },
    {
      label: '平均总治疗',
      option: 'avg_heal',
      sort: avg_heal,
      active: active === 'avg_heal'
    },
    {
      label: '平均总输出',
      option: 'avg_damage',
      sort: avg_damage,
      active: active === 'avg_damage'
    },
    {
      label: '平均战斗时长',
      option: 'avg_duration',
      sort: avg_duration,
      active: active === 'avg_duration'
    },
  ]

}

function getSelected(ids) {
  const ret = [];
  if (ids && ids.length) {
    for (const id of ids) {
      if (id !== 0 && id !== null && id !== undefined) {
        ret.push(`${id}`);
      }
    }
  }
  return ret;
}

const LayoutSearch = ({type}) => {
  const {
    robotCondtions,
    robotResults,
    overseasCondtions,
    overseasResults,
    domesticCondtions,
    domesitcResults,
  } = useSelector(state => state)

  const typeMap = {
    "robot": {
      conditions: robotCondtions,
      results: robotResults,
      setQueryResult: setRobotQueryResult,
      setDetailResult: setRobotDetailResult,
      setFilter_conditions: setRobotFilter_conditions,
      setFuzzy_conditions: setRobotFuzzy_conditions,
      setSort: setRobotSort,
    },
    "overseas": {
      conditions: overseasCondtions,
      results: overseasResults,
      setQueryResult: setOverseasQueryResult,
      setDetailResult: setOverseasDetailResult,
      setFilter_conditions: setOverseasFilter_conditions,
      setFuzzy_conditions: setOverseasFuzzy_conditions,
      setSort: setOverseasSort,
    },
    "domestic": {
      conditions: domesticCondtions,
      results: domesitcResults,
      setQueryResult: setDomesticQueryResult,
      setDetailResult: setDomesticDetailResult,
      setFilter_conditions: setDomesticFilter_conditions,
      setFuzzy_conditions: setDomesticFuzzy_conditions,
      setSort: setDomesticSort,
    }
  }

  const {
    conditions,
    results,
    setQueryResult,
    setDetailResult,
    setFilter_conditions,
    setFuzzy_conditions,
    setSort,
  } = typeMap[type]
  

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
        {name: '小兵数量', content: <NumberSelector number={conditions.filter_conditions.units.size} setNumber={(number) => {
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {loading && <LoadingAnimation/>}
      <div style={{ flex: 1, minHeight: 0 }}>
        <EchartsSlitter 
          top={<CollapseItems style={{ flex: 1, minWidth: '1750px'}} items={items}/>} 
          left={<QueryHorizontalBar submit={async () => {
            setLoading(true)
            const res = await request({
              url: "/strength/search",
              method: "post",
              data: {
                type: type,
                ...conditions,
              }
            })
            console.log(res)
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
              <DetailHorizontalBar/>
              <DetailHorizontalBar/>
              <DetailHorizontalBar/>
            </div>
          }
          pagination={<QueryPagination />}
        />
      </div>
    </div>
  )
}

export default LayoutSearch
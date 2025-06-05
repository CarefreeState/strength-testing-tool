import {  
  getSelected,
  getPrettyButtons,
  clickPrettyButtons,
} from '@/utils'
import { useSearch } from '@/hooks'
import CollapseItems from '@/components/Collapse/CollapseItems'
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
} from '@/constants'
import { parseInt } from 'lodash';



const CollapseCondtionList = ({type}) => {

  const {
    conditions,
    setFilter_conditions,
    setFuzzy_conditions,
    setSort,
  } = useSearch(type)
  
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
  return (<CollapseItems style={{ flex: 1, minWidth: '1750px'}} items={items}/>)
}

export default CollapseCondtionList
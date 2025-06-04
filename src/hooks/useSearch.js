import { useSelector } from "react-redux";
import {
  setDomesticDetailResult, setDomesticQueryResult,
  setOverseasDetailResult,  setOverseasQueryResult,
  setRobotDetailResult, setRobotQueryResult,
  setRobotFilter_conditions, setRobotFuzzy_conditions, setRobotSort, 
  setOverseasFilter_conditions, setOverseasFuzzy_conditions, setOverseasSort,
  setDomesticFilter_conditions, setDomesticFuzzy_conditions, setDomesticSort,
} from '@/store'

function useSearch(type) {
  const robotCondtions = useSelector(state => state.robotCondtions);
  const robotResults = useSelector(state => state.robotResults);
  const overseasCondtions = useSelector(state => state.overseasCondtions);
  const overseasResults = useSelector(state => state.overseasResults);
  const domesticCondtions = useSelector(state => state.domesticCondtions);
  const domesitcResults = useSelector(state => state.domesitcResults);
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
  return typeMap[type]
}


export default useSearch;
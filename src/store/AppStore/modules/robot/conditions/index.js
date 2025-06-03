
import { createSlice } from "@reduxjs/toolkit";

const conditionsStore = createSlice({
  name: "robotConditions",
  initialState: {
    filter_conditions: {
      enable: true,
      time_range: {
        start: null,
        end: null
      },
      captain: {
        id: null
      },
      units: {
        size: 0,
        operate : "ge", // ge, le, eq
        ids: []
      },
      advanced_power_ids: [],
      fitness_ids: [],
      relic_ids: [],
      hex_ids: []
    },
    fuzzy_conditions: {
      enable: true,
      captain: false,
      units: false,
      advanced_power_ids: true,
      fitness_ids: true,
      relic_ids: true,
      hex_ids: true
    },
    sort: {
      active: "win_rate",
      win_rate: "desc",
      avg_duration: "asc",
      avg_damage: "desc",
      avg_heal: "desc"
    },
  },
  
  reducers: {
    setRobotFilter_conditions: (state, action) => {
      state.filter_conditions = action.payload;
    },
    setRobotFuzzy_conditions: (state, action) => {
      state.fuzzy_conditions = action.payload;
    },
    setRobotSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

// 返回修改的函数
const { 
  setRobotFilter_conditions,
  setRobotFuzzy_conditions,
  setRobotSort,
} = conditionsStore.actions;

export { 
  setRobotFilter_conditions,
  setRobotFuzzy_conditions,
  setRobotSort,
};

// 返回 reducer
const conditionsReducer = conditionsStore.reducer;

export default conditionsReducer;

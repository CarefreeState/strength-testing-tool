
import { createSlice } from "@reduxjs/toolkit";

const conditionsStore = createSlice({
  name: "overseasConditions",
  initialState: {
    filter_conditions: {
      enable: true,
      time_range: {
        start: null,
        end: null
      },
      captain: {
        id: 1
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
    setOverseasFilter_conditions: (state, action) => {
      state.filter_conditions = action.payload;
    },
    setOverseasFuzzy_conditions: (state, action) => {
      state.fuzzy_conditions = action.payload;
    },
    setOverseasSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

// 返回修改的函数
const { 
  setOverseasFilter_conditions,
  setOverseasFuzzy_conditions,
  setOverseasSort,
} = conditionsStore.actions;

export { 
  setOverseasFilter_conditions,
  setOverseasFuzzy_conditions,
  setOverseasSort,
};

// 返回 reducer
const conditionsReducer = conditionsStore.reducer;

export default conditionsReducer;

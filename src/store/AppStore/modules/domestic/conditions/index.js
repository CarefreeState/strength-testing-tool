
import { createSlice } from "@reduxjs/toolkit";

const conditionsStore = createSlice({
  name: "domesticConditions",
  initialState: {
    filter_conditions: {
      enable: true,
      time_range: {
        start: null,
        end: null
      },
      captain: {
        id: 10003
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
    setDomesticFilter_conditions: (state, action) => {
      state.filter_conditions = action.payload;
    },
    setDomesticFuzzy_conditions: (state, action) => {
      state.fuzzy_conditions = action.payload;
    },
    setDomesticSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

// 返回修改的函数
const { 
  setDomesticFilter_conditions,
  setDomesticFuzzy_conditions,
  setDomesticSort,
} = conditionsStore.actions;

export { 
  setDomesticFilter_conditions,
  setDomesticFuzzy_conditions,
  setDomesticSort,
};

// 返回 reducer
const conditionsReducer = conditionsStore.reducer;

export default conditionsReducer;

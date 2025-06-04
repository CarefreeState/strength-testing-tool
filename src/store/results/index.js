
import { createSlice } from "@reduxjs/toolkit";

const resultsStore = createSlice({
  name: "robotResults",
  initialState: {
    queryResult: {
      start: null,
      end: null,
      current: 1,
      total: null,
      pageSize: 10,
      active: 'win_rate',
      maxValue: 0,
      list: []
    },
    detailResult: null
  },
  
  reducers: {
    setRobotQueryResult: (state, action) => {
      state.queryResult = action.payload;
    },
    setRobotDetailResult: (state, action) => {
      state.detailResult = action.payload;
    },
  },
});

// 返回修改的函数
const { 
  setRobotQueryResult,
  setRobotDetailResult,
} = resultsStore.actions;

export { 
  setRobotQueryResult,
  setRobotDetailResult,
};

// 返回 reducer
const resultsReducer = resultsStore.reducer;

export default resultsReducer;

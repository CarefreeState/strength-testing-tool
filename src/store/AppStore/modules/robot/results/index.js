
import { createSlice } from "@reduxjs/toolkit";

const resultsStore = createSlice({
  name: "robotResults",
  initialState: {
    queryResult: [],
    detailResult: []
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

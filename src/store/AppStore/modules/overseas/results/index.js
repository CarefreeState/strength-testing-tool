
import { createSlice } from "@reduxjs/toolkit";

const resultsStore = createSlice({
  name: "overseasResults",
  initialState: {
    queryResult: [],
    detailResult: []
  },
  
  reducers: {
    setOverseasQueryResult: (state, action) => {
      state.queryResult = action.payload;
    },
    setOverseasDetailResult: (state, action) => {
      state.detailResult = action.payload;
    },
  },
});

// 返回修改的函数
const { 
  setOverseasQueryResult,
  setOverseasDetailResult,
} = resultsStore.actions;

export { 
  setOverseasQueryResult,
  setOverseasDetailResult,
};

// 返回 reducer
const resultsReducer = resultsStore.reducer;

export default resultsReducer;


import { createSlice } from "@reduxjs/toolkit";

const resultsStore = createSlice({
  name: "domesticResults",
  initialState: {
    queryResult: [],
    detailResult: []
  },
  
  reducers: {
    setDomesticQueryResult: (state, action) => {
      state.queryResult = action.payload;
    },
    setDomesticDetailResult: (state, action) => {
      state.detailResult = action.payload;
    },
  },
});

// 返回修改的函数
const { 
  setDomesticQueryResult,
  setDomesticDetailResult,
} = resultsStore.actions;

export { 
  setDomesticQueryResult,
  setDomesticDetailResult,
};

// 返回 reducer
const resultsReducer = resultsStore.reducer;

export default resultsReducer;


import { createSlice } from "@reduxjs/toolkit";

const resultsStore = createSlice({
  name: "overseasResults",
  initialState: {
    queryResult: {
      start: null,
      end: null,
      current: 1,
      total: null,
      pageSize: 10,
      active: '',
      maxValue: 0,
      list: []
    },
    detailResult: {
      list: []
    },
  },
  
  reducers: {
    setOverseasQueryResult: (state, action) => {
      state.queryResult = action.payload;
    },
    setOverseasDetailResult: (state, {payload : {appendElem, list}}) => {
      if (appendElem) {
        if(!state.detailResult.list.find(item => item.key === appendElem.key)) {
          state.detailResult = {
            list: [...state.detailResult.list, appendElem]
          }
        }
      }
      if (list) {
        state.detailResult = {list: list}
      }
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

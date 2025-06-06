
import { createSlice } from "@reduxjs/toolkit";

const resultsStore = createSlice({
  name: "domesticResults",
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
    setDomesticQueryResult: (state, action) => {
      state.queryResult = action.payload;
    },
    setDomesticDetailResult: (state, {payload : {appendElem, updateElem, deleteElem, list}}) => {
      if (appendElem) {
        if(!state.detailResult.list.find(item => item.key === appendElem.key)) {
          state.detailResult = {
            list: [...state.detailResult.list, appendElem]
          }
        }
      }
      if(updateElem) {
        const tmp = []
          for (const elem of state.detailResult.list) {
            tmp.push({
              ...elem,
              active: elem.key === updateElem.key ? updateElem.active : elem.active
            })
          }
          state.detailResult = {list: tmp}
      }
      if(deleteElem) {
        state.detailResult = {
          list: state.detailResult.list.filter(item => item.key !== deleteElem.key)
        }
      }
      if (list) {
        state.detailResult = {
          list: list
        }
      }
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

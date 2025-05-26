
import { createSlice } from "@reduxjs/toolkit";

const conditionsStore = createSlice({
  name: "conditions",
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    }
  },
});

// 返回修改的函数
const { setItems } = conditionsStore.actions;

export { setItems };

// 返回reducer
const conditionsReducer = conditionsStore.reducer;

export default conditionsReducer;

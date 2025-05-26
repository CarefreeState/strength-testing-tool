import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import conditionsReducer from './modules/conditions'

const store = configureStore({
  reducer: {
    condtions: conditionsReducer,
  },
})

const AppStore = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}


export default AppStore;
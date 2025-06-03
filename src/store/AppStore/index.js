import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import robotConditionsReducer from './modules/robot/conditions'
import overseasConditionsReducer from './modules/overseas/conditions'
import domesticConditionsReducer from './modules/domestic/conditions'
import robotResultsReducer from './modules/robot/results'
import overseasResultsReducer from './modules/overseas/results'
import domesticResultsReducer from './modules/domestic/results'

const store = configureStore({
  reducer: {
    robotCondtions: robotConditionsReducer,
    robotResults: robotResultsReducer,
    overseasCondtions: overseasConditionsReducer,
    overseasResults: overseasResultsReducer,
    domesticCondtions: domesticConditionsReducer,
    domesitcResults: domesticResultsReducer,
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
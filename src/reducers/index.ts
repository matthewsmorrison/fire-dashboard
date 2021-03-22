import { combineReducers } from 'redux'
import applicationReducer from 'services/application'

export default combineReducers({
  application: applicationReducer,
})
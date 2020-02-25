import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as user from './user/reducer'
import * as weather from './weather/reducer'
import thunk from 'redux-thunk'

let store = createStore(
  combineReducers({ ...user, ...weather}),
  applyMiddleware(thunk)
)

export default store

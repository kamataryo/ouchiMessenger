import { createStore, combineReducers } from 'redux'

/**
 * Reducers
 */
import taskReducer from './reducers/task'
import profileReducer from './reducers/profile'

/**
 * store
 * @type {object}
 */
const store = createStore(
  combineReducers({
    task: taskReducer,
    profile: profileReducer,
  }),
)

/**
 * export
 */
export default store

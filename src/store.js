import { createStore, combineReducers } from 'redux'

/**
 * Reducers
 */
import taskReducer from './reducers/task'

/**
 * store
 * @type {object}
 */
const store = createStore(
  combineReducers({
    task: taskReducer,
  }),
)

/**
 * export
 */
export default store

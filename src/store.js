import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/**
 * Reducers
 */
import modalReducer from './reducers/modal'
import taskReducer from './reducers/task'
import profileReducer from './reducers/profile'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  modal: modalReducer,
  task: taskReducer,
  profile: profileReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

/**
 * store
 * @type {object}
 */
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

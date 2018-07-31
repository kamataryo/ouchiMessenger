import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

/**
 * Reducers
 */
import modalReducer from 'src/reducers/modal'
import notificationReducer from 'src/reducers/notification'
import taskReducer from 'src/reducers/task'
import profileReducer from 'src/reducers/profile'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  modal: modalReducer,
  notification: notificationReducer,
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

import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import RootNavigator from 'src/components/screens'
import NotificationHandler from 'src/components/system/notification-handler'
export const App = () => {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <RootNavigator />
        <NotificationHandler />
      </PersistGate>
    </Provider>
  )
}

export default App

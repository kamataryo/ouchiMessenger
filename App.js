import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import RootNavigator from 'src/components/screens'
import NotificationHandler from 'src/components/system/notification-handler'
import InitialModal from 'src/components/commons/initial-modal'

export const App = () => {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <RootNavigator />
        <NotificationHandler />
        <InitialModal />
      </PersistGate>
    </Provider>
  )
}

export default App

import React from 'react'
import { Provider } from 'react-redux'
import RootNavigator from './src/components/screens'
import { store, persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'

export const App = () => {
  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor }>
        <RootNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App

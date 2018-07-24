import React from 'react'
import { Provider } from 'react-redux'
import RootNavigator from 'src/components/screens'
import store from './src/store'
export const App = () => {
  return (
    <Provider store={ store }>
      <RootNavigator />
    </Provider>
  )
}

export default App

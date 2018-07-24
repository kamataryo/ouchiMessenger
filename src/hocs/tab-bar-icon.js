// @flow
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {
  tintColor: string,
  focused: boolean,
}

export const tabBarIconHOC = (iconName: string) =>
  function TabBarIcon({ tintColor, focused }: Props) {
    return (
      <Ionicons
        name={ focused ? `ios-${iconName}` : `ios-${iconName}-outline` }
        size={ 26 }
        style={ { color: tintColor } }
      />
    )
  }

export default tabBarIconHOC

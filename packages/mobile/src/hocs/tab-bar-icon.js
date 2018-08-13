// @flow

import type { StoreState } from 'src/types/store'

import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Badge from 'src/components/commons/badge'

type Props = {
  tintColor: string,
  focused: boolean,
  badgeNumber: number,
}

export const tabBarIconHOC = (
  iconName: string,
  mapBadgeNumberFromState?: (state: StoreState) => number = () => -1,
) => {
  const mapStateToProps =
    typeof mapBadgeNumberFromState === 'function'
      ? state => ({ badgeNumber: mapBadgeNumberFromState(state) })
      : () => ({})

  const TabBarIcon = ({ tintColor, focused, badgeNumber }: Props) => {
    return (
      <View>
        <Ionicons
          name={ focused ? `ios-${iconName}` : `ios-${iconName}-outline` }
          size={ 26 }
          style={ { color: tintColor } }
        />
        {badgeNumber > 0 && <Badge number={ badgeNumber } />}
      </View>
    )
  }

  const ConnectedIcon = connect(mapStateToProps)(TabBarIcon)
  const Result = (props: Props) => <ConnectedIcon { ...props } />

  return Result
}

export default tabBarIconHOC

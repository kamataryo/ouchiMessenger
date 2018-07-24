// @flow

import React from 'react'
import { connect } from 'react-redux'
import { Task } from 'src/types/task'
import { SafeAreaView } from 'react-navigation'
import { Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

type props = {}

export class Tasks extends React.PureComponent<props> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'ユーザー',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={ focused ? 'ios-paw' : 'ios-paw-outline' }
          size={ 26 }
          style={ { color: tintColor } }
        />
      ),
      headerForceInset: { top: '24px' },
    }
  }

  /**
   * render
   * @return {ReactElement|null|false} render a React element.
   */
  render() {
    return (
      <SafeAreaView>
        <Text>{'ユーザー'}</Text>
        <Text>{'ユーザー'}</Text>
        <Text>{'ユーザー'}</Text>
        <Text>{'ユーザー'}</Text>
        <Text>{'ユーザー'}</Text>
      </SafeAreaView>
    )
  }
}

export const mapStateToProps = state => ({
  tasks: [],
})

export default connect(mapStateToProps)(Tasks)

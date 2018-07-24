import { createBottomTabNavigator } from 'react-navigation'
import Tasks from './tasks'
import Profile from './profile'

const RouteConfigs = {
  Tasks: {
    screen: Tasks,
  },
  Profile: {
    screen: Profile,
  },
}

const BottomTabNavigatorConfig = {
  initialRouteName: 'Tasks',
}

export const RootStack = createBottomTabNavigator(
  RouteConfigs,
  BottomTabNavigatorConfig,
)

export default RootStack

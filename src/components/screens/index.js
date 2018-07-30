import { createBottomTabNavigator } from 'react-navigation'
import Tasks from './tasks'
import Profile from './profile'

const RouteConfigs = {
  tasks: {
    screen: Tasks,
  },
  profile: {
    screen: Profile,
  },
}

const BottomTabNavigatorConfig = {
  initialRouteName: 'tasks',
  // initialRouteName: 'profile',
}

export const BOTTOM_TAB_NAVIGATION_HEIGHT = 140

export const RootStack = createBottomTabNavigator(
  RouteConfigs,
  BottomTabNavigatorConfig,
)

export default RootStack

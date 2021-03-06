import { textWhite } from './colors'

export const headerTitleStyle = {
  color: textWhite,
  fontSize: 18,
  fontWeight: 'bold',
}

export const headerIcons = {
  left: {
    size: 30,
    style: {
      color: textWhite,
      zIndex: 10000,
      position: 'absolute',
      bottom: -10,
      left: 0,
      paddingTop: 10,
      paddingRight: 10,
      paddingLeft: 10,
    },
  },
  right: {
    size: 30,
    style: {
      color: textWhite,
      zIndex: 10000,
      position: 'absolute',
      bottom: -10,
      right: 0,
      paddingTop: 10,
      paddingRight: 10,
      paddingLeft: 10,
    },
  },
}

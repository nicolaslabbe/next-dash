import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import Images from './Images'

const ApplicationStyles = {
  screen: {
    container: {
      flex: 1,
      width: Metrics.screenWidth,
      height: Metrics.screenHeight,
      backgroundColor: 'transparent'
    }
  },
  text: {
    default: {
      fontSize: '12px',
      color: Colors.default
    },
    title: {
      fontSize: '20px',
      color: Colors.brand
    }
  }
}

export default ApplicationStyles
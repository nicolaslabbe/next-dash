import React from 'react'

class Icon extends React.Component {

  convertIcon = (code) => {
    switch(code) {
		case '01d':
			return 'A'
			break
		case '02d':
			return 'C'
			break
		case '03d':
			return 'C'
			break
		case '04d':
			return 'C'
			break
		case '09d':
			return 'X'
			break
		case '10d':
			return 'F'
			break
		case '11d':
			return 'T'
			break
		case '13d':
			return 'W'
			break
		case '50d':
			return 'C'
			break
		case '01n':
			return 'I'
			break
		case '02n':
			return 'D'
			break
		case '03n':
			return 'C'
			break
		case '04n':
			return 'C'
			break
		case '09n':
			return 'W'
			break
		case '10n':
			return 'W'
			break
		case '11n':
			return 'T'
			break
		case '13n':
			return 'W'
			break
		case '50n':
			return 'D'
			break
    }
    return ''
  }

  render () {
  	const { className } = this.props
    return (
      <i
      	style={{
      		width: this.props.size,
      		height: this.props.size,
      		fontSize: this.props.size,
      		color: this.props.color
      	}}
      	className={`${className ? className : ''} icon weather-icons ${this.props.dark ? 'dark' : ''}`}>
      	{this.convertIcon(this.props.name)}</i>
    )
  }
}

export default Icon
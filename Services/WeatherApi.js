import fetch from 'fetch-everywhere'
import Utils from '../Utils'

const create = () => {
  return {
    get: (id) => {
    	return new Promise((resolve) => {
			fetch(`${Utils.config.url}/api/weather/find/524901`)
			.then((response) => response.json())
			.then((responseJson) => {
				resolve(responseJson.result)
			})
			.catch((error) => {
				resolve({
					error: error
				})
			})
    	})
    }
  }
}

export default {
  create
}
import fetch from 'fetch-everywhere'

// our "constructor"
const create = () => {
  return {
    get: (id) => {
    	return new Promise((resolve) => {
			fetch(`http://api.openweathermap.org/data/2.5/forecast/${id}?units=metric&id=524901&APPID=${process.env.OPEN_WEATHER}`)
				.then((response) => response.json())
				.then((responseJson) => {
					var result = responseJson.list[0]
					resolve({
						degree: result.main.temp,
						humidity: result.main.humidity,
						label: result.weather[0].main,
						description: result.weather[0].description,
						icon: result.weather[0].icon,
						wind: result.wind.speed
					})
				})
				.catch((error) => {
					console.log('error', error)
					resolve({
						error: error
					})
				});
    	})
    }
  }
}

// let's return back our create method as the default.
export default {
  create
}
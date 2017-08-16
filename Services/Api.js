import fetch from 'fetch-everywhere'

const create = () => {
  return {
    get: (url) => {
    	return new Promise((resolve) => {
			fetch(url)
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
    },
    put: (url, data) => {
    	return new Promise((resolve) => {
			fetch(url, {
			    method: "PUT",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
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
    },
    post: (url, data) => {
    	return new Promise((resolve) => {
			fetch(url, {
			    method: "PUT",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
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
    },
    delete: (url) => {
    	return new Promise((resolve) => {
			fetch(url)
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
    },
    patch: (url, data) => {
    	console.log(url, data)
    	return new Promise((resolve) => {
			fetch(url, {
			    method: "PATCH",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
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
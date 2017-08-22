import fetch from 'fetch-everywhere'

const create = () => {
  return {
    get: (url) => {
    	return new Promise((resolve) => {
			fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.error) {
					resolve(responseJson)
				}else {
					resolve(responseJson.result)
				}
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
			    method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
			})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.error) {
					resolve(responseJson)
				}else {
					resolve(responseJson.result)
				}
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
			fetch(url, {
			    method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.error) {
					resolve(responseJson)
				}else {
					resolve(responseJson.result)
				}
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
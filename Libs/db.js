const path = require('path')
const filesystem = require('./filesystem')
const status = require('./status')
const Utils = require('../Utils')

const all = (name) => {
	return new Promise((resolve, reject) => {
		filesystem.read(path.join(Utils.config.pathData, `${name}.json`))
			.then((data) => {
				resolve(data)
			},
			(err) => {
				reject(err)
			})
	})
}

const find = (name, key, value) => {
	return new Promise((resolve, reject) => {
		var result = []
		filesystem.read(path.join(Utils.config.pathData, `${name}.json`))
			.then((data) => {
				Array.prototype.forEach.call(data, (item) => {
					if (item[key] == value) {
						result.push(item)
					}
				})
				resolve(result)
			},
			(err) => reject(err))
	})
}

const remove = (name, key, value) => {
	return new Promise((resolve, reject) => {
		var result = []
		filesystem.read(path.join(Utils.config.pathData, `${name}.json`))
			.then((data) => {
				Array.prototype.forEach.call(data, (item) => {
					if (item[key] != value) {
						result.push(item) 
					}
				})
				filesystem.write(path.join(Utils.config.pathData, `${name}.json`), result)
					.then(() => resolve(result),
					(error) => reject(error))
			},
			(err) => reject(err))
	})
}

const removeAll = (name) => {
	return new Promise((resolve, reject) => {
		filesystem.remove(path.join(Utils.config.pathData, `${name}.json`))
			.then(() => resolve('ok'),
			(error) => reject(error))
	})
}

const add = (name, data) => {
	return new Promise((resolve, reject) => {
		const filepath = path.join(Utils.config.pathData, `${name}.json`)
		filesystem.read(filepath)
			.then((oldData) => {
				var id = 0
				if (oldData.length > 0) {
					id = parseInt(oldData[oldData.length - 1].id) + 1
				}
				filesystem.write(filepath, [
					...oldData,
					{
						...data,
						id: id
					}
					])
					.then((newData) => resolve({
						...data,
						id: id
					}),
					(error) => reject(error))
			},
			(err) => {
				filesystem.write(filepath, [{
						...data,
						id: 0
					}])
					.then((newData) => resolve({
						...data,
						id: 0
					}),
					(error) => reject(error))
			})
	})
}
module.exports = {
	all,
	find,
	remove,
	removeAll,
	add
}
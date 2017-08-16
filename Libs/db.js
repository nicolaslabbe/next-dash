import path from 'path'
import * as filesystem from './filesystem'
import status from './status'
import Utils from '../Utils'

export const all = (name) => {
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

export const find = (name, key, value) => {
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

export const remove = (name, key, value) => {
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

export const removeAll = (name) => {
	return new Promise((resolve, reject) => {
		filesystem.remove(path.join(Utils.config.pathData, `${name}.json`))
			.then(() => resolve('ok'),
			(error) => reject(error))
	})
}

export const add = (name, data) => {
	return new Promise((resolve, reject) => {
		const filepath = path.join(Utils.config.pathData, `${name}.json`)
		console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
		console.log('filepath', filepath)
		filesystem.read(filepath)
			.then((oldData) => {
				console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
				console.log('oldData', oldData)
				filesystem.write(filepath, [
					...oldData,
					{
						...data,
						id: parseInt(oldData[oldData.length - 1].id) + 1
					}
					])
					.then((newData) => resolve(newData),
					(error) => reject(error))
			},
			(err) => {
				console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
				console.log('err', err)
				console.log('data', [{
						...data,
						id: 0
					}])
				filesystem.write(filepath, [{
						...data,
						id: 0
					}])
					.then((newData) => resolve(newData),
					(error) => reject(error))
			})
	})
}
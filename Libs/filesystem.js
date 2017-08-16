import path from 'path'
import jetpack from 'fs-jetpack'
import mergeAdvanced from 'object-merge-advanced'

import Utils from '../Utils'

export const exist = (file) => {
	return new Promise((resolve, reject) => {
		jetpack.fileAsync(file)
			.then(() => resolve())
			.catch((err) => reject(err))
	})
}

export const write = (filepath, originalData) => {
	return new Promise((resolve, reject) => {
		jetpack.fileAsync(filepath, { mode: '777', content: originalData })
			.then((data) => resolve(originalData))
			.catch((err) => reject(err))
	})
}

export const remove = (filepath) => {
	return new Promise((resolve, reject) => {
		exist(filepath)
			.then(() => {
				jetpack.removeAsync(filepath)
					.then((data) => {
						resolve('ok')
					})
					.catch((err) => reject(err))
			},
			(err) => {
				var name = filepath.split('/')
				reject(`'${name[name.length - 1].replace(/\..+/, '')}' doesnt exist`)
			})
	})
}

export const read = (filepath) => {
	return new Promise((resolve, reject) => {
		exist(filepath)
			.then(() => {
				jetpack.readAsync(filepath, 'json')
					.then((data) => resolve(data))
					.catch((err) => reject(err))
			},
			(err) => {
				var name = filepath.split('/')
				reject(`'${name[name.length - 1].replace(/\..+/, '')}' doesnt exist`)
			})
	})
}

export const update = (filepath, originalData) => {
	return write(filepath, originalData)
}

export const merge = (filepath, originalData) => {
	return new Promise((resolve, reject) => {
		jetpack.readAsync(filepath, 'json')
			.then((dataOld) => {
				var merged
				if (Object.prototype.toString.call(dataOld) === '[object Array]') {
					merged = dataOld.concat(originalData)
				}else {
					merged = mergeAdvanced(dataOld, originalData)
				}
				write(filepath, merged)
					.then((data) => resolve(merged))
					.catch((err) => reject(err))
			})
			.catch((err) => {
				write(filepath, originalData)
					.then((data) => resolve(originalData))
					.catch((err) => reject(err))
			})
	})
}
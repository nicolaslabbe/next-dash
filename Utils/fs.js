import path from 'path'
import mkdirp from 'mkdirp'
import jetpack from 'fs-jetpack'
import mergeAdvanced from 'object-merge-advanced'

import config from './config'

export const exist = (file) => {
	jetpack.fileAsync(file)
}

export const write = (folder, name, data) => {
	return new Promise((resolve, reject) => {
		jetpack.fileAsync(path.join(folder, name), { mode: '777', content: data })
			.then((data) => resolve(data))
			.catch((err) => reject(err))
	})
}

export const remove = (folder, name, data) => {
	return new Promise((resolve, reject) => {
		jetpack.removeAsync(path.join(folder, name))
			.then((data) => resolve(data))
			.catch((err) => reject(err))
	})
}

export const read = (folder, name) => {
	return new Promise((resolve, reject) => {
		jetpack.readAsync(path.join(folder, name), 'json')
			.then((data) => resolve(data))
			.catch((err) => reject(err))
	})
}

export const update = (folder, name, data) => {
	return write(folder, name, mergeAdvanced(data))
}

export const merge = (folder, name, data) => {
	return new Promise((resolve, reject) => {
		jetpack.readAsync(path.join(folder, name), 'json')
			.then((dataOld) => {
				write(folder, name, mergeAdvanced(dataOld, data))
					.then((data) => resolve(data))
					.catch((err) => reject(err))
			})
			.catch((err) => reject(err))
	})
}
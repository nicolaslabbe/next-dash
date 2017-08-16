import fetch from 'fetch-everywhere'
import Utils from '../Utils'
import Api from './Api'

const create = () => {
  return {
    get: (url) => {
    	var toFetch
    	if (url.indexOf('weather') > -1) {
    		toFetch = 'weather'
    	}else if (url.indexOf('train') > -1) {
        toFetch = 'train'
      }else if (url.indexOf('news') > -1) {
        toFetch = 'news'
      }
      if (toFetch) {

        return new Promise((resolve) => {
          fetch(`${Utils.config.url}/api/fixture/${toFetch}`)
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
      }else {
        return Api.create().get(url)
      }
    },
    put: (url, data) => {
      return Api.create().put(url, data)
    },
    post: (url, data) => {
      return Api.create().post(url, data)
    },
    delete: (url) => {
      return Api.create().delete(url, data)
    },
    patch: (url, data) => {
      return Api.create().patch(url, data)
    }
  }
}

export default {
  create
}
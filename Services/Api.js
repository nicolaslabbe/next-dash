import fetch from "fetch-everywhere";
import Utils from "../Utils";

const create = () => {
  return {
    get: url => {
      return new Promise(resolve => {
        fetch(
          `${typeof window !== "undefined"
            ? Utils.config.url_public
            : Utils.config.url_server}${url}`
        )
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.error) {
              resolve(responseJson);
            } else {
              resolve(responseJson.result);
            }
          })
          .catch(error => {
            resolve({
              error: error
            });
          });
      });
    },
    post: (url, data) => {
      return new Promise(resolve => {
        fetch(
          `${typeof window !== "undefined"
            ? Utils.config.url_public
            : Utils.config.url_server}${url}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        )
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.error) {
              resolve(responseJson);
            } else {
              resolve(responseJson.result);
            }
          })
          .catch(error => {
            resolve({
              error: error
            });
          });
      });
    },
    delete: url => {
      return new Promise(resolve => {
        fetch(
          `${typeof window !== "undefined"
            ? Utils.config.url_public
            : Utils.config.url_server}${url}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.error) {
              resolve(responseJson);
            } else {
              resolve(responseJson.result);
            }
          })
          .catch(error => {
            resolve({
              error: error
            });
          });
      });
    }
  };
};

export default {
  create
};

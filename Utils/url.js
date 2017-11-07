module.exports.get = (url, headers) => {
  return new Promise((resolve, reject) => {
    fetch(url, headers)
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        reject(error);
      });
  });
};

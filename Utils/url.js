module.exports.get = (url, headers) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: headers
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          resolve(responseJson);
        } else {
          resolve(responseJson);
        }
      })
      .catch(error => {
        resolve(error);
      });
  });
};

module.exports.post = (url, headers, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        if (responseJson.error) {
          resolve(responseJson);
        } else {
          resolve(responseJson);
        }
      })
      .catch(error => {
        resolve(error);
      });
  });
};

module.exports.delete = (url, headers) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: headers
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          resolve(responseJson);
        } else {
          resolve(responseJson);
        }
      })
      .catch(error => {
        resolve(error);
      });
  });
};

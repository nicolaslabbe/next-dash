module.exports.get = (baseUrl, type, apiKey, id) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${type}/${id}/videos?api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        console.log("responseJson", responseJson);
        resolve(responseJson.results);
      })
      .catch(error => {
        reject(error);
      });
  });
};

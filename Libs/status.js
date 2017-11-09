const success = (res, data) => {
  res.status(200).send(data);
};

const error = (res, err) => {
  res.status(400).send(err);
};

module.exports = {
  success,
  error
};

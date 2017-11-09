module.exports.catch = err => {
  return {
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack
    }
  };
};

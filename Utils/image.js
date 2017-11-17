module.exports.poster = item => {
  return {
    xsr: `http://image.tmdb.org/t/p/w92${item.poster_path}`,
    xs: `http://image.tmdb.org/t/p/w154${item.poster_path}`,
    sm: `http://image.tmdb.org/t/p/w185${item.poster_path}`,
    md: `http://image.tmdb.org/t/p/w342${item.poster_path}`,
    xl: `http://image.tmdb.org/t/p/w500${item.poster_path}`,
    xlr: `http://image.tmdb.org/t/p/w780${item.poster_path}`
  };
};

module.exports.averageIcon = count => {
  var res = "";
  if (count < 2) {
    return "sentiment_very_dissatisfied";
  } else if (count <= 4) {
    return "sentiment_dissatisfied";
  } else if (count <= 6) {
    return "sentiment_neutral";
  } else if (count <= 8) {
    return "sentiment_satisfied";
  } else if (count <= 10) {
    return "sentiment_very_satisfied";
  } else {
    return "sentiment_neutral";
  }
};

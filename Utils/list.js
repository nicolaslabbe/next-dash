module.exports.make = (left, leftIcon, right, rightIcon, id, more) => {
  var item = {};
  left ? (item["left"] = left) : null;
  leftIcon ? (item["leftIcon"] = leftIcon) : null;
  right ? (item["right"] = right) : null;
  rightIcon ? (item["rightIcon"] = rightIcon) : null;
  id ? (item["id"] = id) : null;
  return {
    ...item,
    ...more
  };
};

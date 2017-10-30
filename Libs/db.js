const path = require("path");
const filesystem = require("./filesystem");
const status = require("./status");
const Utils = require("../Utils");

const all = name => {
  return new Promise((resolve, reject) => {
    console.log(path.join(Utils.config.pathData, `${name}.json`));
    filesystem.read(path.join(Utils.config.pathData, `${name}.json`)).then(
      data => {
        resolve(data);
      },
      err => {
        reject(err);
      }
    );
  });
};

const find = (name, key, value) => {
  return new Promise((resolve, reject) => {
    var result = [];
    filesystem.read(path.join(Utils.config.pathData, `${name}.json`)).then(
      data => {
        Array.prototype.forEach.call(data, item => {
          if (item[key] == value) {
            result.push(item);
          }
        });
        resolve(result);
      },
      err => reject(err)
    );
  });
};

const remove = (name, key, value) => {
  return new Promise((resolve, reject) => {
    var result = [];
    var values = value.split(",");
    filesystem.read(path.join(Utils.config.pathData, `${name}.json`)).then(
      data => {
        Array.prototype.forEach.call(data, item => {
          var found = false;

          Array.prototype.forEach.call(values, val => {
            if (item[key] == val) {
              found = true;
            }
          });
          if (!found) {
            result.push(item);
          }
        });

        // Array.prototype.forEach.call(data, (item) => {
        // 	if (item[key] != value) {
        // 		result.push(item)
        // 	}
        // })
        filesystem
          .write(path.join(Utils.config.pathData, `${name}.json`), result)
          .then(() => resolve(result), error => reject(error));
      },
      err => reject(err)
    );
  });
};

const removeAll = name => {
  return new Promise((resolve, reject) => {
    filesystem
      .remove(path.join(Utils.config.pathData, `${name}.json`))
      .then(() => resolve("ok"), error => reject(error));
  });
};

const add = (name, data) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(Utils.config.pathData, `${name}.json`);
    filesystem.read(filepath).then(
      oldData => {
        var apiId = 0;
        if (oldData.length > 0) {
          apiId = parseInt(oldData[oldData.length - 1].apiId) + 1;
        }
        data.apiId = apiId;
        oldData = oldData.concat([data]);
        filesystem
          .write(filepath, oldData)
          .then(newData => resolve(data), error => reject(error));
      },
      err => {
        data.apiId = 0;
        filesystem
          .write(filepath, [data])
          .then(newData => resolve(data), error => reject(error));
      }
    );
  });
};
module.exports = {
  all,
  find,
  remove,
  removeAll,
  add
};

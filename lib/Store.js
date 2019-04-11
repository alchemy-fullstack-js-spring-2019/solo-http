const fs = require('fs');
const fsPromises = require('fs').promises;
const uuid = require('uuid/v4');

class Store {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  create(obj) {
    const _id = uuid();
    const objWithId = { ...obj, _id };
    const objWithIdStr = JSON.stringify(objWithId);
    return fsPromises.writeFile(this.storedFilePath(_id), objWithIdStr)
      .then(() => objWithId);
  }

  findById(_id) {
    return fsPromises.readFile(this.storedFilePath(_id), { encoding: 'utf8' })
      .then(jsonObj => JSON.parse(jsonObj));
  }

  find() {
    return fsPromises.readdir(this.rootDir)
      .then(listOfIds => {
        if(listOfIds.length < 1) return [];
        return Promise.all(
          listOfIds.map((item, i) => {
            return this.findById(listOfIds[i]);
          }));
      });
  }

  findByIdAndDelete(_id) {
    return fsPromises.unlink(this.storedFilePath(_id))
      .then(() => {
        return {
          deleted: 1
        };
      });
  }

  findByIdAndUpdate(_id, updatedObject) {
    const objToWrite = { ...updatedObject, _id };
    const objToWriteStr = JSON.stringify(objToWrite);
    return fsPromises.writeFile(this.storedFilePath(_id), objToWriteStr)
      .then(() => objToWrite);
  }

  drop(callback) {
    fs.readdir(this.rootDir, (err, files) => {
      if(err) return callback(err);

      let count = files.length;
      if(count === 0) return callback();
      files.forEach(file => {
        fs.unlink(this.storedFilePath(file), () => {
          count -= 1;
          if(count <= 0) callback();
        });
      });
    });
  }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}

module.exports = Store;

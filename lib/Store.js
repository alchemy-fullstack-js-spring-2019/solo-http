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
      .then(data => JSON.parse(data));
  }

  find() {
    return fsPromises.readdir(this.rootDir)
      .then(ids => {
        const findAllIds = ids.map(id => this.findById(id));
        return Promise.all(findAllIds);
      });
  }

  findByIdAndDelete(_id) {
    return fsPromises.unlink(this.storedFilePath(_id))
      .then(() => ({
        deleted: 1
      }));
  }

  findByIdAndUpdate(_id, updatedObject, callback) {
    this.findById(_id, err => {
      if(err) return callback(err);
      const objToWrite = { ...updatedObject, _id };
      const objToWriteStr = JSON.stringify(objToWrite);
      fsPromises.writeFile(this.storedFilePath(_id), objToWriteStr, err => {
        callback(err, objToWrite);
      });
    });
  }

  drop(callback) {
    fsPromises.readdir(this.rootDir, (err, files) => {
      if(err) return callback(err);

      let count = files.length;
      if(count === 0) return callback();
      files.forEach(file => {
        fsPromises.unlink(this.storedFilePath(file), () => {
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

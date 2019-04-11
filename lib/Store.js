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
      .then(() => {
        return objWithId;
      });
  }

  findById(_id) {
    return fsPromises.readFile(this.storedFilePath(_id), { encoding: 'utf8' })
      .then(data => {
        const obj = JSON.parse(data);
        return obj;
      });
  }

  find() {
    return fsPromises.readdir(this.rootDir)
      .then(listOfIds => {
        return Promise.all(listOfIds => {
          listOfIds.map();
        });
        console.log(listOfIds);
        let count = listOfIds.length;
        if(count < 1) return ([]);

        const items = [];
        listOfIds.forEach(_id => {
          return this.findById(_id)
            .then(item => {
              count -= 1;
              items.push(item);
              if(count <= 0) return items;
            });
        });
      });
  }

  findByIdAndDelete(_id, callback) {
    fs.unlink(this.storedFilePath(_id), err => {
      callback(err, { deleted: 1 });
    });
  }

  findByIdAndUpdate(_id, updatedObject, callback) {
    this.findById(_id, err => {
      if(err) return callback(err);
      const objToWrite = { ...updatedObject, _id };
      const objToWriteStr = JSON.stringify(objToWrite);
      fs.writeFile(this.storedFilePath(_id), objToWriteStr, err => {
        callback(err, objToWrite);
      });
    });
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

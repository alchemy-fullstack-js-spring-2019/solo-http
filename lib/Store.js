const fsPromises = require('fs').promises;
const fs = require('fs');
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
      .then(() => {return objWithId;});
  }
  

  findById(_id) {
    return fsPromises.readFile(this.storedFilePath(_id), { encoding: 'utf8' })
      .then(res => JSON.parse(res))
      .then(data => data);    
  }

  find() {
    return fsPromises.readdir(this.rootDir)
      .then(listOfIds => {
        return Promise.all(listOfIds.map(id => this.findById(id)));
      });
  }

  findByIdAndDelete(_id) {
    let success = { deleted: 1 };
    return fsPromises.unlink(this.storedFilePath(_id)) 
      .then(() => success);
  }

  findByIdAndUpdate(_id, updatedObject) {
    const objToWrite = { ...updatedObject, _id };
    const objToWriteStr = JSON.stringify(objToWrite);
    return this.findById(_id)
      .then(foundItem => fsPromises.writeFile(this.storedFilePath(foundItem._id), objToWriteStr))
      .then(() => this.findById(_id));
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

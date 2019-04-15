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
          listOfIds.map(id => this.findById(id))
        );
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
    return this.findById(_id)
      .then(foundItem => {
        if(!foundItem) throw 'No file found';
        const objToWrite = { ...updatedObject, _id };
        const objToWriteStr = JSON.stringify(objToWrite);
        return fsPromises.writeFile(this.storedFilePath(_id), objToWriteStr)
          .then(() => objToWrite);
      });
  }

  drop() {
    return fsPromises.readdir(this.rootDir)
      .then(files => {
        return Promise.all([
          files.map(file => {
            return fsPromises.unlink(this.storedFilePath(file));
          })
        ]);
      });
  }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}

module.exports = Store;

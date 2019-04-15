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
      .then(listOfIds => Promise.all(
        listOfIds.map(_id => this.findById(_id))
      ));
  }

  findByIdAndDelete(_id) {
    return fsPromises.unlink(this.storedFilePath(_id))
      .then(() => ({ deleted: 1 }));
  }

  findByIdAndUpdate(_id, updatedObject) {
    updatedObject._id = _id;
    return fsPromises.writeFile(this.storedFilePath(_id), JSON.stringify(updatedObject))
      .then(() => updatedObject);
  }

  drop() {
    return fsPromises.readdir(this.rootDir)
      .then(listOfIds => Promise.all(
        listOfIds.map(_id => this.findByIdAndDelete(_id))
      ))
      .then(deleted => ({ deleted: deleted.length }));
  }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}

module.exports = Store;

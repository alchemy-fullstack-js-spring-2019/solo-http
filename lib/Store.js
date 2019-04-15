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
      .then(() => Promise.resolve(objWithId));
  }

  findById(_id) {
    
    return fsPromises.readFile(this.storedFilePath(_id), { encoding: 'utf8' })
      .then((data) => JSON.parse(data));
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
      .then((e)=>{
        if(e) throw e;
        return { deleted: 1 };
      });
  }

  
  findByIdAndUpdate(_id, updatedObject) {
    return this.findById(_id)
      .then(oldObject=>{  
        if(!oldObject) throw 'No Item Exists';   
        return fs.promises.writeFile(this.storedFilePath(_id), JSON.stringify(updatedObject));
      })
      .then(()=>{
        const updatedObjectWithId = { ...updatedObject, _id };
        return updatedObjectWithId;
      });
  }
    

  drop() {
    return fsPromises.readdir(this.rootDir)
      .then(files=>{
        return Promise.all(files.map(file=>fsPromises.unlink(this.storedFilePath(file))));
      });
  }

  storedFilePath(_id) {
    return `${this.rootDir}/${_id}`;
  }
}
module.exports = Store;

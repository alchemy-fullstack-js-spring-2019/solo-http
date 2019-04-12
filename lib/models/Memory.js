const uuid = require('uuid/v4');

class MemoryDatabase {
  constructor() {
    this.store = {};
  }
  create(objectToSave) {
    const uid = uuid();
    const userObject = { ...objectToSave, _id: uid };
    this.store[uid] = userObject;
    return userObject;
  }
  findById(id) {
    if(!this.store[id]) {
      return null;
    }
    return this.store[id];
  }
  find(){
    return Object.values(this.store);
  }
  findByIdAndUpdate(id, newObject) {
    if(!id) {
      return null;
    } 
    const copiedObject = { ...newObject, _id: id };
    this.store[id] = copiedObject;
    return copiedObject;
  }
  deleteById(id){
    if(!this.store[id])
    {
      return null;
    }
    const oldValue = this.store[id];
    delete this.store[id];
    return oldValue;
  }
  drop() {
    delete this.store;
    this.store = {};
  }
}

module.exports = MemoryDatabase;

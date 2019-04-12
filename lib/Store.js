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
        fsPromises.writeFile(this.storedFilePath(_id), objWithIdStr)
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

    findByIdAndUpdate(_id, updatedObject) {
        return this.findById(_id)
            .then(foundItem => {
                if(!foundItem) throw 'No item exists';
                const objToWrite = { ...updatedObject, _id };
                const objToWriteStr = JSON.stringify(objToWrite);
                return fsPromises.writeFile(this.storedFilePath(_id), objToWriteStr);
            })
            .then(() => updatedObject);
    }

    drop() {
        return fsPromises.readdir(this.rootDir)
            .then(files => {
                return Promises.all(files.map(file => fsPromises.unlink(this.storedFilePath(file))));
            });  
    }

    storedFilePath(_id) {
        return `${this.rootDir}/${_id}`;
    }
}

module.exports = Store;

const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/Store');

describe('Store', () => {
  let store = null;

  beforeAll(done => {
    mkdirp('./testData/store', done);
  });

  beforeEach(() => {
    store = new Store('./testData/store');
  });

  beforeEach(() => {
    return store.drop();
  });

  afterAll(done => {
    rimraf('./testData', done);
  });

  it('creates an object in my store', () => {
    let person = { name: 'ryan' };
    return store.create(person)
      .then(newPerson => {
        expect(newPerson._id).toEqual(expect.any(String));
      });
  });
  

  it('finds an object by id', () => {
    return store.create({ name: 'uncle bob' }).then(createdUncle => store.findById(createdUncle._id)
      .then(foundUncle => {
        expect(foundUncle).toEqual({ name: 'uncle bob', _id: createdUncle._id });
      })
    );
  });

  
  it('find all objects tracked by the store', () => {
    const items = [{ item: 1 }, { item: 2 }, { item: 3 }, { item: 4 }, { item: 5 }];
    return Promise.all(items.map(item => store.create(item)))
      .then(allItems => {
        return store.find()
          .then(returnedItems => {
            expect(returnedItems).toHaveLength(5);
            allItems.forEach(item => {
              expect(returnedItems).toContainEqual(item);
            });
          });
      });
  });

  it('deletes an object with an id', () => {
    return store.create({ item: 'I am going to delete' })
      .then(returnedItem => store.findByIdAndDelete(returnedItem._id))
      .then(res => expect(res).toEqual({ deleted: 1 }));
  });

  it('updates an existing object', () => {
    return store.create({ name: 'ffff' })
      .then(createdItem => store.findByIdAndUpdate(createdItem._id, { name: 'cara' }))
      .then(updatedItem => expect(updatedItem.name).toEqual('cara'));
  });

  it('deletes all files from directory', () => {
    return store.create({ name: 'Cara' })
      .then(() => store.drop())
      .then(() => store.find())
      .then(data => expect(data).toEqual([]));
  });
});

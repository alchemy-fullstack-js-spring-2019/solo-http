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
    return store.create({ name: 'ryan' })
      .then(createdPerson => {
        expect(createdPerson).toEqual({ name: 'ryan', _id: expect.any(String) });
      });
  });

  it('finds an object by id', () => {
    return store.create({ name: 'uncle bob' })
      .then(createdUncle => {
        return Promise.all([
          Promise.resolve(createdUncle),
          store.findById(createdUncle._id)
        ]);
      })
      .then(([createdUncle, foundUncle]) => {
        expect(foundUncle).toEqual(createdUncle);
      });
  });

  it('find all objects tracked by the store', () => {
    return Promise.all([
      store.create({ item: 1 }),
      store.create({ item: 2 }),
      store.create({ item: 3 }),
      store.create({ item: 4 }),
      store.create({ item: 5 })
    ])
      .then((items) => Promise.all([
        Promise.resolve(items),
        store.find()
      ]))
      .then(([items, foundItems]) => {
        expect(foundItems).toHaveLength(5);
        items.forEach(item => expect(foundItems).toContainEqual(item));
      });
  });

  it('deletes an object with an id', () => {
    store.create({ item: 'I am going to delete' })
      .then(createdItem => {
        return Promise.all([
          Promise.resolve(createdItem),
          store.findByIdAndDelete(createdItem._id)
        ]);
      })
      .then(([createdItem, deleteResult]) => {
        expect(deleteResult).toEqual({ deleted: 1 });
        return store.findById(createdItem._id);
      });
  });

  it('updates an existing object', () => {
    store.create({ name: 'rayn' })
      .then(createdItem => {
        return store.findByIdAndUpdate(createdItem._id, {
          name: 'ryan'
        });
      })
      .then(updatedItem => {
        expect(updatedItem.name).toEqual('ryan');
      });
  });

  it('deletes all files')
});

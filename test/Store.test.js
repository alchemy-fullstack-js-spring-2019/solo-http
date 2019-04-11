const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/Store');

describe('Store', () => {
  let store = null;

  beforeEach(done => {
    mkdirp('./testData/store', done);
  });

  beforeEach(() => {
    store = new Store('./testData/store');
  });

  afterEach(done => {
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
      .then(createdUncle => Promise.all([
        Promise.resolve(createdUncle),
        store.findById(createdUncle._id)
      ]))
      .then(([createdUncle, foundUncle]) => {
        expect(foundUncle).toEqual(createdUncle);
      });
  });

  it('find all object tracked by the store', () => {
    return Promise.all([
      store.create({ item: 1 }),
      store.create({ item: 2 }),
      store.create({ item: 3 }),
      store.create({ item: 4 }),
      store.create({ item: 5 }),
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
    return store.create({ item: 'I am going to delete' })
      .then(createdItem => Promise.all([Promise.resolve(createdItem), store.findByIdAndDelete(createdItem._id)]))
      .then(([createdItem, result]) => {
        expect(result).toEqual({ deleted: 1 });
        return store.findById(createdItem._id);
      })
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });

  it('updates an existing object', () => {
    return store.create({ name: 'rayn' })
      .then(createdItem => store.findByIdAndUpdate(createdItem._id, { name: 'ryan' }))
      .then(updatedItem => {
        expect(updatedItem.name).toBe('ryan');
        return store.findById(updatedItem._id);
      })
      .then(foundItem => {
        expect(foundItem.name).toBe('ryan');
      });
  });

  it('deletes all files in the root', () => {
    return Promise.all([
      store.create({ item: 1 }),
      store.create({ item: 2 }),
      store.create({ item: 3 }),
      store.create({ item: 4 }),
      store.create({ item: 5 }),
    ])
      .then((items) => Promise.all([
        Promise.resolve(items),
        store.find()
      ]))
      .then(([items, foundItems]) => {
        expect(foundItems).toHaveLength(5);
        items.forEach(item => expect(foundItems).toContainEqual(item));
      })
      .then(() => store.drop())
      .then(results => {
        expect(results).toEqual({ deleted: 5 });
        return store.find();
      })
      .then(foundItems => {
        expect(foundItems).toEqual([]);
      });
  });
});

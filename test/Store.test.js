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
        return Promise.all([(store.findById(createdUncle._id)), createdUncle]);
      })
      .then(([foundUncle, createdUncle]) => {
        expect(foundUncle).toEqual({ name: 'uncle bob', _id: createdUncle._id });
      });
  });

  it('find all objects tracked by the store', () => {
    return Promise.all([
      store.create({ item: 1 }),
      store.create({ item: 2 }),
      store.create({ item: 3 }),
      store.create({ item: 4 }),
      store.create({ item: 5 }),
    ])
      .then((arrayOfItems) => {
        return Promise.all([(store.find()), ...arrayOfItems]);
      })
      .then(([listOfItems, item1, item2, item3, item4, item5]) => {
        expect(listOfItems).toHaveLength(5);
        expect(listOfItems).toContainEqual(item1);
        expect(listOfItems).toContainEqual(item2);
        expect(listOfItems).toContainEqual(item3);
        expect(listOfItems).toContainEqual(item4);
        expect(listOfItems).toContainEqual(item5);
      });
  });

  it('deletes an object with an id', () => {
    return store.create({ item: 'I am going to delete' })
      .then(createdItem => {
        return Promise.all([(store.findByIdAndDelete(createdItem._id)), createdItem]);
      })
      .then(([result, createdItem]) => {
        expect(result).toEqual({ deleted: 1 });
        return store.findById(createdItem._id);
      })
      .catch(error => {
        expect(error).toBeTruthy();
      });
  });

  it('updates an existing object', () => {
    return store.create({ name: 'rayn' })
      .then(typoCreated => {
        return Promise.all([(store.findByIdAndUpdate(typoCreated._id, { name: 'ryan' })), typoCreated]);
      })
      .then(([updatedWithoutTypo, typoCreated]) => {
        expect(updatedWithoutTypo).toEqual({ name: 'ryan', _id: typoCreated._id });
        return Promise.all([(store.findById(typoCreated._id)), updatedWithoutTypo]);
      })
      .then(([foundObj, updatedWithoutTypo]) => {
        expect(foundObj).toEqual(updatedWithoutTypo);
      });
  });
});

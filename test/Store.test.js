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

  beforeEach(done => {
    store.drop(done);
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
      .then(createdPerson => {
        store.findById(createdPerson._id)
          .then(foundPerson => expect(foundPerson).toEqual({ name: 'uncle bob', _id: createdPerson._id }));
      });
  });

  it.only('find all objects tracked by the store', () => {
    for(let i = 1; i < 6; i++) {
      store.create();
    }
    const iArr = [1, 2, 3, 4, 5];
    return Promise.all(
      iArr.forEach(i => store.create({ item: i }))
    )
      .then(store.find())
      .then(listOfItems => {
        expect(listOfItems).toHaveLength(5);
        expect(listOfItems).toContainEqual({ item: 1 });
        expect(listOfItems).toContainEqual({ item: 2 });
        expect(listOfItems).toContainEqual({ item: 3 });
        expect(listOfItems).toContainEqual({ item: 4 });
        expect(listOfItems).toContainEqual({ item: 5 });
      });
  });

  it('deletes an object with an id', done => {
    store.create({ item: 'I am going to delete' }, (err, createdItem) => {
      store.findByIdAndDelete(createdItem._id, (err, result) => {
        expect(err).toBeFalsy();
        expect(result).toEqual({ deleted: 1 });
        store.findById(createdItem._id, (err, foundItem) => {
          expect(err).toBeTruthy();
          expect(foundItem).toBeFalsy();
          done();
        });
      });
    });
  });

  it('updates an existing object', done => {
    store.create({ name: 'rayn' }, (err, typoCreated) => {
      store.findByIdAndUpdate(typoCreated._id, { name: 'ryan' }, (err, updatedWithoutTypo) => {
        expect(err).toBeFalsy();
        expect(updatedWithoutTypo).toEqual({ name: 'ryan', _id: typoCreated._id });
        store.findById(typoCreated._id, (err, foundObj) => {
          expect(foundObj).toEqual(updatedWithoutTypo);
          done();
        });

      });
    });
  });
});

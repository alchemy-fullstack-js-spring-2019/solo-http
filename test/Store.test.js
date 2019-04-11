const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/Store');
const fsPromises = require('fs').promises;

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
      .then(createdPerson => 
        expect(createdPerson).toEqual({ name: 'ryan', _id: expect.any(String) })
      );
  });

  it('finds an object by id', () => {
    return store.create({ name: 'Bob' })
      .then(createdUser => {
        return Promise.all([
          Promise.resolve(createdUser),
          store.findById(createdUser._id)
        ])
          .then(([createdUser, foundUser]) => {
            expect(foundUser).toEqual(createdUser);
          });
      });
  });
 

  it.only('find all objects tracked by the store', () => {
    const undefinedArray = [...Array(5)];
    const ArrayOfItems = undefinedArray.map((_, index) => {
      return {
        item: index
      };
    });
    const createPromises = ArrayOfItems.map(item => store.create(item));
    return Promise.all(createPromises)
      .then(items => {
        return Promise.all([
          Promise.resolve(items),
          store.find()
        ]);
      })
      .then(([items, foundItems]) => {
        const [item1, item2, item3, item4, item5] = items;
        expect(foundItems).toHaveLength(5);
        expect(foundItems).toContainEqual(item1);
        expect(foundItems).toContainEqual(item2);
        expect(foundItems).toContainEqual(item3);
        expect(foundItems).toContainEqual(item4);
        expect(foundItems).toContainEqual(item5);
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

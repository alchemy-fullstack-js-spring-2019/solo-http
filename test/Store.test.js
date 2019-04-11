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

  it('find all objects tracked by the store', () => {
    const iArr = [1, 2, 3, 4, 5];
    return Promise.all(
      iArr.map(i => {
        return store.create({ item: i });
      })
    )
      .then(createdList => {
        store.find()
          .then(listOfItems => {
            expect(listOfItems).toHaveLength(5);
            expect(listOfItems).toContainEqual(createdList[0]);
            expect(listOfItems).toContainEqual(createdList[0]);
            expect(listOfItems).toContainEqual(createdList[0]);
            expect(listOfItems).toContainEqual(createdList[0]);
            expect(listOfItems).toContainEqual(createdList[0]);
          });
      });
  });

  it('deletes an object with an id', () => {
    return store.create({ item: 'I am going to delete' })
      .then(createdItem => {
        return Promise.all([
          Promise.resolve(createdItem),
          store.findByIdAndDelete(createdItem._id)
        ]);
      })
      .then(([createdItem, delObj]) => {
        expect(delObj).toEqual({ deleted: 1 });
        return store.findById(createdItem._id);
      })
      .catch(err => {
        expect(err).toBeTruthy();
      });
        
  });

  it.only('updates an existing object', () => {
    return store.create({ name: 'rayn' })
      .then(createdPerson => store.findByIdAndUpdate(createdPerson, { name: 'ryan' }));
    
    // store.create({ name: 'rayn' }, (err, typoCreated) => {
    //   store.findByIdAndUpdate(typoCreated._id, { name: 'ryan' }, (err, updatedWithoutTypo) => {
    //     expect(err).toBeFalsy();
    //     expect(updatedWithoutTypo).toEqual({ name: 'ryan', _id: typoCreated._id });
    //     store.findById(typoCreated._id, (err, foundObj) => {
    //       expect(foundObj).toEqual(updatedWithoutTypo);
    //       done();
    //     });

    //   });
  });
});

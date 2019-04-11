const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../lib/Store');

describe.skip('Store', () => {
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
      .then(result =>
        expect(result).toEqual({ name: 'ryan', _id: expect.any(String) }));
  });

  it('finds an object by id', () => {
    return store.create({ name: 'uncle bob' })
      .then(createdUncle =>
        store.findById(createdUncle._id)
          .then(foundUncle =>
            expect(foundUncle).toEqual({ name: 'uncle bob', _id: createdUncle._id })
          )
      );
  });

  it('find all objects tracked by the store', () => {
    Promise.all(
      [...Array(5)]
        .map((_, item) => ({
          item
        }))
        .map(item => store.create(item)))
      .then(items => {
        return Promise.all([
          Promise.resolve(items),
          store.find()
        ]);
      })
      .then(([items, foundItems]) =>{
        const [item1, item2, item3, item4, item5] = items;
        expect(foundItems).toContainEqual(item1);
        expect(foundItems).toContainEqual(item2);
        expect(foundItems).toContainEqual(item3);
        expect(foundItems).toContainEqual(item4);
        expect(foundItems).toContainEqual(item5);
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
      .then(([createdItem, deleteResult]) => {
        expect(deleteResult).toEqual({ deleted: 1 });
        return store.findById(createdItem._id);
      })
      .catch(err => {
        expect(err).toBeTruthy();
      });
  });

  it('updates an existing object', done => {
    return store.create({ name: 'saen' })
      .then(createdItem => {
        return store.findByIdAndUpdate(createdItem._id, {
          name: 'sean'
        });
      })
      .then(updatedItem => {
        expect(updatedItem.name).toEqual('sean');
      });

    // store.create({ name: 'rayn' }, (err, typoCreated) => {
    //   store.findByIdAndUpdate(typoCreated._id, { name: 'ryan' }, (err, updatedWithoutTypo) => {
    //     expect(err).toBeFalsy();
    //     expect(updatedWithoutTypo).toEqual({ name: 'ryan', _id: typoCreated._id });
    //     store.findById(typoCreated._id, (err, foundObj) => {
    //       expect(foundObj).toEqual(updatedWithoutTypo);
    //       done();
    //     });

    //   });
    // });
  });
});

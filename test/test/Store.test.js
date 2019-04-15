const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const Store = require('../../lib/Store');

describe('Store', ()=>{
  let store = null;

  
  beforeAll((done)=>{
    mkdirp('./testData/store', done);

  });

  beforeEach(()=>{
    store = new Store('./testData/store');
  });

  beforeEach(()=>{
    return store.drop();
  });

  afterAll((done)=>{
    rimraf('./testData/store', done);
  });
    


  it('creates an objec in my store', ()=>{
    return store.create({ name: 'test' })
      .then(createdPerson=>{
        expect(createdPerson).toEqual({ name:'test', _id: expect.any(String) });
      });
  });

  it('returns user info with id search', ()=>{
    return store.create({ name: 'test' })
      .then((testPerson)=>{
        return Promise.all([
          Promise.resolve(testPerson),
          store.findById(testPerson._id)
        ]);
      })
      .then(([testPerson, foundPerson])=>{
        expect(testPerson).toEqual(foundPerson);
      });
  });
  it('returns all people in store', ()=>{
    const undefinedArray = [...Array(5)];
    const arrayOfItems = undefinedArray.map((_, index)=> ({ 'item': index }));
    const makePromises = arrayOfItems.map(item=>store.create(item));

    return Promise.all(makePromises)
      .then(items =>{
        return Promise.all([
          Promise.resolve(items),
          store.find()
        ]);
      })
      .then(([items, foundItems])=>{
        const [item1, item2, item3, item4, item5] = items;
        expect(foundItems).toHaveLength(5);
        expect(foundItems).toContainEqual(item1);
        expect(foundItems).toContainEqual(item2);
        expect(foundItems).toContainEqual(item3);
        expect(foundItems).toContainEqual(item4);
        expect(foundItems).toContainEqual(item5);
      });    
  });
  it('deletes person by id', ()=>{
    return store
      .create({ 'person to delete': 'Jim Bob' })
      .then(jimWithId=>{
        store.findByIdAndDelete(jimWithId._id);
      })
      .then(()=>store.find())
      .then(foundPeople=>expect(foundPeople.length).toBe(0))
    ;
  });
  it('find person by id and update', ()=>{
    return store  
      .create({ person: 'Jim Bob' })
      .then(personToUpdate=>{
        const  { _id } = personToUpdate;
        const personUpdates = { person: 'Bob Jim', _id: _id };
        return store.findByIdAndUpdate(_id, personUpdates);
      })
      .then(updatedPerson=>expect(updatedPerson).toEqual({ person: 'Bob Jim', _id: expect.any(String) }));
  });
});

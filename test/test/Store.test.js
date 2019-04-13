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


});

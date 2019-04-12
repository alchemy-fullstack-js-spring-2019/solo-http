const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/models/People');

describe('server app routing tests', () => {
  
  afterEach(() => {
    return People.drop();
  });

  it('creates a person with /people', () => {
    const obj = { name: 'chris', age: 23, color: 'blue' };
    return request(app)
      .post('/people')
      .send(obj)
      .then(res => {
        expect(res.body).toEqual({ ...obj, _id: expect.any(String) });
      });
  });

  it('returns all people in directory', () => {
    const createPromises = [...Array(5)]
      .map((_, age) => {
        return {
          name: 'rando',
          age,
          color: 'blue'
        };
      })
      .map(item => {
        return request(app)
          .post('/people')
          .send(item)
          .then(res => res.body)
          .catch(err => {
            console.log(err);
          });
      });

    return Promise.all(createPromises)
      .then(items => {
        return Promise.all([
          Promise.resolve(items),
          request(app).get('/people').then(res => res.body)
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

  it('return a person using /people/id', () => {
    const testPerson = {
      name: 'lauren',
      age: 25,
      color: 'blue'
    };
    return request(app)
      .post('/people')
      .send(testPerson)
      .then(res => res.body)
      .then(savedPerson => {
        return Promise.all([
          Promise.resolve(savedPerson),
          request(app).get(`/people/${savedPerson._id}`).then(res => res.body)
        ]);
      })
      .then(([savedPerson, retrievedPerson]) => {
        expect(savedPerson).toEqual(retrievedPerson);
      });
  });

  it('put method with /people/id updates a person', () => {
    const testObj = { name: 'chris', age: 33, color: 'orange' };
    const testUpdatedObj = { name: 'jim', age: 22, color: 'black' };
    return People.create(testObj)
      .then(createdPerson => {
        return request(app)
          .put(`/people/${createdPerson._id}`)
          .send(testUpdatedObj);
      })
      .then(updatedPerson => {
        return People.findById(updatedPerson.body._id)
          .then(foundPerson => {
            expect(foundPerson).toEqual(updatedPerson.body);
          });
      });
  });

  it('return delete count when deleting with id', () => {
    return People.create({ name: 'joe', age: 12, color: 'brown' })
      .then(createdPerson => {
        return request(app)
          .delete(`/people/${createdPerson._id}`)
          .then(res => res.body)
          .then(deletedObject => {
            expect(deletedObject).toEqual({ deleted: 1 });
          });
      });
  });
});

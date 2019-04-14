const request = require('supertest');
const app = require('../lib/app');
const People = require('../lib/models/People');
const Tasks = require('../lib/models/Tasks');

describe('server app routing tests for people', () => {
  
  afterEach(() => {
    return People.drop();
  });

  it('creates a person with /people', () => {
    const obj = { name: 'chris', age: 23, color: 'blue' };
    return request(app)
      .post('/people')
      .send(obj)
      .then(res => {
        expect(res.body).toEqual({ ...obj, favoriteCharacterId: null, favoriteCharacter: {}, _id: expect.any(String) });
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
          .then(res => res.body);
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

  it('returns a status of not found if path doesn\'t exist', () => {
    const obj = { name: 'chris', age: 23, color: 'blue' };
    return request(app)
      .post('/notfound')
      .send(obj)
      .then(res => {
        expect(res.text).toBe('Not Found');
        expect(res.status).toBe(404);
      });
  });

  it('returns a status of not found if id doesn\'t exist for get, put, and delete', () => {
    const badId = '/people/1234';
    const obj = { name: 'chris', age: 23, color: 'blue' };
    request(app)
      .get(badId)
      .then(res => {
        expect(res.text).toBe('Not Found');
        expect(res.status).toBe(404);
      });
      
    request(app)
      .put(badId)
      .send(obj)
      .then(res => {
        expect(res.text).toBe('Not Found');
        expect(res.status).toBe(404);
      });
    
    request(app)
      .delete(badId)
      .then(res => {
        expect(res.text).toBe('Not Found');
        expect(res.status).toBe(404);
      });
  });
});

describe('server app routing tests for tasks', () => {
  
  afterEach(() => {
    return Tasks.drop();
  });

  it('creates a task with /tasks', () => {
    const obj = { name: 'trash', priority: 2, description: 'text here' };
    return request(app)
      .post('/tasks')
      .send(obj)
      .then(res => {
        expect(res.body).toEqual({ ...obj, _id: expect.any(String) });
      });
  });

  it('returns all tasks in directory', () => {
    const createPromises = [...Array(5)]
      .map((_, priority) => {
        return {
          name: 'rando',
          priority,
          description: 'text here'
        };
      })
      .map(item => {
        return request(app)
          .post('/tasks')
          .send(item)
          .then(res => res.body);
      });

    return Promise.all(createPromises)
      .then(items => {
        return Promise.all([
          Promise.resolve(items),
          request(app).get('/tasks').then(res => res.body)
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

  it('return a task using /tasks/id', () => {
    const testTask = {
      name: 'test',
      priority: 5,
      color: 'text here'
    };
    return request(app)
      .post('/tasks')
      .send(testTask)
      .then(res => res.body)
      .then(savedTask => {
        return Promise.all([
          Promise.resolve(savedTask),
          request(app).get(`/tasks/${savedTask._id}`).then(res => res.body)
        ]);
      })
      .then(([savedTask, retrievedTask]) => {
        expect(savedTask).toEqual(retrievedTask);
      });
  });

  it('put method with /tasks/id updates a task', () => {
    const testObj = { name: 'trash', priority: 2, description: 'text here' };
    const testUpdatedObj = { name: 'trash', priority: 1, description: 'text here' };
    return Tasks.create(testObj)
      .then(createdTask => {
        return request(app)
          .put(`/tasks/${createdTask._id}`)
          .send(testUpdatedObj);
      })
      .then(updatedTask => {
        return Tasks.findById(updatedTask.body._id)
          .then(foundTask => {
            expect(foundTask).toEqual(updatedTask.body);
          });
      });
  });

  it('return delete count when deleting with id', () => {
    return Tasks.create({ name: 'trash', priority: 2, description: 'text here' })
      .then(createdTask => {
        return request(app)
          .delete(`/tasks/${createdTask._id}`)
          .then(res => res.body)
          .then(deletedObject => {
            expect(deletedObject).toEqual({ deleted: 1 });
          });
      });
  });

  it('returns a status of not found if path doesn\'t exist', () => {
    const obj = { name: 'trash', priority: 2, description: 'text here' };
    return request(app)
      .post('/notfound')
      .send(obj)
      .then(res => {
        expect(res.text).toBe('Not Found');
        expect(res.status).toBe(404);
      });
  });

  it('returns a status of not found if id doesn\'t exist for get, put, and delete', () => {
    const badId = '/tasks/1234';
    const obj = { name: 'trash', priority: 2, description: 'text here' };
    request(app)
      .get(badId)
      .then(res => {
        expect(res.text).toBe('Not Found');
        expect(res.status).toBe(404);
      });
      
    request(app)
      .put(badId)
      .send(obj)
      .then(res => {
        expect(res.text).toBe('Not Found');
        expect(res.status).toBe(404);
      });
    
    request(app)
      .delete(badId)
      .then(res => {
        expect(res.text).toBe('Not Found');
        expect(res.status).toBe(404);
      });
  });
});
